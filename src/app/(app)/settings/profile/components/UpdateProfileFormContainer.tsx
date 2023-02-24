'use client';

import { useCallback, useContext } from 'react';
import type { User } from '@supabase/gotrue-js';

import UserSessionContext from '~/core/session/contexts/user-session';
import useUserSession from '~/core/hooks/use-user-session';
import UserData from '~/core/session/types/user-data';
import UpdateProfileForm from '~/app/(app)/settings/profile/components/UpdateProfileForm';

function UpdateProfileFormContainer() {
  const { userSession, setUserSession } = useContext(UserSessionContext);
  const user = useUserSession();

  const onUpdateProfileData = useCallback(
    (data: Partial<UserData>) => {
      const userRecordData = userSession?.data;

      if (userRecordData) {
        setUserSession({
          ...userSession,
          data: {
            ...userRecordData,
            ...data,
          },
        });
      }
    },
    [setUserSession, userSession]
  );

  const onUpdateAuthData = useCallback(
    (data: Partial<User>) => {
      const user = userSession?.auth;

      if (user) {
        setUserSession({
          ...userSession,
          auth: {
            ...user,
            ...data,
          },
        });
      }
    },
    [setUserSession, userSession]
  );

  if (!user) {
    return null;
  }

  return (
    <UpdateProfileForm
      user={user}
      onUpdateAuthData={onUpdateAuthData}
      onUpdateProfileData={onUpdateProfileData}
    />
  );
}

export default UpdateProfileFormContainer;
