'use client';

import { useEffect, useState } from 'react';
import type { i18n } from 'i18next';
import { I18nextProvider } from 'react-i18next';

import isBrowser from '~/core/generic/is-browser';

function I18nProvider(
  props: React.PropsWithChildren<{
    lang?: string;
  }>,
) {
  return <I18nInitializer lang={props.lang}>{props.children}</I18nInitializer>;
}

export default I18nProvider;

function I18nInitializer(
  props: React.PropsWithChildren<{
    lang?: string;
  }>,
) {
  const client = useI18nClient(props.lang);

  if (!client) {
    return null;
  }

  return <I18nextProvider i18n={client}>{props.children}</I18nextProvider>;
}

function useI18nClient(lang?: string) {
  const [client, setClient] = useState<i18n>();

  useEffect(() => {
    async function loadClient() {
      let i18nClient: i18n;

      if (isBrowser()) {
        const { default: initialize18n } = await import('~/i18n/i18n.client');

        i18nClient = await initialize18n(lang);
      } else {
        const { default: initialize18n } = await import('~/i18n/i18n.server');

        i18nClient = await initialize18n(lang);
      }

      setClient(i18nClient);
    }

    void loadClient();
  }, [lang]);

  return client;
}
