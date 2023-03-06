'use client';

import { Suspense } from 'react';
import type { i18n } from 'i18next';

import initializeI18nClient from '~/i18n/i18n.client';
import initializeServerI18n from '~/i18n/i18n.server';
import isBrowser from '~/core/generic/is-browser';

let client: i18n;

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
  if (!client) {
    throw initializeI18n(props.lang);
  }

  return <>{props.children}</>;
}

async function initializeI18n(lang?: string) {
  client = isBrowser()
    ? await initializeI18nClient(lang)
    : await initializeServerI18n(lang);

  console.log(isBrowser() ? 'client' : 'server');

  console.log(
    client.getFixedT(client.language)('auth:doNotHaveAccountYet') ?? 'nope'
  );

  console.log(
    client.getFixedT(client.language)('common:emailAddress') ?? 'nope'
  );
}
