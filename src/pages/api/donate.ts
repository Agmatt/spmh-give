import type { APIRoute } from 'astro';
import { getSupabaseAdmin } from '../../lib/supabase';
import { env } from '../../lib/env';

export const prerender = false;

const RESEND_API = 'https://api.resend.com/emails';

function generateReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SPMH-${result}`;
}

function escapeHtml(s: unknown): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// TEMPORARY: includes the database message in the response for debugging.
// Remove the `detail` and `code` fields once the donation flow works.
function fail(step: string, err: unknown, status = 500) {
  const e = err as { message?: string; code?: string } | null;
  console.error(`[donate] ${step} failed:`, err);
  return json(
    {
      error: 'Failed to process donation',
      step,
      detail: e?.message ?? String(err),
      code: e?.code,
    },
    status,
  );
}

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, any>;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request body' }, 400);
  }

  const { name, email, phone, country, amount, frequency, designation } = body;

  if (!name || !email || !phone || !amount) {
    return json({ error: 'Missing required fields' }, 400);
  }

  let supabaseAdmin;
  try {
    supabaseAdmin = getSupabaseAdmin();
  } catch (err) {
    return fail('config', err);
  }

  const reference = generateReference();

  // 1. Find or create the donor
  let donorId: string;

  const { data: existingDonor, error: lookupError } = await supabaseAdmin
    .from('donors')
    .select('id')
    .ilike('email', String(email))
    .limit(1)
    .maybeSingle();

  if (lookupError) return fail('donor-lookup', lookupError);

  if (existingDonor) {
    donorId = existingDonor.id;
    const { error: updateError } = await supabaseAdmin
      .from('donors')
      .update({ name, phone, country: country || 'Kenya' })
      .eq('id', donorId);
    if (updateError) return fail('donor-update', updateError);
  } else {
    const { data: newDonor, error: insertError } = await supabaseAdmin
      .from('donors')
      .insert({ name, email, phone, country: country || 'Kenya' })
      .select('id')
      .single();
    if (insertError || !newDonor) return fail('donor-insert', insertError);
    donorId = newDonor.id;
  }

  // 2. Record the donation
  const { data: donation, error: donationError } = await supabaseAdmin
    .from('donations')
    .insert({
      donor_id: donorId,
      amount: Number(amount),
      currency: 'KES',
      frequency: frequency || 'one-time',
      designation: designation || 'general',
      reference_code: reference,
      status: 'pending',
    })
    .select('id')
    .single();

  if (donationError || !donation) return fail('donation-insert', donationError);

  // 3. Emails. The donation is already saved, so an email failure is logged
  // but does not fail the request.
  const apiKey = env.resendApiKey;
  const fromAddress = env.resendFrom;
  const toTeam = env.givingEmail;
  const tillNumber = env.mpesaTill;
  const amountText = `KES ${Number(amount).toLocaleString()}`;

  if (apiKey) {
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };

    const donorHtml = `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0f1720;">
        <h2 style="color:#1565c0;">Thank you for your gift, ${escapeHtml(name)}.</h2>
        <p>We have recorded your intent to give <strong>${amountText}</strong> to St. Paul's Mission Hospital.</p>
        <div style="background:#f4f8ff;border-left:4px solid #1565c0;padding:16px;margin:24px 0;">
          <p style="margin:0 0 8px;font-size:14px;text-transform:uppercase;color:#5a6f8c;font-weight:bold;">Your Reference Code</p>
          <p style="margin:0;font-size:28px;font-weight:bold;font-family:monospace;letter-spacing:2px;">${reference}</p>
        </div>
        <h3>Next Steps</h3>
        <p>Please complete your donation via M-Pesa using the details below:</p>
        <ol style="line-height:1.6;">
          <li>Go to <strong>M-Pesa</strong> &rarr; <strong>Lipa na M-Pesa</strong> &rarr; <strong>Buy Goods &amp; Services</strong></li>
          <li>Enter Till Number: <strong>${escapeHtml(tillNumber)}</strong></li>
          <li>Enter Amount: <strong>${amountText}</strong></li>
          <li>Enter PIN and confirm.</li>
          <li><strong>Important:</strong> Forward the M-Pesa SMS to <a href="mailto:${escapeHtml(toTeam)}">${escapeHtml(toTeam)}</a> and include your reference code <strong>${reference}</strong>.</li>
        </ol>
        <p>We will send your official KRA-compliant receipt within 48 hours of receiving your payment.</p>
      </div>`;

    const teamHtml = `
      <p>A new donation intent has been created.</p>
      <p><strong>Ref:</strong> ${reference}<br>
      <strong>Donor:</strong> ${escapeHtml(name)} (${escapeHtml(email)}, ${escapeHtml(phone)})<br>
      <strong>Amount:</strong> ${amountText}<br>
      <strong>Designation:</strong> ${escapeHtml(designation)}</p>
      <p>Match this reference against incoming M-Pesa SMS.</p>`;

    const results = await Promise.allSettled([
      fetch(RESEND_API, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          from: fromAddress,
          to: [email],
          reply_to: toTeam,
          subject: `Your donation reference: ${reference}`,
          html: donorHtml,
        }),
      }),
      fetch(RESEND_API, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          from: fromAddress,
          to: [toTeam],
          subject: `New pledge: ${reference} — ${amountText} from ${name}`,
          html: teamHtml,
        }),
      }),
    ]);

    results.forEach((r, i) => {
      const label = i === 0 ? 'donor email' : 'team email';
      if (r.status === 'rejected') {
        console.error(`[donate] ${label} failed:`, r.reason);
      } else if (!r.value.ok) {
        console.error(`[donate] ${label} rejected:`, r.value.status);
      }
    });
  } else {
    console.error('[donate] RESEND_API_KEY missing, emails skipped');
  }

  return json({ ok: true, reference, donationId: donation.id }, 200);
};
