import { use } from 'react';
import { z } from 'zod';
import { redirect } from 'next/navigation';

import getCurrentOrganization from '~/lib/server/organizations/get-current-organization';
import type UserSession from '~/core/session/types/user-session';
import getSupabaseServerClient from '~/core/supabase/server-client';
import { getUserDataById } from '~/lib/server/queries';
import requireSession from '~/lib/user/require-session';
import OnboardingContainer from '~/app/onboarding/components/OnboardingContainer';

const Onboarding = () => {
  const data = use(loadData());

  if ('redirect' in data) {
    return redirect(data.destination);
  }

  return <OnboardingContainer />;
};

export default Onboarding;

async function loadData() {
  const client = getSupabaseServerClient();
  const session = await requireSession(client);
  const userData = await getUserDataById(client, session.user.id);

  // if we cannot find the user's Database record
  // the user should go to the onboarding flow
  // so that the record wil be created after the end of the flow
  if (!userData) {
    const response: UserSession = {
      auth: session.user || undefined,
      data: userData ?? undefined,
      role: undefined,
    };

    return response;
  }

  const userId = userData.id;

  const organization = await getCurrentOrganization(client, {
    userId,
  });

  const onboarded = userData.onboarded;

  // there are two cases when we redirect the user to the onboarding
  // 1. if they have not been onboarded yet
  // 2. if they end up with 0 organizations (for example, if they get removed)
  //
  // NB: you should remove this if you want to
  // allow organization-less users within the application
  if (onboarded && organization) {
    return redirectToAppHome();
  }

  return {
    auth: session.user || undefined,
    data: userData,
    role: undefined,
  };
}

function redirectToAppHome() {
  return {
    redirect: true,
    destination: '/',
  };
}

function getBodySchema() {
  return z.object({
    organization: z.string(),
  });
}
