import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect';

import getSupabaseServerClient from '~/core/supabase/server-client';
import requireSession from '~/lib/user/require-session';
import { getUserDataById } from '~/lib/server/queries';
import getCurrentOrganization from '~/lib/server/organizations/get-current-organization';
import OnboardingIllustration from '~/app/onboarding/components/OnboardingIllustration';

import Logo from '~/core/ui/Logo';
import getLanguageCookie from '~/i18n/get-language-cookie';
import initializeServerI18n from '~/i18n/i18n.server';
import getLogger from '~/core/logger';

export const dynamic = 'force-dynamic';

async function OnboardingLayout({ children }: React.PropsWithChildren) {
  await initializeOnboardingRoute();

  return (
    <div className={'flex flex-1 flex-col dark:bg-black-500'}>
      <div className={'flex divide-x divide-gray-100 dark:divide-black-300'}>
        <div
          className={
            'flex h-screen w-full flex-1 flex-col items-center justify-center lg:w-6/12'
          }
        >
          <div className={'absolute top-24 hidden lg:flex'}>
            <Logo href={'/onboarding'} />
          </div>

          {children}
        </div>

        <div
          className={
            'hidden w-6/12 flex-1 items-center justify-center bg-gray-50 dark:bg-black-400 lg:flex'
          }
        >
          <div>
            <OnboardingIllustration />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingLayout;

async function initializeOnboardingRoute() {
  const logger = getLogger();

  try {
    const client = getSupabaseServerClient();
    const session = await requireSession(client);

    const user = session.user;
    const userData = await getUserDataById(client, user.id);

    // initialize i18n for the server
    await initializeServerI18n(getLanguageCookie());

    // if we cannot find the user's Database record
    // the user should go to the onboarding flow
    // so that the record wil be created after the end of the flow
    if (!userData) {
      return {
        auth: user || undefined,
        data: userData ?? undefined,
        role: undefined,
      };
    }

    const userId = userData.id;

    const organization = await getCurrentOrganization({ userId });
    const onboarded = userData.onboarded;

    // there are two cases when we redirect the user to the onboarding
    // 1. if they have not been onboarded yet
    // 2. if they end up with 0 organizations (for example, if they get removed)
    //
    // NB: you should remove this if you want to
    // allow organization-less users within the application
    if (onboarded && organization) {
      return redirect('/');
    }

    return {
      auth: user,
      data: userData,
      role: undefined,
    };
  } catch (e) {
    if (!isRedirectError(e)) {
      logger.error(
        `
        Error while initializing onboarding route: ${e}`
      );

      throw redirect('/auth/sign-in');
    }
  }
}
