'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import type { Session } from '@supabase/auth-helpers-nextjs';

import Spinner from '~/core/ui/Spinner';
import useSupabase from '~/core/hooks/use-supabase';

function ImpersonateUserAuthSetter({
  session,
}: React.PropsWithChildren<{
  session: Session;
}>) {
  const supabase = useSupabase();
  const router = useRouter();

  useEffect(() => {
    async function setAuth() {
      await supabase.auth.setSession({
        refresh_token: session.refresh_token,
        access_token: session.access_token,
      });

      router.push('/dashboard');
    }

    void setAuth();
  }, [router, session.access_token, session.refresh_token, supabase.auth]);

  return (
    <div
      className={
        'flex flex-col flex-1 h-screen w-screen items-center justify-center'
      }
    >
      <div className={'flex flex-col space-y-4 items-center'}>
        <Spinner />

        <div>
          <p>Setting up your session...</p>
        </div>
      </div>
    </div>
  );
}

export default ImpersonateUserAuthSetter;
