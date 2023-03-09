import { use } from 'react';

import initializeServerI18n from '~/i18n/i18n.server';
import getLanguageCookie from '~/i18n/get-language-cookie';
import I18nProvider from '~/i18n/I18nProvider';

import MultiFactorAuthenticationSettings from './components/MultiFactorAuthenticationSettings';

export const metadata = {
  title: 'Authentication',
};

function AuthenticationPage() {
  const { language } = use(loadData());

  return (
    <I18nProvider lang={language}>
      <MultiFactorAuthenticationSettings />
    </I18nProvider>
  );
}

export default AuthenticationPage;

async function loadData() {
  const { language } = await initializeServerI18n(getLanguageCookie());

  return {
    language,
  };
}
