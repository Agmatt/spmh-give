import { getSupabaseAdmin } from '../../lib/supabase';
import { env } from '../../lib/env';
import type { APIRoute } from 'astro';

export const prerender = false;

const RESEND_API = 'https://api.resend.com/emails';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function senderConfirmationHtml(params: {
  name: string;
  topic: string;
  message: string;
  givingEmail: string;
}) {
  const { name, topic, message, givingEmail } = params;
  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#faf8f3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0f1720;">
    <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
      <p style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#c8a951;margin:0 0 24px;">
        St. Paul&rsquo;s Mission Hospital &middot; Homa Bay
      </p>
      <h1 style="font-size:24px;line-height:1.2;margin:0 0 16px;color:#0f1720;">
        We&rsquo;ve received your message.
      </h1>
      <p style="font-size:16px;line-height:1.6;color:#475569;margin:0 0 20px;">
        Dear ${escapeHtml(name)},
      </p>
      <p style="font-size:16px;line-height:1.6;color:#475569;margin:0 0 24px;">
        Thank you for reaching out to the SPMH giving team. Your message has
        been received, and one of us will reply within two working days.
      </p>
      <div style="border-left:2px solid #c8a951;padding:0 0 0 20px;margin:24px 0;">
        <p style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#475569;margin:0 0 8px;">
          Your message
        </p>
        <p style="font-size:14px;line-height:1.6;color:#0f1720;margin:0 0 4px;">
          <strong>Topic:</strong> ${escapeHtml(topic)}
        </p>
        <p style="font-size:14px;line-height:1.6;color:#475569;margin:0;white-space:pre-wrap;">${escapeHtml(message)}</p>
      </div>
      <p style="font-size:14px;line-height:1.6;color:#475569;margin:24px 0 0;">
        If you need to reach us urgently, reply directly to this email or write
        to <a href="mailto:${givingEmail}" style="color:#1565c0;text-decoration:underline;">${givingEmail}</a>.
      </p>
      <p style="font-size:14px;line-height:1.6;color:#475569;margin:32px 0 0;">
        With gratitude,<br />
        The giving team<br />
        St. Paul&rsquo;s Mission Hospital, Homa Bay
      </p>
    </div>
  </body>
</html>
  `.trim();
}

function teamNotificationHtml(params: {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  ipAddress: string;
  createdAt: string;
  enquiryId: string;
}) {
  const {
    name,
    email,
    phone,
    topic,
    message,
    ipAddress,
    createdAt,
    enquiryId,
  } = params;
  return `
<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4f8ff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0f1720;">
    <div style="max-width:600px;margin:0 auto;padding:32px 24px;">
      <p style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#860f0f;margin:0 0 16px;">
        New giving enquiry
      </p>
      <h1 style="font-size:22px;line-height:1.3;margin:0 0 24px;color:#0f1720;">
        ${escapeHtml(topic)} — ${escapeHtml(name)}
      </h1>

      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e6e0d2;color:#475569;width:130px;">Name</td>
          <td style="padding:10px 0;border-bottom:1px solid #e6e0d2;color:#0f1720;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e6e0d2;color:#475569;">Email</td>
          <td style="padding:10px 0;border-bottom:1px solid #e6e0d2;color:#1565c0;">
            <a href="mailto:${escapeHtml(email)}" style="color:#1565c0;text-decoration:underline;">${escapeHtml(email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e6e0d2;color:#475569;">Phone</td>
          <td style="padding:10px 0;border-bottom:1px solid #e6e0d2;color:#0f1720;">${escapeHtml(phone || '—')}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e6e0d2;color:#475569;">Topic</td>
          <td style="padding:10px 0;border-bottom:1px solid #e6e0d2;color:#0f1720;">${escapeHtml(topic)}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e6e0d2;color:#475569;">Received</td>
          <td style="padding:10px 0;border-bottom:1px solid #e6e0d2;color:#0f1720;">${escapeHtml(createdAt)}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e6e0d2;color:#475569;">Enquiry ID</td>
          <td style="padding:10px 0;border-bottom:1px solid #e6e0d2;color:#0f1720;font-family:monospace;font-size:12px;">${escapeHtml(enquiryId)}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #e6e0d2;color:#475569;">IP</td>
          <td style="padding:10px 0;border-bottom:1px solid #e6e0d2;color:#475569;font-family:monospace;font-size:12px;">${escapeHtml(ipAddress)}</td>
        </tr>
      </table>

      <p style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#475569;margin:28px 0 8px;">
        Message
      </p>
      <div style="border-left:2px solid #1565c0;padding:0 0 0 16px;">
        <p style="font-size:15px;line-height:1.6;color:#0f1720;margin:0;white-space:pre-wrap;">${escapeHtml(message)}</p>
      </div>

      <p style="font-size:13px;color:#475569;margin:28px 0 0;line-height:1.6;">
        Reply directly to this email to respond to ${escapeHtml(name)}.
        The reply-to is set to their address.
      </p>

      <p style="font-size:11px;color:#475569;margin:24px 0 0;">
        Recorded in the SPMH Supabase enquiries table &middot; source: contact-giving
      </p>
    </div>
  </body>
</html>
  `.trim();
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const baseUrl = new URL(request.url).origin;
  const wantsJson = (request.headers.get('accept') || '').includes(
    'application/json',
  );

  const respond = (
    status: number,
    body: { ok: boolean; enquiryId?: string; error?: string },
  ) => {
    if (wantsJson) {
      return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const q = body.ok ? 'sent=1' : `error=${body.error || 'send'}`;
    return new Response(null, {
      status: 302,
      headers: { Location: `${baseUrl}/contact-giving?${q}` },
    });
  };

  try {
    const formData = await request.formData();

    if (formData.get('bot-field')) {
      return respond(200, { ok: true });
    }

    const name = String(formData.get('name') || '')
      .trim()
      .slice(0, 200);
    const email = String(formData.get('email') || '')
      .trim()
      .slice(0, 200);
    const phone = String(formData.get('phone') || '')
      .trim()
      .slice(0, 50);
    const topic = String(formData.get('topic') || '')
      .trim()
      .slice(0, 100);
    const message = String(formData.get('message') || '')
      .trim()
      .slice(0, 5000);
    const consent =
      formData.get('consent') === 'on' || formData.get('consent') === 'true';

    if (!name || !email || !topic || !message || !consent) {
      return respond(400, { ok: false, error: 'invalid' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return respond(400, { ok: false, error: 'invalid' });
    }

    const ipAddress = clientAddress || 'unknown';
    const userAgent = request.headers.get('user-agent') || '';
    const createdAt = new Date().toISOString();

    const supabaseAdmin = getSupabaseAdmin();

    const { data: inserted, error: insertError } = await supabaseAdmin
      .from('enquiries')
      .insert({
        name,
        email,
        phone: phone || null,
        topic,
        message,
        consent,
        ip_address: ipAddress,
        user_agent: userAgent,
        source: 'contact-giving',
      })
      .select('id')
      .single();

    if (insertError || !inserted) {
      console.error('[enquiry] Supabase insert failed:', insertError);
      return respond(500, { ok: false, error: 'send' });
    }

    const enquiryId: string = inserted.id;

    if (apiKey) {
      const headers = {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      };

      const senderPromise = fetch(RESEND_API, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          from: fromAddress,
          to: [email],
          reply_to: toTeam,
          subject: 'We\u2019ve received your message — SPMH Giving',
          html: senderConfirmationHtml({
            name,
            topic,
            message,
            givingEmail: toTeam,
          }),
        }),
      });

      const teamPromise = fetch(RESEND_API, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          from: fromAddress,
          to: [toTeam],
          reply_to: email,
          subject: `New giving enquiry: ${topic} — ${name}`,
          html: teamNotificationHtml({
            name,
            email,
            phone,
            topic,
            message,
            ipAddress,
            createdAt,
            enquiryId,
          }),
        }),
      });

      const [senderRes, teamRes] = await Promise.all([
        senderPromise,
        teamPromise,
      ]);

      if (!senderRes.ok) {
        console.error(
          '[enquiry] Sender confirmation failed:',
          await senderRes.text(),
        );
      }
      if (!teamRes.ok) {
        console.error(
          '[enquiry] Team notification failed:',
          await teamRes.text(),
        );
      }
    } else {
      console.error(
        '[enquiry] RESEND_API_KEY missing — record saved, emails skipped',
      );
    }

    return respond(200, { ok: true, enquiryId });
  } catch (err) {
    console.error('[enquiry] Unexpected error:', err);
    return respond(500, { ok: false, error: 'send' });
  }
};
