'use client';

import React, { useState, useEffect } from 'react';

import SelectorsList, {
  SelectorsListSidebarContent,
} from '~/app/dashboard/[organization]/sites/[id]/components/editor/SelectorsListSidebar';
import RenderSelectorsSidebar, {
  RenderSelectorsSidebarContent,
} from '~/app/dashboard/[organization]/sites/[id]/components/editor/RenderSelectorsSidebar';

function ComponentsSidebar({ components }: { components: any }) {
  const [open, setOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('');

  let heroElements: any[] = [];
  let blogElements: any[] = [];

  Object.keys(components).map((component) => {
    const name = component.replace(/[0-9]/g, '');
    const Component = components[component];

    switch (name) {
      case 'Hero':
        heroElements.push(<Component.craft.related.sidebar key={component} />);
        break;
      case 'Blog':
        blogElements.push(<Component.craft.related.sidebar key={component} />);
      default:
        break;
    }
  });

  // Function to close sidebars when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    const sidebarContainer = document.getElementById('sidebar-container');
    const selectSidebarContainer = document.getElementById(
      'select-sidebar-container',
    );

    if (
      sidebarContainer &&
      selectSidebarContainer &&
      !sidebarContainer.contains(event.target as Node) &&
      !selectSidebarContainer.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" id="sidebar-container">
      <SelectorsList collapsed={false}>
        {open && (
          <SelectorsListSidebarContent>
            <div id="select-sidebar-container">
              <RenderSelectorsSidebar collapsed={false}>
                <RenderSelectorsSidebarContent className="my-4 h-full">
                  <div className="flex flex-col gap-6">
                    {selectedComponent === 'Blog' && blogElements}
                    {selectedComponent === 'Hero' && heroElements}
                  </div>
                </RenderSelectorsSidebarContent>
              </RenderSelectorsSidebar>
            </div>
          </SelectorsListSidebarContent>
        )}

        <SelectorsListSidebarContent>
          <button
            onClick={() => {
              setOpen(!open);
              setSelectedComponent('Blog');
            }}
            className="text-base py-4 text-left"
          >
            Blog
          </button>
        </SelectorsListSidebarContent>

        <SelectorsListSidebarContent>
          <button
            onClick={() => {
              setOpen(!open);
              setSelectedComponent('Hero');
            }}
            className="text-base py-4 text-left"
          >
            Hero
          </button>
        </SelectorsListSidebarContent>
      </SelectorsList>
    </div>
  );
}

export default ComponentsSidebar;
