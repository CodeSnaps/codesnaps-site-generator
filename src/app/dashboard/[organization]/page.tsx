import AppHeader from '~/app/dashboard/[organization]/components/AppHeader';
import { withI18n } from '~/i18n/with-i18n';

import ComponentsDashboard from '~/app/dashboard/[organization]/components/ui-kit/ComponentsDashboard';

export const metadata = {
  title: 'Tailwind CSS UI Components | CodeSnaps',
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
      <AppHeader
        title="Components Dashboard"
        description="Browse, search & filter components here"
      />

      <div className="3xl:max-w-[85%] w-full mx-auto">
        {/* <ComponentsDashboard
          searchParams={searchParams}
          organization={params.organization}
        /> */}
      </div>
    </>
  );
}

export default withI18n(DashboardPage);
