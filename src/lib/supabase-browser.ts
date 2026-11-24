import { createBrowserClient } from '@supabase/ssr';

export const createSupabaseBrowserClient = () => {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error('Browser Env missing:', { url, key });
    throw new Error(
      'Missing PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY. Restart the dev server.',
    );
  }

  return createBrowserClient(url, key);
};
