import configuration from '~/configuration';

import getSupabaseServerClient from '~/core/supabase/server-client';
import initializeServerI18n from '~/i18n/i18n.server';
import getLanguageCookie from '~/i18n/get-language-cookie';

const loadAuthPageData = async () => {
  const { language } = await initializeServerI18n(getLanguageCookie());

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

    return {
      language,
    };
  } catch (e) {
    return {
      language,
    };
  }
};

export default loadAuthPageData;
