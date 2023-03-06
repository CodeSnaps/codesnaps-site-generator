'use client';

import { useCallback, useState } from 'react';

import OrganizationInfoStep, {
  OrganizationInfoStepData,
} from './OrganizationInfoStep';

import CompleteOnboardingStep from './CompleteOnboardingStep';
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
    <div className={'w-9/12'}>
      <If condition={currentStep === 0}>
        <OrganizationInfoStep onSubmit={onFirstStepSubmitted} />
      </If>

      <If condition={currentStep === 1 && formData}>
        {(formData) => <CompleteOnboardingStep data={formData} />}
      </If>
    </div>
  );
}

export default OnboardingContainer;
