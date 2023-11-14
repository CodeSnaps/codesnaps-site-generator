'use server';

import { z } from 'zod';
import qs from 'qs';
import { revalidatePath } from 'next/cache';

import getSupabaseServerActionClient from '~/core/supabase/action-client';
import getLogger from '~/core/logger';

import { withAdminSession } from '~/core/generic/actions-utils';
import { Json } from '~/database.types';
import { getFeedbackSubmission } from '~/plugins/feedback-popup/lib/queries';

interface FormStatus {
  success: boolean | undefined;
}

const submitFeedbackSchema = z
  .object({
    type: z.enum(['bug', 'feedback', 'question']),
    text: z.string(),
    metadata: z.unknown().optional(),
    screen_name: z.string().optional(),
    device_info: z.unknown().optional(),
    email: z.string().optional(),
    attachment: z
      .object({
        name: z.string(),
        type: z.string(),
        image: z.string(),
      })
      .optional(),
  })
  .refine((data) => {
    return !(data.type === 'question' && !data.email);
  });

export async function submitFeedbackAction(_: FormStatus, data: FormData) {
  const logger = getLogger();

  const parsed = qs.parse(
    new URLSearchParams(data as unknown as Record<string, string>).toString(),
  );

  const body = await submitFeedbackSchema.parseAsync(parsed);

  const adminClient = getSupabaseServerActionClient({
    admin: true,
  });

  const user = await getSupabaseServerActionClient().auth.getUser();
  const userId = user.data?.user?.id ?? null;

  logger.info(
    {
      userId,
    },
    `Submitting feedback...`,
  );

  const embedding = await createEmbedding(body.text);
  const table = adminClient.from('feedback_submissions');

  const attachment = body.attachment;

  let attachmentUrl = '';

  // if the user provided an attachment, upload it to the storage bucket
  if (attachment) {
    const bucket = adminClient.storage.from('feedback_submissions_attachments');
    let fileName = attachment.name;
    const contentType = attachment.type;
    const image = attachment.image;

    if (fileName) {
      fileName = `${Date.now()}-${fileName}`;

      const fileBody = Buffer.from(
        image.replace(`data:${contentType};base64,`, ''),
        'base64',
      );

      const { data, error } = await bucket.upload(fileName, fileBody, {
        contentType,
      });

      if (error) {
        logger.error(
          {
            error,
          },
          `Error uploading attachment. Continuing...`,
        );
      }

      attachmentUrl = data?.path ?? '';
    }
  }

  const response = await table.insert({
    text: body.text,
    metadata: body.metadata as Json,
    screen_name: body.screen_name,
    device_info: body.device_info as Json,
    email: body.email,
    user_id: userId,
    type: body.type,
    attachment_url: attachmentUrl,
    embedding: embedding as unknown as string,
  });

  if (response.error) {
    logger.error(
      {
        error: response.error,
      },
      `Error submitting feedback`,
    );

    return {
      success: false,
    };
  }

  logger.info(
    {
      userId,
    },
    `Feedback successfully submitted`,
  );

  return {
    success: true,
  };
}

export const deleteFeedbackSubmissionAction = withAdminSession(
  async (data: FormData) => {
    const logger = getLogger();

    const adminClient = getSupabaseServerActionClient({
      admin: true,
    });

    const id = z.coerce.number().parse(data.get('id'));

    logger.info({ id }, `Deleting feedback submission...`);

    const { data: submission } = await getFeedbackSubmission(
      adminClient,
      id.toString(),
    );

    const attachment = submission?.attachmentUrl;

    const response = await adminClient
      .from('feedback_submissions')
      .delete()
      .eq('id', id);

    if (response.error) {
      logger.error(
        {
          error: response.error,
          id,
        },
        `Error deleting feedback submission`,
      );

      return {
        success: false,
      };
    }

    if (attachment) {
      logger.info(
        {
          id,
        },
        `Found attachment. Deleting...`,
      );

      const bucket = adminClient.storage.from(
        'feedback_submissions_attachments',
      );

      const { error } = await bucket.remove([attachment]);

      if (error) {
        getLogger().warn(
          {
            id,
            attachment,
          },
          `Error deleting attachment`,
        );
      }

      logger.info({ id }, `Attachment deleted`);
    }

    logger.info({ id }, `Feedback submission deleted`);

    revalidatePath('/admin/feedback', 'page');

    return {
      success: true,
    };
  },
);

async function createEmbedding(text: string) {
  const { pipeline } = await import('@xenova/transformers');

  const generateEmbedding = await pipeline(
    'feature-extraction',
    'Supabase/gte-small',
  );

  const output = await generateEmbedding(text, {
    pooling: 'mean',
    normalize: true,
  });

  return Array.from(output.data);
}
