import { config } from 'dotenv';
import { resolve } from 'node:path';

// Load .env from the project root explicitly. Works regardless of the
// current working directory or when Vite/Astro decide to evaluate modules.
config({ path: resolve(process.cwd(), '.env') });

function pick(key: string, fallback = ''): string {
  const v = process.env[key];
  return v && v.trim() ? v.trim() : fallback;
}

export const env = {
  supabaseUrl: pick('SUPABASE_URL'),
  supabaseServiceRoleKey: pick('SUPABASE_SERVICE_ROLE_KEY'),
  resendApiKey: pick('RESEND_API_KEY'),
  givingEmail: pick('GIVING_EMAIL', 'giving@spmh.co.ke'),
  resendFrom: pick('RESEND_FROM', 'SPMH Website <onboarding@resend.dev>'),
};

// One-time boot diagnostic. Remove after it works.
console.log('[env] loaded', {
  hasSupabaseUrl: !!env.supabaseUrl,
  hasServiceRole: !!env.supabaseServiceRoleKey,
  hasResendKey: !!env.resendApiKey,
  givingEmail: env.givingEmail,
  cwd: process.cwd(),
});
