import { getUserDataById } from '~/lib/server/queries';
import getSupabaseServerClient from '~/core/supabase/server-client';

/**
 * @name loadUserData
 * @description Loads the user's data from Supabase Auth and Database
 * @param args
 */
async function loadUserData() {
  const client = getSupabaseServerClient();

  try {
    const { data, error } = await client.auth.getSession();

    if (!data.session || error) {
      return emptyUserData();
    }

    const userId = data.session.user.id;
    const userData = await getUserDataById(client, userId);

    return {
      auth: data.session,
      data: userData || undefined,
      role: undefined,
    };
  } catch (e) {
    return emptyUserData();
  }
}

function emptyUserData() {
  return {
    auth: undefined,
    data: undefined,
    role: undefined,
  };
}

export default loadUserData;
