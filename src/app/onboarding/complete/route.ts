'use server';

import { z } from 'zod';

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import getLogger from '~/core/logger';
import requireSession from '~/lib/user/require-session';
import completeOnboarding from '~/lib/server/onboarding/complete-onboarding';

import { createOrganizationIdCookie } from '~/lib/server/cookies/organization.cookie';
import { throwInternalServerErrorException } from '~/core/http-exceptions';
import MembershipRole from '~/lib/organizations/types/membership-role';
import inviteMembers from '~/lib/server/organizations/invite-members';
import getSupabaseRouteHandlerClient from '~/core/supabase/route-handler-client';

import configuration from '~/configuration';

export const POST = async (req: NextRequest) => {
  const logger = getLogger();

  const client = getSupabaseRouteHandlerClient();
  const session = await requireSession(client);
  const userId = session.user.id;

  const body = await getOnboardingBodySchema().parseAsync(await req.json());
  const organizationName = body.organization;
  const invites = body.invites;

  const payload = {
    userId,
    organizationName,
    client,
  };

  logger.info(
    {
      userId,
    },
    `Completing onboarding for user...`,
  );

  // complete onboarding and get the organization id created
  const { data: organizationUid, error } = await completeOnboarding(payload);

  if (error) {
    logger.error(
      {
        error,
        userId,
      },
      `Error completing onboarding for user`,
    );

    return throwInternalServerErrorException();
  }

  logger.info(
    {
      invites: invites.length,
    },
    `Processing ${invites.length} members invites...`,
  );

  await inviteMembers({
    organizationUid,
    invites,
    client,
    adminClient: getSupabaseRouteHandlerClient({
      admin: true,
    }),
    inviterId: userId,
  });

  logger.info(
    {
      userId,
      organizationUid,
    },
    `Onboarding successfully completed for user`,
  );

  cookies().set(createOrganizationIdCookie({ userId, organizationUid }));

  const returnUrl = [configuration.paths.appHome, organizationUid].join('/');

  // Add user to email service provider
  try {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.LOOPS_ONBOARDING_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: session.user.email,
        subscribed: true,
        userId: userId,
      }),
    };

    const response = await fetch(
      'https://app.loops.so/api/v1/contacts/create',
      options,
    );
    const responseData = await response.json();

    logger.info(
      {
        userId,
        organizationUid,
        emailServiceProviderResponse: responseData,
      },
      `User successfully added to email service provider`,
    );
  } catch (error) {
    logger.error(
      {
        error,
        userId,
      },
      `Error adding user to email service provider`,
    );

    return throwInternalServerErrorException();
  }

  return NextResponse.json({
    success: true,
    returnUrl,
  });
};

function getOnboardingBodySchema() {
  return z.object({
    organization: z.string().trim().min(1),
    invites: z.array(
      z.object({
        email: z.string().email(),
        role: z.nativeEnum(MembershipRole),
      }),
    ),
  });
}
