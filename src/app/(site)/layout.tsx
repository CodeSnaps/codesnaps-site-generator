import { use } from 'react';

import Footer from '~/app/(site)/components/Footer';
import SiteHeaderSessionProvider from '~/app/(site)/components/SiteHeaderSessionProvider';
import loadUserData from '~/lib/server/loaders/load-user-data';
import initializeServerI18n from '~/i18n/i18n.server';
import getLanguageCookie from '~/i18n/get-language-cookie';

async function SiteLayout(props: React.PropsWithChildren) {
  const data = use(loadUserData());

  await initializeServerI18n(getLanguageCookie());

  return (
    <main>
      <SiteHeaderSessionProvider data={data} />

      {props.children}

      <Footer />
    </main>
  );
}

export default SiteLayout;
