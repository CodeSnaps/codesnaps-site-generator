import './globals.css';

import { cookies } from 'next/headers';
import classNames from 'classnames';

import initializeServerI18n from '~/i18n/i18n.server';
import { I18N_COOKIE_NAME } from '~/i18n/i18n.settings';
import ThemeSetter from '~/components/ThemeSetter';

import configuration from '~/configuration';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const language = cookies().get(I18N_COOKIE_NAME)?.value;
  const ii8n = await initializeServerI18n(language);

  return (
    <html lang={ii8n.language} className={getClassName()}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>{children}</body>

      <ThemeSetter />
    </html>
  );
}

function getClassName() {
  const theme = cookies().get('theme')?.value;

  return classNames({
    dark: theme === 'dark',
  });
}

export const metadata = {
  title: configuration.site.name,
  description: configuration.site.description,
  openGraph: {
    url: configuration.site.siteUrl,
    siteName: configuration.site.siteName,
    description: configuration.site.description,
  },
  themeColor: configuration.site.themeColor,
  twitter: {
    card: 'summary_large_image',
    title: configuration.site.name,
    description: configuration.site.description,
    creator: configuration.site.twitterHandle,
  },
  icons: {
    icon: '/assets/images/favicon/favicon.ico',
    shortcut: '/shortcut-icon.png',
    apple: '/assets/images/favicon/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
};
