import loadDynamic from 'next/dynamic';
import Trans from '~/core/ui/Trans';
import { Squares2X2Icon } from '@heroicons/react/24/outline';

import AppHeader from '~/app/dashboard/[organization]/components/AppHeader';
import AppContainer from '~/app/dashboard/[organization]/components/AppContainer';
import { withI18n } from '~/i18n/with-i18n';

const DashboardDemo = loadDynamic(
  () => import('~/app/dashboard/[organization]/components/DashboardDemo'),
  {
    ssr: false,
  }
);

export const metadata = {
  title: 'Dashboard',
};

function DashboardPage() {
  return (
    <>
      <AppHeader
        Icon={<Squares2X2Icon className={'h-6 dark:text-primary-500'} />}
      >
        <Trans i18nKey={'common:dashboardTabLabel'} />
      </AppHeader>

      <AppContainer>
        <DashboardDemo />
      </AppContainer>
    </>
  );
}

export default withI18n(DashboardPage);
