import { Trans } from 'react-i18next';
import PageLoadingIndicator from '~/core/ui/PageLoadingIndicator';
import AuthLinkRedirect from '~/app/auth/components/AuthLinkRedirect';

function AuthLinkPage() {
  return (
    <PageLoadingIndicator fullPage={true}>
      <AuthLinkRedirect />

      <Trans i18nKey={'auth:signingIn'} />
    </PageLoadingIndicator>
  );
}

export default AuthLinkPage;
