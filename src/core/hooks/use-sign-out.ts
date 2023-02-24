import { useCallback } from 'react';
import useSupabase from '~/core/hooks/use-supabase';

/**
 * @name useSignOut
 * @param redirect - whether it should redirect to the home page
 */
function useSignOut(redirect = true) {
  const client = useSupabase();

  return useCallback(async () => {
    await client.auth.signOut();

    if (redirect) {
      window.location.assign('/');
    } else {
      // TODO: remove this whe Supabase fixes it.
      // Supabase has a bug: it doesn't emit a logout event
      // so we force it by reloading the page
      window.location.reload();
    }
  }, [client.auth, redirect]);
}

export default useSignOut;
