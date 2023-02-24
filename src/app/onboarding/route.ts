import { z } from 'zod';
import { NextResponse } from 'next/server';

import getLogger from '~/core/logger';
import requireSession from '~/lib/user/require-session';
import completeOnboarding from '~/lib/server/onboarding/complete-onboarding';
import { createOrganizationIdCookie } from '~/lib/server/cookies/organization.cookie';

import {
  throwBadRequestException,
  throwInternalServerErrorException,
} from '~/core/http-exceptions';

import getSupabaseServerClient from '~/core/supabase/server-client';

export async function POST(req: Request) {
  const logger = getLogger();
  const response = new NextResponse();

  const client = await getSupabaseServerClient();
  const { user } = await requireSession(client);

  const userId = user.id;
  const parsedBody = await getBodySchema().safeParseAsync(req.body);

  if (!parsedBody.success) {
    return throwBadRequestException();
  }

  const organizationName = parsedBody.data.organization;

  const payload = {
    userId,
    organizationName,
    client,
  };

  logger.info(
    {
      userId,
    },
    `Completing onboarding for user...`
  );

  try {
    // complete onboarding and get the organization id created
    const organizationId = await completeOnboarding(payload);

    logger.info(
      {
        userId,
        organizationId,
      },
      `Onboarding successfully completed for user`
    );

    response.cookies.set(createOrganizationIdCookie(organizationId));

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    logger.error({ error }, `Failed to complete onboarding`);

    return throwInternalServerErrorException();
  }
}

function getBodySchema() {
  return z.object({
    organization: z.string(),
  });
}
