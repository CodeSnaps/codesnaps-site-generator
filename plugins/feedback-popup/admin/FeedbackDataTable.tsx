'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

import DataTable from '~/core/ui/DataTable';
import FeedbackSubmission from '~/plugins/feedback-popup/lib/feedback-submission';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';

import If from '~/core/ui/If';
import Button from '~/core/ui/Button';
import Modal from '~/core/ui/Modal';

import FeedbackBadge from '~/plugins/feedback-popup/admin/FeedbackBadge';

import { deleteFeedbackSubmissionAction } from '~/plugins/feedback-popup/lib/feedback-actions';

function FeedbackDataTable({
  submissions,
  page,
  count,
  perPage,
}: React.PropsWithChildren<{
  submissions: FeedbackSubmission[];
  count: number;
  page: number;
  perPage: number;
}>) {
  const columns: ColumnDef<FeedbackSubmission>[] = useMemo(
    () => [
      {
        header: 'Type',
        cell: ({ row }) => {
          const original = row.original;
          const type = original.type;

          return <FeedbackBadge type={type} />;
        },
      },
      {
        header: 'Text',
        size: 200,
        cell: ({ row }) => {
          const original = row.original;
          let text = original.text;

          if (text.length >= 35) {
            text = text.slice(0, 35) + '...';
          }

          return (
            <Link
              className={'hover:underline w-full h-full'}
              href={`/admin/feedback/${original.id}`}
            >
              {text}
            </Link>
          );
        },
      },
      {
        header: 'User',
        cell: ({ row }) => {
          const original = row.original;
          const userId = original.userId;

          if (userId) {
            return (
              <Link
                className={'hover:underline w-full h-full'}
                href={`/admin/users/${userId}`}
              >
                View User
              </Link>
            );
          }

          return '-';
        },
      },
      {
        header: 'Language',
        accessorKey: 'deviceInfo.language',
      },
      {
        header: 'Screen Size',
        cell: ({ row }) => {
          const original = row.original;
          const size = original.deviceInfo?.screen_size;

          if (!size) {
            return '-';
          }

          return size.width + 'x' + size.height;
        },
      },
      {
        header: 'Date',
        cell: ({ row }) => {
          const original = row.original;
          const date = original.createdAt;

          if (!date) {
            return '-';
          }

          const parsedDate = new Date(date);

          return (
            parsedDate.toLocaleDateString() +
            ' ' +
            parsedDate.toLocaleTimeString()
          );
        },
      },
      {
        header: '',
        id: 'actions',
        cell: ({ row }) => {
          return <FeedbackActions submission={row.original} />;
        },
      },
    ],
    [],
  );

  const pageCount = Math.ceil(count / perPage);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <DataTable
      onPaginationChange={({ pageIndex }) => {
        const params = new URLSearchParams(location.search);
        params.set('page', String(pageIndex + 1));

        router.push(`${pathname}?${params.toString()}`);
      }}
      pageIndex={page - 1}
      pageSize={perPage}
      pageCount={pageCount}
      columns={columns}
      data={submissions}
    />
  );
}

export default FeedbackDataTable;

function FeedbackActions(
  props: React.PropsWithChildren<{
    submission: FeedbackSubmission;
  }>,
) {
  const { id, type, email } = props.submission;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'}>
          <span className={'flex space-x-2 items-center'}>
            <EllipsisVerticalIcon className={'h-4'} />
            <span>More</span>
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link className={'w-full h-full'} href={`feedback/${id}`}>
            View
          </Link>
        </DropdownMenuItem>

        <If condition={type === 'question'}>
          <DropdownMenuItem>
            <Link className={'w-full h-full'} href={`mailto:${email}`}>
              Reply
            </Link>
          </DropdownMenuItem>
        </If>

        <DropdownMenuItem
          onClick={() => setModalOpen(true)}
          onSelect={(e) => e.preventDefault()}
        >
          Delete
        </DropdownMenuItem>

        <Modal isOpen={modalOpen} heading={`Delete Feedback Submission`}>
          <form
            action={(data) => {
              setModalOpen(false);

              return deleteFeedbackSubmissionAction(data);
            }}
          >
            <input value={id} type={'hidden'} name={'id'} />

            <div className={'flex flex-col space-y-4'}>
              <div>
                <p className={'text-sm'}>
                  Are you sure you want to delete this feedback submission?
                </p>
              </div>

              <div className={'flex justify-end'}>
                <Button variant={'destructive'}>Yep, delete it</Button>
              </div>
            </div>
          </form>
        </Modal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
