'use client';

import { useCallback, useEffect } from 'react';
import type { Session } from '@supabase/gotrue-js';
import { useRouter } from 'next/navigation';

import isBrowser from '~/core/generic/is-browser';
import useSupabase from '~/core/hooks/use-supabase';

const AuthRedirectListener: React.FCC<{
  whenSignedOut?: string;
  session: Session;
}> = ({ children, session, whenSignedOut }) => {
  const client = useSupabase();
  const router = useRouter();
  const redirectUserAway = useRedirectUserAway();
  const serverSessionToken = session.access_token;

  useEffect(() => {
    // keep this running for the whole session
    // unless the component was unmounted, for example, on log-outs
    const listener = client.auth.onAuthStateChange((state, user) => {
      // log user out if user is falsy
      // and if the consumer provided a route to redirect the user
      const shouldLogOut = !user && whenSignedOut;

      if (shouldLogOut) {
        return redirectUserAway(whenSignedOut);
      }

      const isOutOfSync = user?.access_token !== serverSessionToken;

      // server and client are out of sync.
      // We need to recall active loaders after actions complete
      if (isOutOfSync) {
        void router.refresh();
      }
    });

    // destroy listener on un-mounts
    return () => listener.data.subscription.unsubscribe();
  }, [client.auth, redirectUserAway, whenSignedOut]);

  return <>{children}</>;
};

export default function GuardedPage({
  children,
  whenSignedOut,
  session,
}: React.PropsWithChildren<{
  whenSignedOut?: string;
  session: Session;
}>) {
  const shouldActivateListener = isBrowser();

  // we only activate the listener if
  // we are rendering in the browser
  if (!shouldActivateListener) {
    return <>{children}</>;
  }

  return (
    <AuthRedirectListener session={session} whenSignedOut={whenSignedOut}>
      {children}
    </AuthRedirectListener>
  );
}

function useRedirectUserAway() {
  return useCallback((path: string) => {
    const currentPath = window.location.pathname;
    const isNotCurrentPage = currentPath !== path;

    // we then redirect the user to the page
    // specified in the props of the component
    if (isNotCurrentPage) {
      window.location.assign(path);
    }
  }, []);
}
