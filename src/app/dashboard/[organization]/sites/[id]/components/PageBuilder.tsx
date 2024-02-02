'use client';

import clsx from 'clsx';
import { Editor, Frame, Element } from '@craftjs/core';

import { RenderNode } from '~/app/dashboard/[organization]/sites/[id]/components/editor/RenderNode';
import { Viewport } from '~/app/dashboard/[organization]/sites/[id]/components/editor/Viewport';

import { modules } from '~/app/dashboard/[organization]/sites/[id]/components/selectors/modules';

interface PageBuilderProps {
  props: {
    organization: string;
    id: string;
  };
}

const PageBuilder = ({ props }: PageBuilderProps) => {
  return (
    <>
      <Editor resolver={modules} enabled={true} onRender={RenderNode}>
        <Viewport props={props} components={modules}>
          <div className="flex h-full min-h-screen w-full mx-2">
            <Frame>
              <Element
                canvas
                is="div"
                height="auto"
                custom={{ displayName: 'App' }}
                className={clsx(
                  'mx-auto my-14 flex-1 max-w-7xl rounded-lg bg-white shadow-sm dark:bg-black',
                )}
              />
            </Frame>
          </div>
        </Viewport>
      </Editor>
    </>
  );
};

export default PageBuilder;
