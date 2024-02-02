import Link from 'next/link';

import { Button } from '~/core/ui/Button';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { NextJsIcon, ReactIcon } from '~/core/ui/Logo/NextReactLogos';

import { useEditor } from '@craftjs/core';
import { exportPage } from '~/app/dashboard/[organization]/sites/[id]/lib/export-components';

type HeaderProps = {
  organization: string;
  id: string;
};

export default function Header({
  components,
  props,
}: {
  components?: any;
  props: HeaderProps;
}) {
  const { query } = useEditor();

  return (
    <div className="fixed top-0 -mx-[0.2rem] w-[calc(100%-36.2rem)] bg-background border-b py-4 px-10 z-[500]">
      <div className="flex gap-10 items-center justify-between h-full w-full">
        <Link
          href={`/dashboard/${props.organization}/sites/${props.id}/preview`}
          className="flex items-center space-x-2 hover:underline cursor-pointer text-foreground"
        >
          <span>Preview in new tab</span>
          <ArrowTopRightOnSquareIcon className="w-6 h-6" />
        </Link>

        <div className="flex items-center space-x-2">
          <span className="w-full break-normal text-foreground/70">
            Export&nbsp;Project
          </span>

          <Button
            variant="custom"
            className="bg-neutral-950 hover:bg-neutral-800 w-full"
            onClick={() => {
              const nodes = query.getSerializedNodes();
              const isNextjs = true;
              exportPage(isNextjs, nodes, components);
            }}
          >
            <NextJsIcon className="w-6 h-6 fill-white" />
          </Button>

          <Button
            variant="custom"
            className="bg-neutral-950 hover:bg-neutral-800 w-full"
            onClick={() => {
              const nodes = query.getSerializedNodes();
              const isNextjs = false;
              exportPage(isNextjs, nodes, components);
            }}
          >
            <ReactIcon className="w-6 h-6 fill-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}
