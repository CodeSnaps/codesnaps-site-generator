import { use } from 'react';

import Footer from '~/app/(site)/components/Footer';
import SiteHeaderSessionProvider from '~/app/(site)/components/SiteHeaderSessionProvider';
import loadUserData from '~/lib/server/loaders/load-user-data';

function SiteLayout(props: React.PropsWithChildren) {
  const data = use(loadUserData());

  return (
    <main>
      <SiteHeaderSessionProvider data={data} />

      {props.children}

      <Footer />
    </main>
  );
}

export default SiteLayout;
