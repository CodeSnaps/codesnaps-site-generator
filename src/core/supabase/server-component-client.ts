import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { cache } from 'react';

import getSupabaseClientKeys from '~/core/supabase/get-supabase-client-keys';
import { Database } from '~/database.types';
import getSupabaseCookieAdapter from '~/core/supabase/supabase-cookie-adapter';

/**
 * @name getSupabaseServerComponentClient
 * @description Get a Supabase client for use in the Server Components
 * @param params
 */
const getSupabaseServerComponentClient = cache(
  (
    params = {
      admin: false,
    },
  ) => {
    const keys = getSupabaseClientKeys();

    if (params.admin) {
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!serviceRoleKey) {
        throw new Error('Supabase Service Role Key not provided');
      }

      return createServerClient<Database>(keys.url, serviceRoleKey, {
        auth: {
          persistSession: false,
        },
        cookies: {},
      });
    }

    const { get } = getCookiesStrategy();

    return createServerClient<Database>(keys.url, keys.anonKey, {
      cookies: { get },
    });
  },
);

export default getSupabaseServerComponentClient;

function getCookiesStrategy() {
  const cookieStore = cookies();

  return getSupabaseCookieAdapter({
    set: (name: string, value: string, options) => {
      cookieStore.set({ name, value, ...options });
    },
    get: (name: string) => {
      return cookieStore.get(name)?.value;
    },
    remove: (name: string) => {
      cookieStore.delete(name);
    },
  });
}
