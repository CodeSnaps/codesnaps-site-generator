'use client';

import { useCallback, useEffect } from 'react';
import useSWRMutation from 'swr/mutation';

import Spinner from '~/core/ui/Spinner';
import useApiRequest from '~/core/hooks/use-api';
import useCsrfTokenHeader from '~/core/hooks/use-csrf-token-header';

interface CompleteOnboardingStepData {
  organization: string;
}

const CompleteOnboardingStep: React.FC<{
  data: CompleteOnboardingStepData;
}> = ({ data }) => {
  const submit = useCompleteOnboardingRequest();

  const callRequestCallback = useCallback(async () => {
    await submit.trigger(data);
  }, [submit, data]);

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
  const csrfTokenHeader = useCsrfTokenHeader();
  const endpoint = `/onboarding/complete`;

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
        headers: csrfTokenHeader,
      });
    }
  );
}

export default CompleteOnboardingStep;
