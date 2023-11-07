import { Squares2X2Icon } from '@heroicons/react/24/outline';

import AppHeader from './components/AppHeader';
import { withI18n } from '~/i18n/with-i18n';
import Trans from '~/core/ui/Trans';

import ComponentsDashboard from '~/app/dashboard/[organization]/components/ui-kit/ComponentsDashboard';

export const metadata = {
  title: 'Components',
};

interface DasbboardPageParams {
  searchParams: {
    page?: string;
    free?: string;
    search?: string;
    category?: string;
    interactive?: string;
    layout?: string;
    elements?: string;
  };
  params: {
    organization: string;
  };
}

function DashboardPage({ searchParams, params }: DasbboardPageParams) {
  return (
    <>
      <AppHeader Icon={<Squares2X2Icon className={'h-6 dark:text-primary'} />}>
        <Trans i18nKey={'common:dashboardTabLabel'} />
      </AppHeader>

      <div>
        <ComponentsDashboard
          searchParams={searchParams}
          organization={params.organization}
        />
      </div>
    </>
  );
}

export default withI18n(DashboardPage);
