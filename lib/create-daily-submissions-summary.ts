import { subDays } from 'date-fns';

import getSupabaseServerClient from '~/core/supabase/server-client';
import { getSubmissionsSummary } from '~/plugins/feedback-popup/lib/queries';
import FeedbackSubmission from '~/plugins/feedback-popup/lib/feedback-submission';

let summary: string;

export default async function createDailySubmissionsSummary() {
  const client = getSupabaseServerClient({
    admin: true,
  });

  const today = new Date();
  const yesterday = subDays(new Date(today), 1);

  const { data: submissions, error } = await getSubmissionsSummary(client, {
    minDate: yesterday.toISOString(),
    maxDate: today.toISOString(),
  });

  if (error) {
    throw error;
  }

  return createSummary(submissions ?? []);
}

async function createSummary(submissions: FeedbackSubmission[]) {
  if (summary) {
    return summary;
  }

  const { pipeline } = await import('@xenova/transformers');
  const generator = await pipeline('summarization');

  if (!submissions.length) {
    return '';
  }

  const text = submissions
    .map((submission) => {
      return `${submission.text}`;
    })
    .join('\n');

  const output = await generator(text);

  summary = output[0].summary_text;

  return summary;
}
