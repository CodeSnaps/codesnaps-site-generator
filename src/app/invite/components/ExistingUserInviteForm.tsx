'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/auth-helpers-nextjs';

import Trans from '~/core/ui/Trans';
import Button from '~/core/ui/Button';

import GuardedPage from '~/app/(app)/components/GuardedPage';
import useSignOut from '~/core/hooks/use-sign-out';
import isBrowser from '~/core/generic/is-browser';
import useAcceptInvite from '~/app/invite/use-accept-invite';
import configuration from '~/configuration';

function ExistingUserInviteForm(
  props: React.PropsWithChildren<{
    user: User;
  }>
) {
  const signOut = useSignOut();
  const redirectOnSignOut = getRedirectPath();
  const acceptInvite = useAcceptInvite();
  const router = useRouter();

  const onInviteAccepted = useCallback(async () => {
    await acceptInvite.trigger();

    return router.push(configuration.paths.appHome);
  }, [acceptInvite, router]);

  return (
    <GuardedPage whenSignedOut={redirectOnSignOut}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          return onInviteAccepted();
        }}
        className={'flex flex-col space-y-8'}
      >
        <p className={'text-center text-sm'}>
          <Trans
            i18nKey={'auth:clickToAcceptAs'}
            values={{ email: props.user?.email }}
            components={{ b: <b /> }}
          />
        </p>

        <Button data-cy={'accept-invite-submit-button'} type={'submit'}>
          <Trans i18nKey={'auth:acceptInvite'} />
        </Button>

        <div>
          <div className={'flex flex-col space-y-2'}>
            <p className={'text-center'}>
              <span
                className={
                  'text-center text-sm text-gray-700 dark:text-gray-300'
                }
              >
                <Trans i18nKey={'auth:acceptInviteWithDifferentAccount'} />
              </span>
            </p>

            <Button
              block
              color={'transparent'}
              size={'small'}
              onClick={signOut}
              type={'button'}
            >
              <Trans i18nKey={'auth:signOut'} />
            </Button>
          </div>
        </div>
      </form>
    </GuardedPage>
  );
}

export default ExistingUserInviteForm;

function getRedirectPath() {
  return isBrowser() ? window.location.pathname : undefined;
}
