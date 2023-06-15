'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';

import Logo from '~/core/ui/Logo';
import Container from '~/core/ui/Container';
import If from '~/core/ui/If';
import Button from '~/core/ui/Button';
import SiteNavigation from './SiteNavigation';
import useSignOut from '~/core/hooks/use-sign-out';
import useUserSession from '~/core/hooks/use-user-session';

import DarkModeToggle from '~/components/DarkModeToggle';
import ProfileDropdown from '~/components/ProfileDropdown';

import configuration from '~/configuration';

const fixedClassName = `FixedHeader`;

const SiteHeader: React.FCC<{
  fixed?: boolean;
}> = ({ fixed }) => {
  const signOut = useSignOut();
  const userSession = useUserSession();

  return (
    <div className={`w-full py-4 ${fixed ? fixedClassName : ''}`}>
      <Container>
        <div className="flex w-full items-center justify-between">
          <div className={'flex items-center lg:space-x-8'}>
            <Logo />

            <div className={'hidden lg:flex'}>
              <SiteNavigation />
            </div>
          </div>

          <div className={'flex flex-1 items-center justify-end space-x-4'}>
            <div className={'hidden items-center lg:flex'}>
              <If
                condition={
                  configuration.enableThemeSwitcher && !userSession?.auth
                }
              >
                <DarkModeToggle />
              </If>
            </div>

            <If condition={userSession} fallback={<AuthButtons />}>
              {(session) => (
                <ProfileDropdown
                  userSession={session}
                  signOutRequested={signOut}
                />
              )}
            </If>

            <div className={'flex lg:hidden'}>
              <SiteNavigation />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

function AuthButtons() {
  return (
    <div className={'hidden space-x-2 lg:flex'}>
      <Button round color={'transparent'} href={configuration.paths.signIn}>
        <span>Sign In</span>
      </Button>

      <Button round color={'secondary'} href={configuration.paths.signUp}>
        <span className={'flex items-center space-x-2'}>
          <span>Sign Up</span>
          <ArrowRightIcon className={'h-4'} />
        </span>
      </Button>
    </div>
  );
}

export default SiteHeader;
