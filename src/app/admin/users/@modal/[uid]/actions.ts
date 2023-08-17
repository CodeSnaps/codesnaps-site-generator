'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

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

    const actionLink = data.properties.action_link;
    const redirectLink = `/admin/users/${userId}/impersonate/callback`;

    // Due to an issue with the magic link, we need to manually construct the link
    // TODO: remove this once the issue is fixed as Supabase should handle this
    const impersonationLoginLink = [actionLink, redirectLink].join('/');

    redirect(impersonationLoginLink);
  }),
);

async function setBanDuration(userId: string, banDuration: string) {
  await getClient().auth.admin.updateUserById(userId, {
    ban_duration: banDuration,
  });

  revalidatePath('/admin/users');
}
