import { use } from 'react';

import Footer from '~/app/(site)/components/Footer';
import SiteHeaderSessionProvider from '~/app/(site)/components/SiteHeaderSessionProvider';
import loadUserData from '~/lib/server/loaders/load-user-data';
import I18nProvider from '~/i18n/I18nProvider';
import useCurrentLanguage from '~/i18n/use-current-language';

function SiteLayout(props: React.PropsWithChildren) {
  const data = use(loadUserData());
  const lang = useCurrentLanguage();

  return (
    <I18nProvider lang={lang}>
      <main>
        <SiteHeaderSessionProvider data={data} />

        {props.children}

        <Footer />
      </main>
    </I18nProvider>
  );
}

export default SiteLayout;
