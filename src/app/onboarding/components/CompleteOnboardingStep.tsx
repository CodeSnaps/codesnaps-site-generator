import { useCallback, useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { useRouter } from 'next/navigation';

import Spinner from '~/core/ui/Spinner';
import useApiRequest from '~/core/hooks/use-api';
import configuration from '~/configuration';

interface CompleteOnboardingStepData {
  organization: string;
}

const CompleteOnboardingStep: React.FC<{
  data: CompleteOnboardingStepData;
}> = ({ data }) => {
  const submit = useCompleteOnboardingRequest();
  const router = useRouter();

  const callRequestCallback = useCallback(async () => {
    await submit.trigger(data);

    return router.push(configuration.paths.appHome);
  }, [submit, data, router]);

  useEffect(() => {
    if (submit.isMutating || submit.error || submit.data) {
      return;
    }

    void callRequestCallback();
  }, [callRequestCallback, submit.data, submit.error, submit.isMutating]);

  return (
    <div className={'flex flex-1 flex-col items-center space-y-8'}>
      <span>
        <Spinner className={'h-12 w-12'} />
      </span>

      <span>Getting Started. Please wait...</span>
    </div>
  );
};

function useCompleteOnboardingRequest() {
  const fetcher = useApiRequest<
    unknown,
    {
      organization: string;
    }
  >();

  const endpoint = `/onboarding`;

  return useSWRMutation(
    endpoint,
    (
      path,
      {
        arg: body,
      }: {
        arg: {
          organization: string;
        };
      }
    ) => {
      return fetcher({
        path,
        method: 'POST',
        body,
      });
    }
  );
}

export default CompleteOnboardingStep;
