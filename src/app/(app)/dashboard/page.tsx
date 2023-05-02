import loadDynamic from 'next/dynamic';
import { use } from 'react';

import Trans from '~/core/ui/Trans';
import { Squares2X2Icon } from '@heroicons/react/24/outline';

import AppHeader from '~/app/(app)/components/AppHeader';
import AppContainer from '~/app/(app)/components/AppContainer';
import getCurrentOrganization from '~/lib/server/organizations/get-current-organization';

const DashboardDemo = loadDynamic(
  () => import('~/app/(app)/dashboard/DashboardDemo'),
  {
    ssr: false,
  }
);

export const metadata = {
  title: 'Dashboard',
};

function DashboardPage() {
  const organization = use(getCurrentOrganization());

  // use the organization data here
  console.log(organization);

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

export default DashboardPage;
