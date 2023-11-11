import CategoryDashboard from '~/app/(site)/browse-components/components/CategoryDashboard';
import Container from '~/core/ui/Container';
import Heading from '~/core/ui/Heading';
import SubHeading from '~/core/ui/SubHeading';

import { Metadata } from 'next';

interface DasbboardPageParams {
  searchParams: {
    page?: string;
    free?: string;
    search?: string;
    interactive?: string;
    layout?: string;
    elements?: string;
  };
  params: {
    organization: string;
    category: string;
  };
}

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

function CategoryBrowsePage({ searchParams, params }: DasbboardPageParams) {
  return (
    <Container>
      <div className="3xl:max-w-none w-full xl:max-w-[calc(100%-18rem)]">
        <div className="mx-auto mb-10 mt-14 flex flex-col items-center space-y-3 text-center xl:mt-20">
          <Heading type={1} className="max-w-sm md:max-w-none">
            Components created with ❤️ by CodeSnaps
          </Heading>

          <SubHeading className="max-w-xl">
            <span>Browse our collection of components.</span>
            <span>We add several new components every week.</span>
          </SubHeading>
        </div>
      </div>

      <CategoryDashboard
        searchParams={searchParams}
        organization={params.organization}
        category={params.category}
      />
    </Container>
  );
}

export default CategoryBrowsePage;
