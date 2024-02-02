'use client';

import Component from '~/lib/components/types/component';
import Image from 'next/image';
import Link from 'next/link';
import Trans from '~/core/ui/Trans';

import { toast } from 'sonner';
import useSupabase from '~/core/hooks/use-supabase';
import { useRouter } from 'next/navigation';
import { favoriteComponent } from '~/lib/components/database/mutations';

export default function ComponentGridItem(
  props: React.PropsWithChildren<{
    component: Component;
    organization: string;
    isSaved: boolean;
  }>,
) {
  const {
    id,
    name,
    type,
    category,
    is_free,
    image_src,
    image_alt,
    preview_url,
  } = props.component;

  const client = useSupabase();
  const router = useRouter();

  const saveComponent = async () => {
    const data = {
      name,
      is_free,
      type,
      category,
      image_src,
      image_alt,
      preview_url,
    };

    const { error, errorMessage, isDuplicate, success } =
      await favoriteComponent(client, props.organization, id, data);

    if (error) {
      toast.error("Couldn't save component");
      return;
    }

    if (isDuplicate) {
      toast.error(errorMessage);
      return;
    }

    if (success) {
      toast.success('Component saved');
      router.refresh();
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md dark:bg-neutral-900">
      <div className="m-2.5 rounded-2xl bg-neutral-300 dark:bg-neutral-700 lg:mx-3 lg:my-3.5">
        <div className="flex items-center justify-center px-6">
          <div className="flex w-full justify-center bg-neutral-200 dark:bg-neutral-500 py-10">
            <Image
              priority
              src={image_src}
              alt={image_alt}
              width={400}
              height={200}
              style={{ objectFit: 'contain' }}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6 sm:pb-8 sm:pt-4">
        <h3 className="text-lg font-semibold">{name}</h3>

        <div className="mt-4 flex items-center space-x-2">
          <div className="group flex-1">
            <Link
              href={`/dashboard/${props.organization}/ui-kit/${
                is_free ? 'free-components' : ''
              }/${id}`}
            >
              <div className="flex items-center justify-center gap-2 rounded-md bg-transparent py-3.5 text-center text-base font-semibold text-neutral-600 shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 group-hover:text-neutral-800 group-hover:ring-neutral-800 dark:text-neutral-400 dark:ring-neutral-400 dark:hover:bg-neutral-800 dark:group-hover:ring-neutral-100 dark:group-hover:text-white">
                <CodeIcon className="h-6 w-6" />
                <span>
                  <Trans i18nKey="components:componentGridItemCodeButton" />
                </span>
              </div>
            </Link>
          </div>

          <div className="group">
            <Link href={preview_url} target="_blank">
              <div className="rounded-md bg-transparent p-3 text-sm font-semibold shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 group-hover:ring-neutral-800 dark:ring-neutral-400 dark:hover:bg-neutral-800 dark:group-hover:ring-neutral-100">
                <PreviewLinkIcon className="h-6 w-6 text-neutral-600 group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-white" />
              </div>
            </Link>
          </div>

          <div className="group">
            <button
              className="rounded-md bg-transparent p-3 text-center text-sm font-semibold shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 group-hover:ring-neutral-800 dark:ring-neutral-400 dark:hover:bg-neutral-800 dark:group-hover:ring-neutral-100"
              onClick={() => saveComponent()}
            >
              {props.isSaved ? (
                <SaveIconFilled className="h-6 w-6 text-neutral-600 group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-white" />
              ) : (
                <SaveIcon className="h-6 w-6 text-neutral-600 group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewLinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function SaveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
  );
}

function SaveIconFilled(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
      />
    </svg>
  );
}
