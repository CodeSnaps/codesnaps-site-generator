'use client';

import { favoriteComponent } from '~/lib/components/database/mutations';
import { toast } from 'sonner';
import useSupabase from '~/core/hooks/use-supabase';

interface Props {
  params: {
    uuid: string;
    organization: string;
    component: any;
  };
}

function SaveComponentButton({ params }: Props) {
  const client = useSupabase();

  const handleSave = async () => {
    const data = {
      name: params.component.name,
      is_free: params.component.is_free,
      type: params.component.type,
      category: params.component.category,
      image_src: params.component.image_src,
      image_alt: params.component.image_alt,
      image_position: params.component.image_position,
      preview_url: params.component.preview_url,
    };

    const { error, success } = await favoriteComponent(
      client,
      params.organization,
      params.uuid,
      data,
    );

    console.log('Fave component');

    if (error?.code === '23505') {
      toast.error('Component already saved');
      return;
    }

    if (error) {
      toast.error("Couldn't save component");
      return;
    }

    if (success) toast.success('Component saved');
  };

  return (
    <div className="group">
      <button
        type="button"
        className="rounded-md bg-transparent p-3 text-sm font-semibold shadow-sm ring-1 ring-inset ring-neutral-400 hover:bg-neutral-50 group-hover:ring-neutral-800 dark:hover:bg-neutral-800 dark:hover:ring-neutral-100"
        onClick={() => handleSave()}
      >
        <SaveIcon className="h-6 w-6 text-neutral-600 group-hover:text-neutral-800 dark:text-neutral-400 dark:group-hover:text-white" />
      </button>
    </div>
  );
}

export default SaveComponentButton;

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
