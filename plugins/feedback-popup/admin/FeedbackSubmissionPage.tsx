import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

import type { SupabaseClient } from '@supabase/supabase-js';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

import { withAdminSession } from '~/core/generic/actions-utils';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';

import AppContainer from '~/app/dashboard/[organization]/components/AppContainer';
import AdminHeader from '~/app/admin/components/AdminHeader';
import FeedbackBadge from '~/plugins/feedback-popup/admin/FeedbackBadge';

import { getFeedbackSubmission } from '~/plugins/feedback-popup/lib/queries';
import Badge from '~/core/ui/Badge';
import If from '~/core/ui/If';
import Heading from '~/core/ui/Heading';
import { Database } from '~/database.types';

interface FeedbackSubmissionsPageParams {
  id: string;
}

export const metadata: Metadata = {
  title: 'Feedback Submission',
};

async function FeedbackSubmissionsPage({
  params: { id },
}: {
  params: FeedbackSubmissionsPageParams;
}) {
  const adminClient = getSupabaseServerComponentClient({
    admin: true,
  });

  const { submission, attachment, similarSubmissions } =
    await loadFeedbackSubmission(adminClient, id);

  return (
    <div className={'flex flex-1 flex-col'}>
      <AdminHeader>Feedback Submission</AdminHeader>

      <AppContainer>
        <div className={'flex flex-col space-y-4'}>
          <Breadcrumbs />

          <div className={'flex space-x-2.5'}>
            <FeedbackBadge type={submission.type}>
              <b>Type</b>:
            </FeedbackBadge>

            <Badge size={'small'}>
              <b>User</b>:{' '}
              {submission.userId ? (
                <Link
                  className={'hover:underline'}
                  href={`/admin/users/${submission.userId}`}
                >
                  {submission.userId}
                </Link>
              ) : (
                `Anonymous`
              )}
            </Badge>

            <Badge size={'small'}>
              <b>Screen</b>:{' '}
              {submission.screenName ? `${submission.screenName}` : `Unknown`}
            </Badge>

            <Badge size={'small'}>
              <b>Created</b>: {getDate(submission.createdAt)}
            </Badge>
          </div>

          <div className={'flex flex-col space-y-6'}>
            <div className={'flex flex-col space-y-4'}>
              <Heading type={4}>
                The user submitted the following feedback:
              </Heading>

              <div
                className={'p-4 border-l-4 border-l-primary border rounded-lg'}
              >
                {submission.text}
              </div>
            </div>

            <If condition={attachment}>
              {(attachment) => (
                <div className={'flex flex-col space-y-4'}>
                  <p className={'font-medium'}>
                    The user also attached the following file:
                  </p>

                  <Image
                    width={500}
                    height={500}
                    className={'object-cover'}
                    src={attachment}
                    alt={`Attachment`}
                  />
                </div>
              )}
            </If>

            <If condition={similarSubmissions.length > 0}>
              <div className={'flex flex-col space-y-4'}>
                <p className={'font-medium'}>
                  Similar feedback submissions from other users:
                </p>

                <ol
                  className={
                    'flex flex-col space-y-2 list-decimal pl-4 text-sm'
                  }
                >
                  {similarSubmissions.map((submission) => (
                    <li key={submission.id}>
                      <Link
                        key={submission.id}
                        className={'hover:underline'}
                        href={`/admin/feedback/${submission.id}`}
                      >
                        {submission.content.slice(0, 100)} ...{' '}
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </If>
          </div>
        </div>
      </AppContainer>
    </div>
  );
}

export default withAdminSession(FeedbackSubmissionsPage);

function getDate(date: Maybe<string>) {
  if (!date) {
    return '-';
  }

  const parsedDate = new Date(date);

  return (
    parsedDate.toLocaleDateString() + ' ' + parsedDate.toLocaleTimeString()
  );
}

async function loadFeedbackSubmission(
  adminClient: SupabaseClient<Database>,
  id: FeedbackSubmissionsPageParams['id'],
) {
  const submissionsResponse = await getFeedbackSubmission(adminClient, id);

  if (submissionsResponse.error) {
    throw submissionsResponse.error;
  }

  const attachmentUrl = submissionsResponse.data.attachmentUrl;

  // since the bucket is private, we need to download the attachment
  // and send it to the client
  const attachment =
    attachmentUrl && (await downloadAttachment(adminClient, attachmentUrl));

  const similarSubmissionsResponse = await adminClient.rpc(
    'match_feedback_submissions',
    {
      query_embedding: submissionsResponse.data.embedding as unknown as string,
      match_threshold: 0.8,
      match_count: 5,
    },
  );

  if (similarSubmissionsResponse.error) {
    return {
      submission: submissionsResponse.data,
      similarSubmissions: [],
      attachment,
    };
  }

  const similarSubmissions = similarSubmissionsResponse.data.filter(
    (submission) => {
      return submission.id !== submissionsResponse.data.id;
    },
  );

  return {
    submission: submissionsResponse.data,
    attachment,
    similarSubmissions: similarSubmissions ?? [],
  };
}

function Breadcrumbs() {
  return (
    <div className={'flex space-x-2 items-center p-2 text-xs'}>
      <div className={'flex space-x-1.5 items-center'}>
        <Link href={'/admin'}>Admin</Link>
      </div>

      <ChevronRightIcon className={'w-3'} />

      <Link href={'/admin/feedback'}>Feedback</Link>

      <ChevronRightIcon className={'w-3'} />

      <span>Submission</span>
    </div>
  );
}

async function downloadAttachment(client: SupabaseClient, url: string) {
  const bucket = client.storage.from('feedback_submissions_attachments');
  const expiresInSeconds = 60;
  const { data, error } = await bucket.createSignedUrl(url, expiresInSeconds);

  if (error) {
    console.warn(error);
  }

  if (data) {
    return data.signedUrl;
  }
}
