import { NextRequest, NextResponse } from 'next/server';

import { acceptInviteToOrganization } from '~/lib/memberships/mutations';
import getLogger from '~/core/logger';
import configuration from '~/configuration';
import getSupabaseRouteHandlerClient from '~/core/supabase/route-handler-client';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const logger = getLogger();
  const searchParams = requestUrl.searchParams;

  const authCode = searchParams.get('code');
  const inviteCode = searchParams.get('inviteCode');
  const nextUrl = searchParams.get('next') ?? configuration.paths.appHome;

  let userId: Maybe<string> = undefined;

  if (authCode) {
    const client = getSupabaseRouteHandlerClient();

    try {
      const { error, data } =
        await client.auth.exchangeCodeForSession(authCode);

      // if we have an error, we redirect to the error page
      if (error) {
        return onError({
          error: error.message,
          origin: request.url,
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
        origin: request.url,
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

        return onError({
          error: message as string,
          origin: request.url,
        });
      }
    }
  }

  return NextResponse.redirect(new URL(`/${nextUrl.slice(1)}`, request.url));
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

  const adminClient = getSupabaseRouteHandlerClient({ admin: true });

  await acceptInviteToOrganization(adminClient, {
    code: params.inviteCode,
    userId: params.userId,
  });

  logger.info(params, `Invite successfully accepted`);
}

function onError({ error, origin }: { error: string; origin: string }) {
  const errorMessage = getAuthErrorMessage(error);

  getLogger().error(
    {
      error,
    },
    `An error occurred while signing user in`,
  );

  const redirectUrl = new URL(
    `/auth/callback/error?error=${errorMessage}`,
    origin,
  );

  return NextResponse.redirect(redirectUrl);
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
