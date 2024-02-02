import React from 'react';
import { useEditor } from '@craftjs/core';

import Toolbar, { ToolbarContent } from '~/core/ui/SidebarRight';

function ToolbarSidebar() {
  const { active, related } = useEditor((state, query) => {
    const currentlySelectedNodeId = query.getEvent('selected').first();
    return {
      active: currentlySelectedNodeId,
      related:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
    };
  });

  return (
    <Toolbar>
      <ToolbarContent>
        <div>
          {active && related.toolbar && React.createElement(related.toolbar)}

          {!active && (
            <div className="px-5 py-2 flex flex-col items-center h-screen justify-center text-center">
              <h2 className="pb-1">Click on a component to start editing.</h2>
            </div>
          )}
        </div>
      </ToolbarContent>
    </Toolbar>
  );
}

export default ToolbarSidebar;
