'use client';

import SavedComponent from '~/lib/components/types/saved-component';
import Image from 'next/image';
import Link from 'next/link';
import Trans from '~/core/ui/Trans';

import { toast } from 'sonner';
import useSupabase from '~/core/hooks/use-supabase';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { removeFavoriteComponent } from '~/lib/components/database/mutations';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/core/ui/AlertDialog';

export default function ComponentGridItem(
  props: React.PropsWithChildren<{
    component: SavedComponent;
    organization: string;
  }>,
) {
  const { name, is_free, image_src, image_alt, preview_url, component_id } =
    props.component;

  const client = useSupabase();
  const pathname = usePathname();
  const router = useRouter();
  const updatedPathname = pathname.replace('/saved', '');

  const handleRemoveComponent = async () => {
    const { success, error } = await removeFavoriteComponent(
      client,
      component_id,
      props.organization,
    );

    if (error) {
      toast.error("Couldn't remove component");
    }

    if (success) {
      toast.success('Component removed');
      router.push(`${pathname}?removed=${component_id}`);
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
              href={`${updatedPathname}/${
                is_free ? 'free-components' : ''
              }/${component_id}`}
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

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="group">
                <button className="rounded-md bg-transparent p-3 text-center text-sm font-semibold shadow-sm ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 group-hover:ring-neutral-800 dark:ring-neutral-400 dark:hover:bg-neutral-800 dark:group-hover:ring-neutral-100">
                  <TrashIcon className="h-6 w-6 text-neutral-600 group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-white" />
                </button>
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  <Trans i18nKey="components:removeComponent.title" />
                </AlertDialogTitle>
                <AlertDialogDescription>
                  <Trans i18nKey="components:removeComponent.description" />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="px-10">
                  <Trans i18nKey="components:removeComponent.cancelButtonLabel" />
                </AlertDialogCancel>
                <AlertDialogAction
                  className="px-10"
                  onClick={() => handleRemoveComponent()}
                >
                  <Trans i18nKey="components:removeComponent.confirmButtonLabel" />
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
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

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  );
}
