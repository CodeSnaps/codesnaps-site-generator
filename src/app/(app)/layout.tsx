import { use } from 'react';
import { redirect } from 'next/navigation';

import loadAppData from '~/lib/server/loaders/load-app-data';
import AppRouteShell from '~/app/(app)/components/AppRouteShell';
import I18nProvider from '~/i18n/I18nProvider';
import useCurrentLanguage from '~/i18n/use-current-language';

function AppLayout({ children }: React.PropsWithChildren) {
  const data = use(loadAppData());
  const lang = useCurrentLanguage();

  if ('redirect' in data) {
    return redirect(data.destination);
  }

  return (
    <I18nProvider lang={lang}>
      <AppRouteShell data={data}>{children}</AppRouteShell>
    </I18nProvider>
  );
}

export default AppLayout;
