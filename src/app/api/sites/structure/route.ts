import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { SitesLlmService } from '~/lib/ai/sites-llm.service';

export async function POST(req: NextRequest) {
  const service = new SitesLlmService();

  const schema = z.object({
    description: z.string().min(1).max(250),
  });

  const body = schema.parse(await req.json());
  const { structure, tokens } = await service.generateSiteStructure(body);

  return NextResponse.json({ data: structure, tokens });
}
