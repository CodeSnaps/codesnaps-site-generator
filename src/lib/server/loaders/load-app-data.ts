import { cookies, headers } from 'next/headers';

import getCurrentOrganization from '~/lib/server/organizations/get-current-organization';
import { parseOrganizationIdCookie } from '~/lib/server/cookies/organization.cookie';

import getUIStateCookies from '~/lib/server/loaders/utils/get-ui-state-cookies';
import { getUserDataById } from '../queries';

import getSupabaseServerClient from '~/core/supabase/server-client';
import requireSession from '~/lib/user/require-session';
import getLogger from '~/core/logger';

import configuration from '~/configuration';
import initializeServerI18n from '~/i18n/i18n.server';
import getLanguageCookie from '~/i18n/get-language-cookie';

const loadAppData = async () => {
  try {
    const client = getSupabaseServerClient();
    const sessionResult = await requireSession(client);

    // if the session returns a redirect object,
    // we simply return it to the caller
    if ('redirect' in sessionResult) {
      return sessionResult;
    }

    const user = sessionResult.user;

    // we fetch the user record from the Database
    // which is a separate object from the auth metadata
    const userRecord = await getUserDataById(client, user.id);
    const isOnboarded = Boolean(userRecord?.onboarded);

    // when the user is not yet onboarded,
    // we simply redirect them back to the onboarding flow
    if (!isOnboarded || !userRecord) {
      return redirectToOnboarding();
    }

    const currentOrganizationId = Number(
      await parseOrganizationIdCookie(cookies())
    );

    // we fetch the current organization
    const organizationData = await getCurrentOrganization(client, {
      userId: userRecord.id,
      organizationId: currentOrganizationId,
    });

    // if it's not found, we redirect the user to the onboarding flow
    if (!organizationData) {
      return redirectToOnboarding();
    }

    const csrfToken = getCsrfToken();
    const accessToken = sessionResult.access_token;
    const { language } = await initializeServerI18n(getLanguageCookie());

    return {
      accessToken,
      language,
      csrfToken,
      session: sessionResult,
      user: userRecord,
      organization: organizationData?.organization,
      role: organizationData?.role,
      ui: getUIStateCookies(),
    };
  } catch (error) {
    getLogger().warn(
      `Could not load application data: ${JSON.stringify(error)}`
    );

    // in case of any error, we redirect the user to the home page
    // to avoid any potential infinite loop
    return redirectToHomePage();
  }
};

function redirectToOnboarding() {
  return redirectTo(configuration.paths.onboarding);
}

function redirectToHomePage() {
  return redirectTo('/');
}

function getCsrfToken() {
  return headers().get('X-CSRF-Token');
}

function redirectTo(destination: string) {
  return {
    data: undefined,
    redirect: true,
    destination,
  };
}

export default loadAppData;
