'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import type { User } from '@supabase/gotrue-js';

import Modal from '~/core/ui/Modal';
import Button from '~/core/ui/Button';
import useCsrfToken from '~/core/hooks/use-csrf-token';
import { impersonateUser } from '~/app/admin/users/@modal/[uid]/actions';

function ImpersonateUserConfirmationModal({
  user,
}: React.PropsWithChildren<{
  user: User;
}>) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [pending, startTransition] = useTransition();
  const csrfToken = useCsrfToken();
  const displayText = user.email ?? user.phone ?? '';

  const onDismiss = () => {
    router.back();

    setIsOpen(false);
  };

  const onConfirm = () => {
    startTransition(async () => {
      await impersonateUser({
        userId: user.id,
        csrfToken,
      });
    });
  };

  return (
    <Modal heading={'Impersonate User'} isOpen={isOpen} setIsOpen={onDismiss}>
      <div className={'flex flex-col space-y-4'}>
        <div className={'flex flex-col space-y-2 text-sm'}>
          <p>
            You are about to impersonate the account belonging to{' '}
            <b>{displayText}</b> with ID <b>{user.id}</b>.
          </p>

          <p>
            You will be able to log in as them, see and do everything they can.
            To return to your own account, simply log out.
          </p>

          <p>
            Like Uncle Ben said, with great power comes great responsibility.
            Use this power wisely.
          </p>
        </div>

        <div className={'flex space-x-2.5 justify-end'}>
          <Modal.CancelButton disabled={pending} onClick={onDismiss}>
            Cancel
          </Modal.CancelButton>

          <Button
            loading={pending}
            variant={'flat'}
            color={'danger'}
            onClick={onConfirm}
          >
            Yes, let&apos;s do it
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ImpersonateUserConfirmationModal;
