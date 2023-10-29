import { cache } from 'react';
import { cookies } from 'next/headers';

import { createServerClient } from '@supabase/ssr';

import getSupabaseClientKeys from '~/core/supabase/get-supabase-client-keys';
import type { Database } from '~/database.types';

const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies();
  const keys = getSupabaseClientKeys();

  return createServerClient<Database>(keys.url, keys.anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });
});

const getSupabaseServerActionClient = cache(
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

    return createServerSupabaseClient();
  },
);

export default getSupabaseServerActionClient;
