import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

import invariant from 'tiny-invariant';
import type { Database } from '~/database.types';

let client: SupabaseClient<Database>;

/**
 * @name getSupabaseBrowserClient
 * @description Get a Supabase client for use in the Browser
 */
function getSupabaseBrowserClient() {
  if (client) {
    return client;
  }

  const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const NEXT_PUBLIC_SUPABASE_ANON_KEY =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  invariant(NEXT_PUBLIC_SUPABASE_URL, `Supabase URL was not provided`);

  invariant(
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
    `Supabase Anon key was not provided`,
  );

  client = createBrowserClient<Database>(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  return client;
}

export default getSupabaseBrowserClient;
