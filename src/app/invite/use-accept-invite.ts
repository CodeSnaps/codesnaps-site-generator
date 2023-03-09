import useApiRequest from '~/core/hooks/use-api';
import useSWRMutation from 'swr/mutation';

function useAcceptInvite() {
  const fetcher = useApiRequest<void, {}>();
  const key = ['invite', 'accept'];

  return useSWRMutation(key, async () => {
    const path = [window.location.pathname, 'accept'].join('/');

    return fetcher({
      path,
      method: 'POST',
      body: {},
    });
  });
}

export default useAcceptInvite;
