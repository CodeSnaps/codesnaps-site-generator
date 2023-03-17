import { use } from 'react';

import Footer from '~/app/(site)/components/Footer';
import SiteHeaderSessionProvider from '~/app/(site)/components/SiteHeaderSessionProvider';
import loadUserData from '~/lib/server/loaders/load-user-data';
import I18nProvider from '~/i18n/I18nProvider';

function SiteLayout(props: React.PropsWithChildren) {
  const data = use(loadUserData());

  return (
    <I18nProvider lang={data.language}>
      <SiteHeaderSessionProvider data={data} />

      {props.children}

      <Footer />
    </I18nProvider>
  );
}

export default SiteLayout;
