import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { use } from 'react';

import OnboardingContainer from './components/OnboardingContainer';
import requireSession from '~/lib/user/require-session';
import getSupabaseServerClient from '~/core/supabase/server-client';
import { getUserDataById } from '~/lib/server/queries';
import configuration from '~/configuration';

export const metadata = {
  title: 'Onboarding',
};

function OnboardingPage() {
  const { csrfToken } = use(loadData());

  return <OnboardingContainer csrfToken={csrfToken} />;
}

export default OnboardingPage;

async function loadData() {
  const csrfToken = headers().get('X-CSRF-Token');
  const client = getSupabaseServerClient();
  const { user } = await requireSession(client);

  const userData = await getUserDataById(client, user.id.toString()).catch(
    () => undefined
  );

  if (userData && userData.onboarded) {
    return redirect(configuration.paths.appHome);
  }

  return {
    csrfToken,
  };
}
