'use client';

import useSignOut from '~/core/hooks/use-sign-out';
import useUserSession from '~/core/hooks/use-user-session';
import ProfileDropdown from '~/components/ProfileDropdown';
import MobileNavigation from '~/components/MobileNavigation';

import { useRouter } from 'next/navigation';

import Heading from '~/core/ui/Heading';
import AppContainer from '~/app/dashboard/[organization]/components/AppContainer';

import OrganizationsSelector from '~/app/dashboard/[organization]/components/organizations/OrganizationsSelector';
import HeaderSubscriptionStatusBadge from '~/app/dashboard/[organization]/components/organizations/HeaderSubscriptionStatusBadge';
import useCurrentOrganization from '~/lib/organizations/hooks/use-current-organization';
import If from '~/core/ui/If';

const ComponentAppHeader: React.FCC<{
  Icon?: React.ReactNode;
}> = ({ children, Icon }) => {
  const userSession = useUserSession();
  const signOut = useSignOut();
  const currentOrganization = useCurrentOrganization();

  const router = useRouter();

  return (
    <div className="flex items-center justify-between border-b border-neutral-200 dark:border-dark-800 sticky top-0 bg-neutral-50 dark:bg-black">
      <AppContainer>
        <div className={'flex w-full flex-1 justify-between'}>
          <div
            className={
              'flex items-center justify-between space-x-2.5 lg:space-x-0'
            }
          >
            <div className={'flex items-center lg:hidden'}>
              <If condition={currentOrganization?.uuid}>
                {(uid) => <MobileNavigation organizationUid={uid} />}
              </If>
            </div>

            <div className={'flex items-center space-x-2 lg:space-x-4'}>
              <div>
                <OrganizationsSelector />
              </div>

              <Heading type={5}>
                <span className="flex items-center space-x-0.5 lg:space-x-2">
                  <button
                    type="button"
                    className="lg:text-initial mr-4 flex items-center gap-x-1 rounded-md bg-transparent px-2.5 py-1 text-base font-semibold text-neutral-500 ring-neutral-500 hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 dark:text-neutral-300 dark:ring-neutral-600 dark:hover:bg-neutral-800 dark:focus-visible:outline-neutral-400"
                    onClick={() => router.back()}
                  >
                    <ChevronLeftIcon
                      className="h-4 w-4 text-neutral-500 dark:text-neutral-300"
                      aria-hidden="true"
                    />
                    Back
                  </button>

                  <span className="lg:text-initial text-base font-semibold dark:text-white">
                    {children}
                  </span>
                </span>
              </Heading>
            </div>
          </div>

          <div className={'flex items-center space-x-4'}>
            <div className={'hidden items-center md:flex'}>
              <HeaderSubscriptionStatusBadge />
            </div>

            <ProfileDropdown
              userSession={userSession}
              signOutRequested={signOut}
            />
          </div>
        </div>
      </AppContainer>
    </div>
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
