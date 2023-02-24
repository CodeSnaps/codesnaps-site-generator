import getSupabaseServerClient from '~/core/supabase/server-client';
import configuration from '~/configuration';

const loadAuthPageData = async () => {
  try {
    const client = getSupabaseServerClient();

    const {
      data: { session },
    } = await client.auth.getSession();

    if (session) {
      return {
        redirect: true,
        destination: configuration.paths.appHome,
      };
    }

    return {};
  } catch (e) {
    return {};
  }
};

export default loadAuthPageData;
