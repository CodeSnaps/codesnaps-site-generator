import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * @name requireSession
 * @description Require a session to be present in the request
 * @param client
 */
async function requireSession(client: SupabaseClient) {
  const { data, error } = await client.auth.getSession();

  if (!data.session || error) {
    return Promise.reject('No session found');
  }

  return data.session;
}

export default requireSession;
