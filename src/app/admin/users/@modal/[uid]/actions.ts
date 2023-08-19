'use server';

import { revalidatePath } from 'next/cache';

import getSupabaseServerActionClient from '~/core/supabase/action-client';
import { withAdminSession, withCsrfCheck } from '~/core/generic/actions-utils';

const getClient = () => getSupabaseServerActionClient({ admin: true });

export const banUser = withCsrfCheck(
  withAdminSession(async ({ userId }) => {
    await setBanDuration(userId, `876600h`);
  }),
);

export const reactivateUser = withCsrfCheck(
  withAdminSession(async ({ userId }) => {
    await setBanDuration(userId, `none`);
  }),
);

export const impersonateUser = withCsrfCheck(
  withAdminSession(async ({ userId }) => {
    const client = getClient();

    const {
      data: { user },
      error,
    } = await client.auth.admin.getUserById(userId);

    if (error || !user) {
      throw new Error(`Error fetching user`);
    }

    const email = user.email;

    if (!email) {
      throw new Error(`User has no email. Cannot impersonate`);
    }

    const { error: linkError, data } =
      await getClient().auth.admin.generateLink({
        type: 'magiclink',
        email,
        options: {
          redirectTo: `/`,
        },
      });

    if (linkError || !data) {
      throw new Error(`Error generating magic link`);
    }

    const response = await fetch(data.properties?.action_link, {
      method: 'GET',
      redirect: 'manual',
    });

    const location = response.headers.get('Location');

    if (!location) {
      throw new Error(`Error generating magic link. Location header not found`);
    }

    const hash = new URL(location).hash.substring(1);
    const query = new URLSearchParams(hash);
    const accessToken = query.get('access_token');
    const refreshToken = query.get('refresh_token');

    if (!accessToken || !refreshToken) {
      throw new Error(
        `Error generating magic link. Tokens not found in URL hash.`,
      );
    }

    return {
      accessToken,
      refreshToken,
    };
  }),
);

async function setBanDuration(userId: string, banDuration: string) {
  await getClient().auth.admin.updateUserById(userId, {
    ban_duration: banDuration,
  });

  revalidatePath('/admin/users');
}
