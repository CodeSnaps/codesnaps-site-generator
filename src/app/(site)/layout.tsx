import { use } from 'react';

import Footer from '~/app/(site)/components/Footer';
import loadUserData from '~/lib/server/loaders/load-user-data';
import I18nProvider from '~/i18n/I18nProvider';
import SiteHeaderSessionProvider from '~/app/(site)/components/SiteHeaderSessionProvider';

export const dynamic = 'force-dynamic';

function SiteLayout(props: React.PropsWithChildren) {
  const data = use(loadUserData());

  return (
    <I18nProvider lang={data.language}>
      <SiteHeaderSessionProvider
        data={data.session}
        accessToken={data.accessToken}
      />

      {props.children}

      <Footer />
    </I18nProvider>
  );
}

export default SiteLayout;
