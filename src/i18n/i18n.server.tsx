import { readFile } from 'fs/promises';

import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import getI18nSettings from './i18n.settings';

async function initializeServerI18n(lang?: Maybe<string>) {
  const i18nInstance = createInstance();
  const settings = getI18nSettings(lang);
  const bundle = await createLanguageBundle(settings.lng);

  await i18nInstance.use(initReactI18next).init({
    ...settings,
    resources: {
      [settings.lng]: bundle,
    },
  });

  return i18nInstance;
}

export default initializeServerI18n;

async function createLanguageBundle(language: string) {
  const fetchBundle = (bundle: string) => readTranslationFile(language, bundle);

  const [common, auth, organization, profile, subscription] = await Promise.all(
    [
      fetchBundle('common'),
      fetchBundle('auth'),
      fetchBundle('organization'),
      fetchBundle('profile'),
      fetchBundle('subscription'),
    ]
  );

  return {
    common,
    auth,
    organization,
    profile,
    subscription,
  };
}

async function readTranslationFile(language: string, fileName: string) {
  try {
    const prefix = `${process.cwd()}/public/locales`;

    const file = await readFile(
      `${prefix}/${language}/${fileName}.json`,
      'utf8'
    );

    return JSON.parse(file);
  } catch (e) {
    console.error(
      `Error: failed to read translation file: ${fileName}. Does it exist?`
    );

    return {};
  }
}
