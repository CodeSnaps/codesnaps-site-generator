import { use } from 'react';

import loadAppData from '~/lib/server/loaders/load-app-data';
import AppRouteShell from '~/app/(app)/components/AppRouteShell';

function AppLayout({ children }: React.PropsWithChildren) {
  const data = use(loadAppData());

  return <AppRouteShell data={data}>{children}</AppRouteShell>;
}

export default AppLayout;
