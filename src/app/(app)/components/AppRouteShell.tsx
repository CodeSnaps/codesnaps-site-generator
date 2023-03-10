'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Session } from '@supabase/supabase-js';

import useCollapsible from '~/core/hooks/use-sidebar-state';
import GuardedPage from '~/app/(app)/components/GuardedPage';
import AppSidebar from '~/app/(app)/components/AppSidebar';
import Toaster from '~/app/(app)/components/Toaster';
import MembershipRole from '~/lib/organizations/types/membership-role';
import UserData from '~/core/session/types/user-data';
import Organization from '~/lib/organizations/types/organization';
import UserSession from '~/core/session/types/user-session';

import OrganizationContext from '~/lib/contexts/organization';
import CsrfTokenContext from '~/lib/contexts/csrf';
import SidebarContext from '~/lib/contexts/sidebar';
import UserSessionContext from '~/core/session/contexts/user-session';
import I18nProvider from '~/i18n/I18nProvider';

import { setCookie } from '~/core/generic/cookies';

interface Data {
  language: string;
  csrfToken: string | null;
  session: Session;
  user: UserData;
  organization: Organization;
  role: MembershipRole;
  ui: {
    sidebarState?: string;
    theme?: string;
  };
}

const RouteShell: React.FCC<{
  data: Data;
}> = ({ data, children }) => {
  const userSessionContext: UserSession = useMemo(() => {
    return {
      auth: data.session,
      data: data.user,
      role: data.role,
    };
  }, [data]);

  const [organization, setOrganization] = useState<Maybe<Organization>>(
    data.organization || undefined
  );

  const [userSession, setUserSession] =
    useState<Maybe<UserSession>>(userSessionContext);

  const updateCurrentOrganization = useCallback(() => {
    setOrganization(data.organization ?? undefined);

    const organizationId = data.organization.id;

    if (organizationId) {
      setCookie('organizationId', organizationId.toString());
    }
  }, [data.organization]);

  const updateCurrentUser = useCallback(() => {
    if (userSessionContext.auth) {
      setUserSession(userSessionContext);
    }
  }, [userSessionContext]);

  useEffect(updateCurrentOrganization, [updateCurrentOrganization]);
  useEffect(updateCurrentUser, [updateCurrentUser]);

  return (
    <UserSessionContext.Provider value={{ userSession, setUserSession }}>
      <OrganizationContext.Provider value={{ organization, setOrganization }}>
        <CsrfTokenContext.Provider value={data.csrfToken}>
          <I18nProvider lang={data.language}>
            <GuardedPage session={data.session} whenSignedOut={'/'}>
              <main>
                <Toaster />

                <RouteShellWithSidebar
                  collapsed={data.ui.sidebarState === 'collapsed'}
                >
                  {children}
                </RouteShellWithSidebar>
              </main>
            </GuardedPage>
          </I18nProvider>
        </CsrfTokenContext.Provider>
      </OrganizationContext.Provider>
    </UserSessionContext.Provider>
  );
};

export default RouteShell;

function RouteShellWithSidebar(
  props: React.PropsWithChildren<{
    collapsed: boolean;
  }>
) {
  const [collapsed, setCollapsed] = useCollapsible(props.collapsed);

  return (
    <div className={'flex h-full flex-1 overflow-hidden'}>
      <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
        <div className={'hidden lg:block'}>
          <AppSidebar />
        </div>

        <div className={'relative mx-auto h-screen w-full overflow-y-auto'}>
          <div>{props.children}</div>
        </div>
      </SidebarContext.Provider>
    </div>
  );
}
