'use client';

import { useCallback, useState } from 'react';

import OrganizationInfoStep, {
  OrganizationInfoStepData,
} from '~/app/onboarding/components/OrganizationInfoStep';

import CompleteOnboardingStep from '~/app/onboarding/components/CompleteOnboardingStep';
import OnboardingIllustration from '~/app/onboarding/components/OnboardingIllustration';

import Logo from '~/core/ui/Logo';
import If from '~/core/ui/If';

interface Data {
  organization: string;
}

function OnboardingContainer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Data>();

  const onFirstStepSubmitted = useCallback(
    (organizationInfo: OrganizationInfoStepData) => {
      setFormData({
        organization: organizationInfo.organization,
      });

      setCurrentStep(1);
    },
    []
  );

  return (
    <div className={'flex flex-1 flex-col dark:bg-black-500'}>
      <div className={'flex divide-x divide-gray-100 dark:divide-black-300'}>
        <div
          className={
            'flex h-screen w-full flex-1 flex-col items-center justify-center lg:w-6/12'
          }
        >
          <div className={'absolute top-24 hidden lg:flex'}>
            <Logo href={'/onboarding'} />
          </div>

          <div className={'w-9/12'}>
            <If condition={currentStep === 0}>
              <OrganizationInfoStep onSubmit={onFirstStepSubmitted} />
            </If>

            <If condition={currentStep === 1 && formData}>
              {(formData) => <CompleteOnboardingStep data={formData} />}
            </If>
          </div>
        </div>

        <div
          className={
            'hidden w-6/12 flex-1 items-center justify-center bg-gray-50 dark:bg-black-400 lg:flex'
          }
        >
          <div>
            <OnboardingIllustration />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingContainer;
