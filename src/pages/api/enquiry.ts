import type { APIRoute } from 'astro';

export const prerender = false;

const RESEND_API = 'https://api.resend.com/emails';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    // Honeypot — silently accept but don't send
    if (formData.get('bot-field')) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/contact-giving?sent=1' },
      });
    }

    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const topic = String(formData.get('topic') || '').trim();
    const message = String(formData.get('message') || '').trim();
    const consent = formData.get('consent');

    if (!name || !email || !topic || !message || !consent) {
      return new Response('Missing required fields', { status: 400 });
    }

    const apiKey = import.meta.env.RESEND_API_KEY;
    const to = import.meta.env.GIVING_EMAIL || 'giving@spmh.co.ke';
    const from =
      import.meta.env.RESEND_FROM || 'SPMH Website <noreply@spmh.co.ke>';

    if (!apiKey) {
      console.error('RESEND_API_KEY not configured');
      return new Response('Server configuration error', { status: 500 });
    }

    const body = `
New giving enquiry from give.spmh.co.ke

Name: ${name}
Email: ${email}
Phone: ${phone || '—'}
Topic: ${topic}

Message:
${message}

—
Consent: ${consent ? 'Yes' : 'No'}
Received: ${new Date().toISOString()}
`.trim();

    const res = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Giving enquiry: ${topic} — ${name}`,
        text: body,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
      return new Response('Failed to send', { status: 502 });
    }

    return new Response(null, {
      status: 302,
      headers: { Location: '/contact-giving?sent=1' },
    });
  } catch (err) {
    console.error('Enquiry error:', err);
    return new Response('Unexpected error', { status: 500 });
  }
};
