import useSWRMutation from 'swr/mutation';
import useApiRequest from '~/core/hooks/use-api';
import { useForm } from 'react-hook-form';

import Heading from '~/core/ui/Heading';
import {
  TextFieldInput,
  TextFieldHint,
  TextFieldLabel,
} from '~/core/ui/TextField';
import Trans from '~/core/ui/Trans';

import {
  StructureData,
  NextStepButton,
} from '~/app/dashboard/[organization]/sites/new/components/NewSiteWizard';
import LoadingOverlay from '~/core/ui/LoadingOverlay';

export function NewSiteWizardDescriptionForm({
  form,
  onStructureFetched,
}: {
  form: ReturnType<
    typeof useForm<{
      description: string;
    }>
  >;
  onStructureFetched: (structure: StructureData['structure']) => void;
}) {
  const fetchStructure = useFetchStructureFromDescription();

  if (fetchStructure.isMutating) {
    return (
      <LoadingOverlay fullPage={false}>
        <Trans i18nKey="sites:generatingSiteStructure" />
      </LoadingOverlay>
    );
  }

  return (
    <form
      className="flex"
      onSubmit={form.handleSubmit(async (values) => {
        const response = await fetchStructure.trigger({
          description: values.description,
        });

        if (!response) {
          return;
        }

        onStructureFetched(response.data);
      })}
    >
      <div className="mx-auto flex flex-col space-y-6 mt-10">
        <Heading type={3}>
          <Trans i18nKey="sites:descriptionStepTitle" />
        </Heading>

        <div className="flex flex-col space-y-2">
          <TextFieldLabel>
            <Trans i18nKey="sites:descriptionInputLabel" />
          </TextFieldLabel>
          <TextFieldInput
            {...form.register('description', {
              required: true,
              minLength: 1,
              maxLength: 250,
            })}
          />
          <TextFieldHint>
            <Trans i18nKey="sites:descriptionInputHint" />
          </TextFieldHint>
        </div>

        <div>
          <NextStepButton />
        </div>
      </div>
    </form>
  );
}

function useFetchStructureFromDescription() {
  type Params = {
    description: string;
  };

  const key = ['sites/structure'];

  const request = useApiRequest<
    {
      data: StructureData['structure'];
    },
    Params
  >();

  const fetcher = (body: Params) => {
    return request({
      path: `/api/sites/structure`,
      body,
    });
  };

  return useSWRMutation(key, (_, { arg }: { arg: Params }) => {
    return fetcher(arg);
  });
}
