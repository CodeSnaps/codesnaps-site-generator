import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import getI18nSettings from './i18n.settings';

async function initializeServerI18n(lang?: Maybe<string>) {
  const i18nInstance = createInstance();
  const settings = getI18nSettings(lang);
  const namespaces = Array.isArray(settings.ns) ? settings.ns : [settings.ns];
  const bundles = await createLanguageBundles(namespaces, settings.lng);

  await i18nInstance.use(initReactI18next).init({
    ...settings,
    resources: {
      [settings.lng]: bundles,
    },
  });

  return i18nInstance;
}

export default initializeServerI18n;

async function createLanguageBundles(namespaces: string[], language: string) {
  const bundles = await Promise.all(
    namespaces.map((namespace) => {
      return readTranslationFile(language, namespace);
    }),
  );

  return namespaces.reduce((acc, namespace, index) => {
    return {
      ...acc,
      [namespace]: bundles[index],
    };
  }, {});
}

async function readTranslationFile(language: string, fileName: string) {
  try {
    const { default: translations } = await import(
      `../../public/locales/${language}/${fileName}.json`
    );

    return translations;
  } catch (e) {
    console.error(e);

    console.error(
      `Error: failed to read translation file: ${fileName}. Does it exist?`,
    );

    return {};
  }
}
