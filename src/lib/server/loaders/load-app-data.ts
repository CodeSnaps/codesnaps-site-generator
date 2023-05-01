import 'server-only';

import { cache } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  isRedirectError,
  getURLFromRedirectError,
} from 'next/dist/client/components/redirect';

import getCurrentOrganization from '~/lib/server/organizations/get-current-organization';

import getUIStateCookies from '~/lib/server/loaders/utils/get-ui-state-cookies';
import { getUserDataById } from '../queries';

import getSupabaseServerClient from '~/core/supabase/server-client';
import requireSession from '~/lib/user/require-session';
import getLogger from '~/core/logger';

import configuration from '~/configuration';
import initializeServerI18n from '~/i18n/i18n.server';
import getLanguageCookie from '~/i18n/get-language-cookie';

/**
 * @name loadAppData
 * @description This function is responsible for loading the application data
 * from the server-side, used in the (app) layout. The data is cached for
 * the request lifetime, which allows you to call the same across layouts.
 */
const loadAppData = cache(async () => {
  try {
    const client = getSupabaseServerClient();
    const session = await requireSession(client);

    const user = session.user;
    const userId = user.id;

    // we fetch the user record from the Database
    // which is a separate object from the auth metadata
    const [userRecord, organizationData] = await Promise.all([
      getUserDataById(client, userId),
      getCurrentOrganization({ userId }),
    ]);

    const isOnboarded = Boolean(userRecord?.onboarded);

    // when the user is not yet onboarded,
    // we simply redirect them back to the onboarding flow
    if (!isOnboarded || !userRecord || !organizationData) {
      return redirectToOnboarding();
    }

    const csrfToken = getCsrfToken();
    const accessToken = session.access_token;

    // we initialize the i18n server-side
    const { language } = await initializeServerI18n(getLanguageCookie());

    return {
      accessToken,
      language,
      csrfToken,
      session,
      user: userRecord,
      organization: organizationData?.organization,
      role: organizationData?.role,
      ui: getUIStateCookies(),
    };
  } catch (error) {
    // if the error is a redirect error, we simply redirect the user
    // to the destination URL extracted from the error
    if (isRedirectError(error)) {
      const url = getURLFromRedirectError(error);

      throw redirect(url);
    }

    getLogger().warn(
      `Could not load application data: ${JSON.stringify(error)}`
    );

    // in case of any error, we redirect the user to the home page
    // to avoid any potential infinite loop
    throw redirectToHomePage();
  }
});

function redirectToOnboarding() {
  return redirect(configuration.paths.onboarding);
}

function redirectToHomePage() {
  return redirect('/');
}

function getCsrfToken() {
  return headers().get('X-CSRF-Token');
}

export default loadAppData;
