import BrowseDashboard from '~/app/(site)/browse-components/components/BrowseDashboard';
import Container from '~/core/ui/Container';
import Heading from '~/core/ui/Heading';
import SubHeading from '~/core/ui/SubHeading';

export const metadata = {
  title: 'Free Tailwind CSS UI Components | CodeSnaps',
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

function BrowseDashboardPage({ searchParams, params }: DasbboardPageParams) {
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

      <BrowseDashboard
        searchParams={searchParams}
        organization={params.organization}
      />
    </Container>
  );
}

export default BrowseDashboardPage;
