import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import getSupabaseClientKeys from '~/core/supabase/get-supabase-client-keys';

export default function createMiddlewareClient(
  request: NextRequest,
  response: NextResponse,
) {
  const keys = getSupabaseClientKeys();

  return createServerClient(keys.url, keys.anonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value,
          ...options,
        });

        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });

        response.cookies.set({
          name,
          value,
          ...options,
        });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value: '',
          ...options,
        });

        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });

        response.cookies.set({
          name,
          value: '',
          ...options,
        });
      },
    },
  });
}
