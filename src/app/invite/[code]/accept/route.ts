import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

import { throwInternalServerErrorException } from '~/core/http-exceptions';
import getLogger from '~/core/logger';
import getSupabaseServerClient from '~/core/supabase/server-client';
import requireSession from '~/lib/user/require-session';

import { createOrganizationIdCookie } from '~/lib/server/cookies/organization.cookie';
import { acceptInviteToOrganization } from '~/lib/memberships/mutations';

interface Context {
  params: {
    code: string;
  };
}

export async function POST(request: Request, { params }: Context) {
  const code = params.code;

  const logger = getLogger();
  const adminClient = getSupabaseServerClient({ admin: true });

  const sessionResult = await requireSession(adminClient);

  if ('redirect' in sessionResult) {
    return redirect(sessionResult.destination);
  }

  const user = sessionResult.user;
  const userId = user.id;

  logger.info(
    {
      code,
      userId,
    },
    `Adding member to organization...`
  );

  try {
    const { data, error } = await acceptInviteToOrganization(adminClient, {
      code,
      userId,
    });

    console.error(error);

    if (error) {
      return handleError({ error, code, userId });
    }

    const result = data as { organization: number; membership: number };
    const organizationId = result.organization;
    const membershipId = result.membership;

    logger.info(
      {
        membershipId,
        organizationId,
        userId,
      },
      `Member successfully added to organization`
    );

    const organizationCookie = createOrganizationIdCookie(organizationId);
    const cookies = new NextResponse().cookies.set(organizationCookie);

    console.log({
      cookies: cookies.toString(),
    });

    return NextResponse.json(
      {},
      {
        headers: {
          'Set-Cookie': cookies.toString(),
        },
      }
    );
  } catch (error) {
    return handleError({ error, code, userId });
  }
}

function handleError(params: { error: unknown; code: string; userId: string }) {
  getLogger().error(params, `Encountered an error while accepting invite`);

  return throwInternalServerErrorException();
}
