import type { SupabaseClient } from '@supabase/supabase-js';
import FeedbackSubmission from '~/plugins/feedback-popup/lib/feedback-submission';

import type { Database } from '~/database.types';

type Client = SupabaseClient<Database>;

const TABLE_NAME = 'feedback_submissions';

const QUERY = `
  id,
  type,
  text,
  metadata,
  createdAt: created_at,
  userId: user_id,
  screenName: screen_name,
  deviceInfo: device_info,
  attachmentUrl: attachment_url
`;

export async function getFeedbackSubmissions(
  client: Client,
  params: {
    query?: string;
    page: number;
    perPage: number;
  },
) {
  const startOffset = (params.page - 1) * params.perPage;
  const endOffset = startOffset + params.perPage;

  let query = client
    .from(TABLE_NAME)
    .select<string, FeedbackSubmission>(QUERY, {
      count: 'exact',
    })
    .limit(params.perPage)
    .order('created_at', { ascending: false })
    .range(startOffset, endOffset);

  if (params.query) {
    query = query.textSearch('text', `${params.query}`);
  }

  return query;
}

export async function getFeedbackSubmission(client: Client, id: string) {
  return client
    .from(TABLE_NAME)
    .select<string, FeedbackSubmission>(QUERY)
    .eq('id', id)
    .single();
}

export async function getSubmissionsSummary(
  client: Client,
  params: {
    minDate: string;
    maxDate: string;
  },
) {
  return client
    .from(TABLE_NAME)
    .select<string, FeedbackSubmission>(QUERY)
    .gte('created_at', params.minDate)
    .lte('created_at', params.maxDate);
}
