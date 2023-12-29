import { useCallback, useTransition } from 'react';

import Trans from '~/core/ui/Trans';
import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';

import { deleteMemberAction } from '~/lib/memberships/actions';

const Heading = <Trans i18nKey="organization:removeMemberModalHeading" />;

const RemoveOrganizationMemberModal: React.FCC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  membershipId: number;
}> = ({ isOpen, setIsOpen, membershipId }) => {
  const [isSubmitting, startTransition] = useTransition();

  const onMemberRemoved = useCallback(() => {
    startTransition(async () => {
      await deleteMemberAction({ membershipId });

      setIsOpen(false);
    });
  }, [membershipId, setIsOpen]);

  return (
    <Modal heading={Heading} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={'flex flex-col space-y-6'}>
        <p className={'text-sm'}>
          <Trans i18nKey={'common:modalConfirmationQuestion'} />
        </p>

        <div className={'flex justify-end space-x-2'}>
          <Modal.CancelButton onClick={() => setIsOpen(false)} />

          <Button
            type={'button'}
            loading={isSubmitting}
            data-cy={'confirm-remove-member'}
            variant={'destructive'}
            onClick={onMemberRemoved}
          >
            <Trans i18nKey={'organization:removeMemberSubmitLabel'} />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveOrganizationMemberModal;
