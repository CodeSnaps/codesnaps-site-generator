'use client';

import { useRouter } from 'next/navigation';

import MobileAppNavigation from '~/components/MobileAppNavigation';
import { PageHeader } from '~/core/ui/Page';

const ComponentAppHeader: React.FCC<{
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
}> = ({ title, description }) => {
  const router = useRouter();

  return (
    <PageHeader
      title={title}
      description={description}
      mobileNavigation={<MobileAppNavigation />}
    >
      <button
        type="button"
        className="lg:text-initial mr-4 flex items-center gap-x-1 rounded-md bg-transparent pl-2 pr-3 py-2 text-base font-semibold text-neutral-500 ring-neutral-500 hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 dark:text-neutral-300 dark:ring-neutral-600 dark:hover:bg-neutral-800 dark:focus-visible:outline-neutral-400"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon
          className="h-4 w-4 text-neutral-500 dark:text-neutral-300"
          aria-hidden="true"
        />
        Back
      </button>
    </PageHeader>
  );
};

export default ComponentAppHeader;

function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      />
    </svg>
  );
}
