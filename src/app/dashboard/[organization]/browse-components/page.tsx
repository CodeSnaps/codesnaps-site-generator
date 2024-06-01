import { PageHeader } from '~/core/ui/Page';
import { withI18n } from '~/i18n/with-i18n';

import ComponentsDashboard from '~/app/dashboard/[organization]/components/ui-kit/ComponentsDashboard';
import Trans from '~/core/ui/Trans';

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

function BrowseComponentsPage({ searchParams, params }: DasbboardPageParams) {
  return (
    <>
      <PageHeader
        title={<Trans i18nKey="components:componentsPageTitle" />}
        description={<Trans i18nKey={'components:componentsPageDescription'} />}
      />

      <div className="3xl:max-w-[85%] w-full mx-auto">
        <ComponentsDashboard
          searchParams={searchParams}
          organization={params.organization}
        />
      </div>
    </>
  );
}

export default withI18n(BrowseComponentsPage);
