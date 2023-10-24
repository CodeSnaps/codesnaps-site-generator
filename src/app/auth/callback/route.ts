import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

import { acceptInviteToOrganization } from '~/lib/memberships/mutations';
import getSupabaseServerActionClient from '~/core/supabase/action-client';

import { Database } from '~/database.types';
import getLogger from '~/core/logger';
import configuration from '~/configuration';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const logger = getLogger();

  const authCode = requestUrl.searchParams.get('code');
  const inviteCode = requestUrl.searchParams.get('inviteCode');

  let userId: Maybe<string> = undefined;

  if (authCode) {
    const client = createRouteHandlerClient<Database>({ cookies });

    try {
      const { error, data } =
        await client.auth.exchangeCodeForSession(authCode);

      // if we have an error, we redirect to the error page
      if (error) {
        return onError({
          error: error.message,
        });
      }

      userId = data.user.id;
    } catch (error) {
      logger.error(
        {
          error,
        },
        `An error occurred while exchanging code for session`,
      );

      const message = error instanceof Error ? error.message : error;

      return onError({
        error: message as string,
      });
    }

    if (inviteCode && userId) {
      try {
        // if we have an invite code, we accept the invite
        await acceptInviteFromEmailLink({ inviteCode, userId });
      } catch (error) {
        logger.error(
          {
            userId,
            inviteCode,
            error,
          },
          `An error occurred while accepting user invite`,
        );

        const message = error instanceof Error ? error.message : error;

        onError({
          error: message as string,
        });
      }
    }
  }

  return redirect(configuration.paths.appHome);
}

/**
 * @name acceptInviteFromEmailLink
 * @description If we find an invite code, we try to accept the invite
 * received from the email link method
 * @param params
 */
async function acceptInviteFromEmailLink(params: {
  inviteCode: string;
  userId: Maybe<string>;
}) {
  const logger = getLogger();

  if (!params.userId) {
    logger.error(params, `Attempted to accept invite, but no user id provided`);

    return;
  }

  logger.info(params, `Found invite code. Accepting invite...`);

  const adminClient = getSupabaseServerActionClient({ admin: true });

  await acceptInviteToOrganization(adminClient, {
    code: params.inviteCode,
    userId: params.userId,
  });

  logger.info(params, `Invite successfully accepted`);
}

function onError({ error }: { error: string }) {
  const errorMessage = getAuthErrorMessage(error);

  getLogger().error(
    {
      error,
    },
    `An error occurred while signing user in`,
  );

  redirect(`/auth/callback/error?error=${errorMessage}`);
}

/**
 * Checks if the given error message indicates a verifier error.
 * We check for this specific error because it's highly likely that the
 * user is trying to sign in using a different browser than the one they
 * used to request the sign in link. This is a common mistake, so we
 * want to provide a helpful error message.
 */
function isVerifierError(error: string) {
  return error.includes('both auth code and code verifier should be non-empty');
}

function getAuthErrorMessage(error: string) {
  return isVerifierError(error)
    ? `auth:errors.codeVerifierMismatch`
    : `auth:authenticationErrorAlertBody`;
}
