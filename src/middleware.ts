import { defineMiddleware } from 'astro:middleware';
import { createServerClient } from '@supabase/ssr';

export const onRequest = defineMiddleware(async (context, next) => {
  // Only protect /admin routes (except the login page itself)
  if (
    context.url.pathname.startsWith('/admin') &&
    context.url.pathname !== '/admin/login'
  ) {
    // Bulletproof variable reading (tries Vite first, then Node)
    const supabaseUrl =
      import.meta.env.PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
    const supabaseKey =
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
      process.env.PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error(
        '[Middleware Error] Missing Supabase URL or Key. Check your .env file.',
      );
      // If the env variables are completely missing, fail gracefully
      return context.redirect('/admin/login');
    }

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          // Standard Astro cookie parsing
          const cookieHeader = context.request.headers.get('Cookie') ?? '';
          return cookieHeader.split(';').map((c) => {
            const [name, ...rest] = c.trim().split('=');
            return { name, value: rest.join('=') };
          });
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            context.cookies.set(name, value, options),
          );
        },
      },
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    // If no session, redirect to login
    if (!session) {
      return context.redirect('/admin/login');
    }
  }

  return next();
});
