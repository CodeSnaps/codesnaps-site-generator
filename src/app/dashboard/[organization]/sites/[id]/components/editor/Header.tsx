import Link from 'next/link';

import { Button } from '~/core/ui/Button';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { NextJsIcon, ReactIcon } from '~/core/ui/Logo/NextReactLogos';

import { useEditor } from '@craftjs/core';
import { useState } from 'react';
import { exportPage } from '~/app/dashboard/[organization]/sites/[id]/lib/export-components';
import { saveSite } from '~/app/dashboard/[organization]/sites/[id]/actions.server';

import { compressToEncodedURIComponent } from 'lz-string';
import { Toaster } from '~/core/ui/Toaster';
import { useToast } from '~/core/ui/use-toast';

import ContentEditable from 'react-contenteditable';

type HeaderProps = {
  organization: string;
  id: string;
};

export default function Header({
  components,
  props,
  siteName,
}: {
  components?: any;
  props: HeaderProps;
  siteName: string;
}) {
  const { query } = useEditor();
  const { toast } = useToast();

  const [siteNameState, setSiteNameState] = useState(siteName);

  return (
    <div className="fixed top-0 -mx-[0.4rem] w-[calc(100%-36rem)] bg-background py-4 px-10 z-[49]">
      <h1 className="flex items-center text-lg font-bold text-foreground truncate">
        <span className="text-neutral-600 dark:text-neutral-400 font-medium mr-2">
          Site:
        </span>{' '}
        <ContentEditable
          html={siteNameState}
          onChange={(e) => setSiteNameState(e.target.value)}
          className="outline-none focus:outline-offset-4 focus:outline-primary my-2"
        />
      </h1>

      <div className="flex gap-10 items-center justify-between h-full w-full">
        <Link
          href={`/dashboard/${props.organization}/sites/${props.id}/preview`}
          className="flex items-center space-x-2 hover:underline cursor-pointer text-foreground"
          target="_blank"
        >
          <span>Preview in new tab</span>
          <ArrowTopRightOnSquareIcon className="w-6 h-6" />
        </Link>

        <div className="flex items-center space-x-8">
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
          <Button
            onClick={async () => {
              const json = query.serialize();
              const compressedSchema = compressToEncodedURIComponent(json);
              const cleanSiteName = siteNameState
                .replace(/<\/?[^>]+(>|$)/g, '')
                .trim();

              const response = await saveSite({
                siteSchema: compressedSchema,
                siteId: props.id,
                siteName: cleanSiteName,
              });

              if (response.success) {
                toast({
                  title: 'Site saved',
                  description: 'Your site has been saved successfully',
                });
              }
            }}
          >
            Save Site
          </Button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
