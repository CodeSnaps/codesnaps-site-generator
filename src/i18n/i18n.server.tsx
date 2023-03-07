import { readFileSync } from 'fs';

import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import getI18nSettings from './i18n.settings';

async function initializeServerI18n(lang?: Maybe<string>) {
  const i18nInstance = createInstance();
  const settings = getI18nSettings(lang);

  await i18nInstance.use(initReactI18next).init({
    ...settings,
    resources: {
      [settings.lng]: createLanguageBundle(settings.lng),
    },
  });

  return i18nInstance;
}

export default initializeServerI18n;

function createLanguageBundle(language: string) {
  const common = readTranslationFile(language, 'common');
  const auth = readTranslationFile(language, 'auth');
  const organization = readTranslationFile(language, 'organization');
  const profile = readTranslationFile(language, 'profile');
  const subscription = readTranslationFile(language, 'subscription');

  return {
    common,
    auth,
    organization,
    profile,
    subscription,
  };
}

function readTranslationFile(language: string, fileName: string) {
  try {
    const prefix = `${process.cwd()}/public/locales`;
    const file = readFileSync(`${prefix}/${language}/${fileName}.json`, 'utf8');

    return JSON.parse(file);
  } catch (e) {
    console.error(
      `Error: failed to read translation file: ${fileName}. Does it exist?`
    );

    return {};
  }
}
