// Server-side config. Locally these come from .env; on Vercel they come from
// Settings → Environment Variables.
export const env = {
  supabaseUrl: import.meta.env.SUPABASE_URL as string | undefined,
  supabaseServiceRoleKey: import.meta.env.SUPABASE_SERVICE_ROLE_KEY as
    | string
    | undefined,
  resendApiKey: import.meta.env.RESEND_API_KEY as string | undefined,
  givingEmail:
    (import.meta.env.GIVING_EMAIL as string | undefined) || 'giving@spmh.co.ke',
  resendFrom:
    (import.meta.env.RESEND_FROM as string | undefined) ||
    'SPMH Website <onboarding@resend.dev>',
};
