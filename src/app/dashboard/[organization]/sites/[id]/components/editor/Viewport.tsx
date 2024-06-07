import clsx from 'clsx';
import React, { ReactNode } from 'react';

import { PageBody } from '~/core/ui/Page';
import ComponentsSidebar from '~/app/dashboard/[organization]/sites/[id]/components/editor/ComponentsSidebar';
import Header from '~/app/dashboard/[organization]/sites/[id]/components/editor/Header';
import ToolbarSidebar from '~/app/dashboard/[organization]/sites/[id]/components/editor/toolbar/ToolbarSidebar';

import { useEditor } from '@craftjs/core';
import useIsSubscriptionActive from '~/lib/organizations/hooks/use-is-subscription-active';

type ViewportProps = {
  organization: string;
  id: string;
};

export const Viewport: React.FC<{
  children?: ReactNode;
  props: ViewportProps;
  components?: any;
  projectName: string;
}> = ({ children, props, components, projectName }) => {
  const { enabled, connectors } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const subscription = useIsSubscriptionActive();

  return (
    <div className="viewport">
      <PageBody>
        <div className="page-container flex flex-1 h-full flex-col">
          <ComponentsSidebar
            components={components}
            hasActiveSub={subscription}
          />

          <div
            className={clsx([
              'craftjs-renderer flex-1 h-full w-full transition overflow-auto bg-neutral-200 dark:bg-neutral-900',
              {
                'bg-renderer-gray': enabled,
              },
            ])}
            ref={(ref) => {
              ref && connectors.select(connectors.hover(ref, ''), '');
            }}
          >
            <CanvasWrapper>
              <Header
                components={components}
                props={props}
                siteName={projectName}
              />
              <div className="mt-24">{children}</div>
            </CanvasWrapper>
          </div>

          <ToolbarSidebar />
        </div>
      </PageBody>
    </div>
  );
};

function CanvasWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative lg:ml-[12.2rem] lg:mr-[17rem]">{children}</div>
  );
}
