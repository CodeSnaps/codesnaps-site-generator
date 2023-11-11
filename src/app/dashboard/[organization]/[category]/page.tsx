import { Squares2X2Icon } from '@heroicons/react/24/outline';

import AppHeader from '~/app/dashboard/[organization]/components/AppHeader';
import { withI18n } from '~/i18n/with-i18n';
import Trans from '~/core/ui/Trans';

import CategoryDashboard from '~/app/dashboard/[organization]/components/ui-kit/CategoryDashboard';

import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: DasbboardPageParams): Promise<Metadata> {
  let title =
    params.category.charAt(0).toUpperCase() + params.category.slice(1);

  if (params.category === 'cta' || params.category === 'faq') {
    title = title.toUpperCase();
  }

  return {
    title: `${title} Sections – Tailwind CSS UI Components | CodeSnaps`,
    description: `${title} sections. Free library of React and Tailwind CSS components. Design and build better websites in minutes. No package installations.`,
  };
}

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
    category: string;
  };
}

function CategoryPage({ searchParams, params }: DasbboardPageParams) {
  return (
    <>
      <AppHeader Icon={<Squares2X2Icon className={'h-6 dark:text-primary'} />}>
        <Trans i18nKey={'common:dashboardTabLabel'} />
      </AppHeader>

      <div>
        <CategoryDashboard
          searchParams={searchParams}
          organization={params.organization}
          category={params.category}
        />
      </div>
    </>
  );
}

export default withI18n(CategoryPage);
