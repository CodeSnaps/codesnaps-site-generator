'use client';

import { useEffect, useState } from 'react';

import { Editor, Frame } from '@craftjs/core';
import { decompressFromEncodedURIComponent } from 'lz-string';

import { RenderNode } from '~/app/dashboard/[organization]/sites/[id]/components/editor/RenderNode';
import { Viewport } from '~/app/dashboard/[organization]/sites/[id]/components/editor/Viewport';

import { modules } from '~/app/dashboard/[organization]/sites/[id]/components/selectors/modules';

interface PageBuilderProps {
  props: {
    organization: string;
    id: string;
  };
  site: {
    data: {
      id: string;
      color_scheme: string;
      site_schema: string;
      project_name: string;
    };
  };
}

const PageBuilder = ({ props, site }: PageBuilderProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const decompressedSiteSchema = decompressFromEncodedURIComponent(
    site.data.site_schema,
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const rootElement = document.querySelector('#root');
    if (rootElement) {
      rootElement.classList.add('pt-px');
    }
  }, [isMounted]);

  return (
    <>
      <Editor resolver={modules} enabled={true} onRender={RenderNode}>
        <Viewport
          props={props}
          components={modules}
          projectName={site.data.project_name}
        >
          <div className="flex h-full min-h-screen w-full mx-2">
            <div className="mx-auto my-14 rounded-lg bg-white shadow-sm dark:bg-black">
              <Frame data={decompressedSiteSchema}></Frame>
            </div>
          </div>
        </Viewport>
      </Editor>
    </>
  );
};

export default PageBuilder;
