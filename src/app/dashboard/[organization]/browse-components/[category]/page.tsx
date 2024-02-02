import { PageHeader } from '~/core/ui/Page';
import { withI18n } from '~/i18n/with-i18n';

import CategoryDashboard from '~/app/dashboard/[organization]/components/ui-kit/CategoryDashboard';
import Trans from '~/core/ui/Trans';

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
      <PageHeader
        title={<Trans i18nKey="components:componentsPageTitle" />}
        description={<Trans i18nKey="componentsPageDescription" />}
      />

      <div className="3xl:max-w-[85%] w-full mx-auto">
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
