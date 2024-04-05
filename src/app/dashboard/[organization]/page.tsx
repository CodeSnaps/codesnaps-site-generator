import AppHeader from '~/app/dashboard/[organization]/components/AppHeader';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/core/ui/Card';
import { Button } from '~/core/ui/Button';
import DashboardStats from '~/app/dashboard/[organization]/components/DashboardStats';

import { withI18n } from '~/i18n/with-i18n';

export const metadata = {
  title: 'Tailwind CSS UI Components | CodeSnaps',
};

interface DasbboardPageParams {
  params: {
    organization: string;
  };
}

function DashboardPage({ params }: DasbboardPageParams) {
  return (
    <>
      <AppHeader
        title="Welcome to CodeSnaps"
        description="Where building websites is a snap with AI and tons of cool components!"
      />

      <div className="grid lg:grid-cols-2 gap-4 mx-10 mt-8">
        <Card className="flex flex-col justify-between border-none ring rounded py-4 px-2 bg-red-50/50 ring-red-500 dark:bg-red-950/20 dark:ring-red-950">
          <CardHeader>
            <CardTitle className="text-red-950 dark:text-white lg:text-3xl">
              Get Started With the AI Site Builder
            </CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription className="text-red-600 dark:text-red-100 leading-relaxed lg:text-lg">
              Streamline your workflow with our AI Site Builder. Generate
              stunning web pages and export them as Next.js or React components
              effortlessly.
            </CardDescription>
          </CardContent>

          <CardFooter>
            <Button
              href={`/dashboard/${params.organization}/sites`}
              variant="custom"
              className="bg-red-600 dark:bg-red-900 text-white hover:bg-red-500 dark:hover:bg-red-800"
            >
              Create Site
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col justify-between border-none ring rounded py-4 px-2 bg-green-50/50 ring-green-600 dark:bg-green-950/20 dark:ring-green-950">
          <CardHeader>
            <CardTitle className="text-green-950 dark:text-white lg:text-3xl">
              Browse Our Tailwind CSS UI Template Library
            </CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription className="text-green-800 dark:text-green-100 leading-relaxed lg:text-lg">
              Access a variety of pre-designed components like Hero, Navbar,
              Footer, and more with our UI Template Library. Simplify your
              design process and create stunning websites in no time.
            </CardDescription>
          </CardContent>

          <CardFooter>
            <Button
              href={`/dashboard/${params.organization}/browse-components`}
              variant="custom"
              className="bg-green-700 dark:bg-green-900 text-white hover:bg-green-600 dark:hover:bg-green-800"
            >
              Browse Components
            </Button>
          </CardFooter>
        </Card>
      </div>

      <DashboardStats orgUid={params.organization} />
    </>
  );
}

export default withI18n(DashboardPage);
