import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { join } from 'path';

import Backend from 'i18next-fs-backend';
import getI18nSettings from './i18n.settings';

async function initializeServerI18n(lang?: Maybe<string>) {
  const i18nInstance = createInstance();
  const settings = getI18nSettings(lang);

  await i18nInstance
    .use(initReactI18next)
    .use(Backend)
    .init({
      ...settings,
      backend: {
        loadPath: join(process.cwd(), './public/locales/{{lng}}/{{ns}}.json'),
      },
    });

  return i18nInstance;
}

export default initializeServerI18n;
