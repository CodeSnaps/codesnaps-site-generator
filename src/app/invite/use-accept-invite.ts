import useApiRequest from '~/core/hooks/use-api';
import useSWRMutation from 'swr/mutation';

function useAcceptInvite() {
  const fetcher = useApiRequest();
  const key = ['invite', 'accept'];

  return useSWRMutation(key, async () => {
    const path = [window.location.pathname, 'accept'].join('/');

    return fetcher({
      path,
      method: 'POST',
    });
  });
}

export default useAcceptInvite;
