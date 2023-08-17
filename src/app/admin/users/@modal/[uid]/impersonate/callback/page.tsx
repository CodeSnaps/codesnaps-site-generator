import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import getLogger from '~/core/logger';
import getSupabaseServerClient from '~/core/supabase/server-client';
import isUserSuperAdmin from '~/app/admin/utils/is-user-super-admin';
import ImpersonateUserAuthSetter from '../../components/ImpersonateUserAuthSetter';

async function ImpersonateCallbackPageComponent({
  params,
}: {
  params: {
    uid: string;
  };
}) {
  const isAdmin = await isUserSuperAdmin();

  if (!isAdmin) {
    redirect('/');
  }

  const userId = params.uid;
  const logger = getLogger();
  const client = getSupabaseServerClient({ admin: true });

  const refreshToken = cookies().get('sb-refresh-token');
  const accessToken = cookies().get('sb-access-token');

  if (refreshToken && accessToken) {
    const signOut = await client.auth.signOut();

    if (signOut.error) {
      logger.error(
        {
          error: signOut.error,
          userId,
        },
        `Failed to sign out user`,
      );
    }

    const { error, data } = await client.auth.setSession({
      refresh_token: refreshToken.value,
      access_token: accessToken.value,
    });

    if (error) {
      logger.error(
        {
          error,
          userId,
        },
        `Failed to impersonate user`,
      );

      throw new Error(`Failed to impersonate user`);
    }

    logger.info(
      {
        userId,
      },
      `Impersonated user. Redirecting to dashboard...`,
    );

    if (!data.session) {
      throw new Error(`Failed to impersonate user`);
    }

    return <ImpersonateUserAuthSetter session={data.session} />;
  }

  // if no refresh token or access token, redirect to admin users page
  redirect('/admin/users');
}

export default ImpersonateCallbackPageComponent;
