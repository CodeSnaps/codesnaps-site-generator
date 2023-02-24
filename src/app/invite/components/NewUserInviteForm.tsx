'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import EmailLinkAuth from '~/app/auth/components/EmailLinkAuth';
import OAuthProviders from '~/app/auth/components/OAuthProviders';
import PhoneNumberSignInContainer from '~/app/auth/components/PhoneNumberSignInContainer';
import EmailPasswordSignInContainer from '~/app/auth/components/EmailPasswordSignInContainer';
import EmailPasswordSignUpContainer from '~/app/auth/components/EmailPasswordSignUpContainer';

import If from '~/core/ui/If';
import Button from '~/core/ui/Button';
import Trans from '~/core/ui/Trans';

import configuration from '~/configuration';
import useAcceptInvite from '~/app/invite/use-accept-invite';
import PageLoadingIndicator from '~/core/ui/PageLoadingIndicator';

enum Mode {
  SignUp,
  SignIn,
}

function NewUserInviteForm() {
  const [mode, setMode] = useState<Mode>(Mode.SignUp);
  const acceptInvite = useAcceptInvite();
  const router = useRouter();

  const onInviteAccepted = useCallback(async () => {
    await acceptInvite.trigger();

    return router.push(configuration.paths.appHome);
  }, [acceptInvite, router]);

  return (
    <>
      <If condition={acceptInvite.isMutating}>
        <PageLoadingIndicator fullPage>
          Accepting invite. Please wait...
        </PageLoadingIndicator>
      </If>

      <OAuthProviders onSignIn={onInviteAccepted} />

      <If condition={configuration.auth.providers.emailPassword}>
        <If condition={mode === Mode.SignUp}>
          <div className={'flex w-full flex-col items-center space-y-4'}>
            <EmailPasswordSignUpContainer onSubmit={onInviteAccepted} />

            <Button
              block
              color={'transparent'}
              size={'small'}
              onClick={() => setMode(Mode.SignIn)}
            >
              <Trans i18nKey={'auth:alreadyHaveAccountStatement'} />
            </Button>
          </div>
        </If>

        <If condition={mode === Mode.SignIn}>
          <div className={'flex w-full flex-col items-center space-y-4'}>
            <EmailPasswordSignInContainer onSignIn={onInviteAccepted} />

            <Button
              block
              color={'transparent'}
              size={'small'}
              onClick={() => setMode(Mode.SignUp)}
            >
              <Trans i18nKey={'auth:doNotHaveAccountStatement'} />
            </Button>
          </div>
        </If>
      </If>

      <If condition={configuration.auth.providers.phoneNumber}>
        <PhoneNumberSignInContainer onSignIn={onInviteAccepted} />
      </If>

      <If condition={configuration.auth.providers.emailLink}>
        <EmailLinkAuth />
      </If>
    </>
  );
}

export default NewUserInviteForm;
