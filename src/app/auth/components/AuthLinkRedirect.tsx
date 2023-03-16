'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useSupabase from '~/core/hooks/use-supabase';
import configuration from '~/configuration';

function AuthLinkRedirect() {
  useRedirectToHomeOnSignIn();

  return null;
}

export default AuthLinkRedirect;

function useRedirectToHomeOnSignIn() {
  const supabase = useSupabase();
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        router.push(configuration.paths.appHome);
      }
    });

    return () => data.subscription.unsubscribe();
  }, [supabase, router]);
}
