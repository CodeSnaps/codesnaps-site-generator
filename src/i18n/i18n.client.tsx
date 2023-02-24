import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import getI18nSettings, { I18N_COOKIE_NAME } from './i18n.settings';

function initializeI18nClient(lng?: Maybe<string>, ns?: string[]) {
  const settings = getI18nSettings(lng, ns);

  return i18next
    .use(initReactI18next)
    .use(Backend)
    .use(LanguageDetector)
    .init({
      ...settings,
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      detection: {
        order: ['htmlTag'],
        caches: ['cookie', 'localStorage'],
        lookupCookie: I18N_COOKIE_NAME,
      },
    })
    .then(() => i18next);
}

export default initializeI18nClient;
