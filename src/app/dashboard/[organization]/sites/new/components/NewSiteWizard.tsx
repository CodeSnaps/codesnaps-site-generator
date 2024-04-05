'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  startTransition,
} from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '~/core/ui/Button';
import Stepper from '~/core/ui/Stepper';
import Trans from '~/core/ui/Trans';

import { NewSiteWizardDescriptionForm } from '~/app/dashboard/[organization]/sites/new/components/NewSiteWizardDescriptionForm';
import { NewSiteWizardStructureForm } from '~/app/dashboard/[organization]/sites/new/components/NewSiteWizardStructureForm';
import { NewSiteWizardColorForm } from '~/app/dashboard/[organization]/sites/new/components/NewSiteWizardColorForm';
import { NewSiteWizardFinishForm } from '~/app/dashboard/[organization]/sites/new/components/NewSiteWizardFinishForm';
import { generateSiteSchema } from '~/app/dashboard/[organization]/sites/new/actions.server';

enum NewSiteCreationStep {
  Description = 0,
  Structure = 1,
  Color = 2,
  Finish = 3,
}

export type StructureData = {
  structure: Array<{
    component: string;
    content: string;
  }>;
};

const FormContext = createContext<{
  step: NewSiteCreationStep;
  setStep: (
    step: NewSiteCreationStep | ((step: NewSiteCreationStep) => number),
  ) => void;
}>({
  step: NewSiteCreationStep.Description,
  setStep: (
    step: NewSiteCreationStep | ((step: NewSiteCreationStep) => number),
  ) => {},
});

export function useFormContext() {
  return useContext(FormContext);
}

function NewSiteWizard({ activeSub }: { activeSub: boolean }) {
  const [step, setStep] = useState(NewSiteCreationStep.Description);

  return (
    <FormContext.Provider value={{ step, setStep }}>
      <div className="flex flex-col space-y-16">
        <NewSiteWizardSteps />

        <NewSiteWizardFormContainer activeSub={activeSub} />
      </div>
    </FormContext.Provider>
  );
}

function NewSiteWizardFormContainer({ activeSub }: { activeSub: boolean }) {
  const { step, setStep } = useFormContext();

  const descriptionForm = useForm<{
    description: string;
  }>({
    defaultValues: {
      description: '',
    },
  });

  const structureForm = useForm<StructureData>({
    defaultValues: {
      structure: [],
    },
  });

  const colorForm = useForm<{
    color: string;
  }>({
    defaultValues: {
      color: 'amber',
    },
  });

  const onCreateSiteRequested = useCallback(() => {
    startTransition(() => {
      const generateSite = async () => {
        await generateSiteSchema({
          description: descriptionForm.getValues('description'),
          structure: structureForm.getValues('structure'),
          color: colorForm.getValues('color'),
          activeSubscription: activeSub,
        });
      };
      generateSite();
    });
  }, [descriptionForm, structureForm, colorForm]);

  switch (step) {
    case NewSiteCreationStep.Description:
      return (
        <NewSiteWizardDescriptionForm
          form={descriptionForm}
          onStructureFetched={(data) => {
            structureForm.setValue('structure', data);
            setStep((currentStep) => currentStep + 1);
          }}
        />
      );

    case NewSiteCreationStep.Structure:
      return (
        <NewSiteWizardStructureForm
          form={structureForm}
          onSubmit={(data) => {
            structureForm.setValue('structure', data.structure);
            setStep((currentStep) => currentStep + 1);
          }}
        />
      );

    case NewSiteCreationStep.Color:
      return (
        <NewSiteWizardColorForm
          form={colorForm}
          onSubmit={(data) => {
            colorForm.setValue('color', data.color);
            setStep((currentStep) => currentStep + 1);
            onCreateSiteRequested();
          }}
        />
      );

    case NewSiteCreationStep.Finish:
      return <NewSiteWizardFinishForm />;

    default:
      return null;
  }
}

function NewSiteWizardSteps() {
  const { step } = useFormContext();

  const steps = [
    'sites:descriptionStepLabel',
    'sites:structureStepLabel',
    'sites:colorStepLabel',
    'sites:finishStepLabel',
  ];

  return <Stepper steps={steps} currentStep={step} />;
}

export function NextStepButton(props: React.PropsWithChildren) {
  return (
    <Button>
      {props.children ?? <Trans i18nKey={'sites:nextStepButtonLabel'} />}
    </Button>
  );
}

export function PreviousStepButton(props: React.PropsWithChildren) {
  const { setStep } = useFormContext();

  return (
    <Button
      variant={'outline'}
      type={'button'}
      onClick={() => {
        setStep((step) => step - 1);
      }}
    >
      {props.children ?? <Trans i18nKey={'sites:backStepButtonLabel'} />}
    </Button>
  );
}

export default NewSiteWizard;
