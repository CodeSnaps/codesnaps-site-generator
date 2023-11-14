'use client';

import Link from 'next/link';

import { ColumnDef } from '@tanstack/react-table';
import { usePathname, useRouter } from 'next/navigation';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

import DataTable from '~/core/ui/DataTable';
import { getComponents } from '~/app/admin/ui-kit/queries';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '~/core/ui/Dropdown';

import IconButton from '~/core/ui/IconButton';
import React from 'react';

type Response = Awaited<ReturnType<typeof getComponents>>;
type Components = Response['components'];

const columns: Array<ColumnDef<Components[0]>> = [
  {
    header: 'Name',
    accessorKey: 'name',
    id: 'name',
  },
  {
    header: 'Is Published',
    accessorKey: 'is_published',
    id: 'is_published',
    cell: ({ row }) => {
      const isPublished = row.original?.is_published;

      return <Badge isTrue={isPublished} />;
    },
  },
  {
    header: 'Is Free',
    accessorKey: 'is_free',
    id: 'is_free',
    cell: ({ row }) => {
      const isFree = row.original?.is_free;

      return <Badge isTrue={isFree} />;
    },
  },
  {
    header: 'Is Interactive',
    accessorKey: 'is_interactive',
    id: 'is_interactive',
    cell: ({ row }) => {
      const isInteractive = row.original?.is_interactive;

      return <Badge isTrue={isInteractive} />;
    },
  },
  {
    header: 'Description',
    accessorKey: 'description',
    id: 'description',
    size: 300,
  },
  {
    header: 'Type',
    accessorKey: 'type',
    id: 'type',
  },
  {
    header: 'Category',
    accessorKey: 'category',
    id: 'category',
  },
  {
    header: 'Preview URL',
    accessorKey: 'preview_url',
    id: 'preview_url',
    cell: ({ row }) => {
      const imgUrl = row.original?.preview_url;
      return imgUrl?.slice(40);
    },
  },
  {
    header: 'Image Source',
    accessorKey: 'image_src',
    id: 'image_src',
    cell: ({ row }) => {
      const imgUrl = row.original?.image_src;
      return imgUrl?.slice(76);
    },
  },
  {
    header: 'Image Alt',
    accessorKey: 'image_alt',
    id: 'image_alt',
  },
  {
    header: 'Layout Properties',
    accessorKey: 'layout_properties',
    id: 'layout_properties',
    size: 500,
  },
  {
    header: 'Elements',
    accessorKey: 'elements',
    id: 'elements',
    size: 500,
  },
  {
    header: '',
    id: 'actions',
    cell: ({ row }) => {
      const component = row.original;
      const id = component.id;

      return (
        <div className={'flex justify-end'}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton>
                <span className="sr-only">Open menu</span>
                <EllipsisHorizontalIcon className="h-4 w-4" />
              </IconButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem>
                <Link href={`/admin/ui-kit/${id}`}>View Component</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

function ComponentsTable({
  components,
  pageCount,
  perPage,
  page,
  search,
}: React.PropsWithChildren<{
  components: Components;
  pageCount: number;
  perPage: number;
  page: number;
  search: string;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <DataTable
      onPaginationChange={({ pageIndex }) => {
        if (search) {
          router.push(`${pathname}?page=${pageIndex + 1}&search=${search}`);
          return;
        }

        router.push(`${pathname}?page=${pageIndex + 1}`);
      }}
      pageSize={perPage}
      pageIndex={page - 1}
      pageCount={pageCount}
      columns={columns}
      data={components}
    />
  );
}

export default ComponentsTable;

function Badge({ isTrue }: { isTrue: boolean }) {
  return isTrue ? (
    <div
      className={
        'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-600 rounded-lg p-2 text-sm text-center'
      }
    >
      TRUE
    </div>
  ) : (
    <div
      className={
        'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-600 rounded-lg p-2 text-sm text-center'
      }
    >
      FALSE
    </div>
  );
}
