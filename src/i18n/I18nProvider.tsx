'use client';

import { Suspense } from 'react';

import initializeI18nClient from '~/i18n/i18n.client';
import initializeServerI18n from '~/i18n/i18n.server';
import isBrowser from '~/core/generic/is-browser';

let i18nDidInitialize = false;

function I18nProvider(
  props: React.PropsWithChildren<{
    lang?: string;
  }>
) {
  return (
    <Suspense>
      <I18nInitializer lang={props.lang}>{props.children}</I18nInitializer>
    </Suspense>
  );
}

export default I18nProvider;

function I18nInitializer(
  props: React.PropsWithChildren<{
    lang?: string;
  }>
) {
  if (!i18nDidInitialize) {
    throw initializeI18n(props.lang);
  }

  return <>{props.children}</>;
}

async function initializeI18n(lang?: string) {
  const isServer = !isBrowser();

  if (isServer) {
    await initializeServerI18n(lang);
  } else {
    await initializeI18nClient(lang);
  }

  i18nDidInitialize = true;
}
