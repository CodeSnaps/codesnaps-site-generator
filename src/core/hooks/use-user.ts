import useSWR from 'swr';
import useSupabase from '~/core/hooks/use-supabase';

/**
 * @name useUser
 */
function useUser() {
  const client = useSupabase();
  const key = 'user';

  return useSWR([key], async () => {
    return client.auth
      .getUser()
      .then((result) => {
        return result.data.user;
      })
      .catch(() => undefined);
  });
}

export default useUser;
