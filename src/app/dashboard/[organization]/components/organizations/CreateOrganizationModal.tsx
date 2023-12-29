import { useFormStatus } from 'react-dom';

import Modal from '~/core/ui/Modal';
import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';

import Trans from '~/core/ui/Trans';
import { createNewOrganizationAction } from '~/lib/organizations/actions';

const Heading = (
  <Trans i18nKey={'organization:createOrganizationModalHeading'} />
);

const CreateOrganizationModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = ({ isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} heading={Heading}>
      <form action={createNewOrganizationAction}>
        <div className={'flex flex-col space-y-6'}>
          <TextField>
            <TextField.Label>
              <Trans i18nKey={'organization:organizationNameLabel'} />

              <TextField.Input
                data-cy={'create-organization-name-input'}
                name={'organization'}
                required
                minLength={2}
                maxLength={50}
                placeholder={'ex. IndieCorp'}
              />
            </TextField.Label>
          </TextField>

          <div className={'flex justify-end'}>
            <SubmitButton />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateOrganizationModal;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button data-cy={'confirm-create-organization-button'} loading={pending}>
      <Trans i18nKey={'organization:createOrganizationSubmitLabel'} />
    </Button>
  );
}
