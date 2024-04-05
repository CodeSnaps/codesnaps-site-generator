'use client';

import React, { useState, useEffect } from 'react';

import SelectorsList, {
  SelectorsListSidebarContent,
} from '~/app/dashboard/[organization]/sites/[id]/components/editor/SelectorsListSidebar';
import RenderSelectorsSidebar, {
  RenderSelectorsSidebarContent,
} from '~/app/dashboard/[organization]/sites/[id]/components/editor/RenderSelectorsSidebar';

const selectors = [
  'Blog',
  'Contact',
  'CTA',
  'FAQ',
  'Feature',
  'Footer',
  'Gallery',
  'Header',
  'Hero',
  'Logo',
  'Navbar',
  'Pricing',
  'Team',
  'Testimonial',
];

function ComponentsSidebar({
  components,
  hasActiveSub,
}: {
  components: any;
  hasActiveSub: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState('');

  let blogElements: any[] = [];
  let contactElements: any[] = [];
  let ctaElements: any[] = [];
  let faqElements: any[] = [];
  let featureElements: any[] = [];
  let footerElements: any[] = [];
  let galleryElements: any[] = [];
  let headerElements: any[] = [];
  let heroElements: any[] = [];
  let logoElements: any[] = [];
  let navbarElements: any[] = [];
  let pricingElements: any[] = [];
  let teamElements: any[] = [];
  let testimonialElements: any[] = [];

  Object.keys(components).map((component) => {
    const name = component.replace(/[0-9]/g, '');
    const Component = components[component];

    switch (name) {
      case 'Blog':
        blogElements.push(
          <Component.craft.related.sidebar
            key={component}
            hasActiveSub={hasActiveSub}
          />,
        );
        break;

      case 'Contact':
        contactElements.push(
          <Component.craft.related.sidebar
            key={component}
            hasActiveSub={hasActiveSub}
          />,
        );
        break;

      case 'CTA':
        ctaElements.push(
          <Component.craft.related.sidebar
            key={component}
            hasActiveSub={hasActiveSub}
          />,
        );
        break;

      case 'FAQ':
        faqElements.push(
          <Component.craft.related.sidebar
            key={component}
            hasActiveSub={hasActiveSub}
          />,
        );
        break;

      case 'Feature':
        featureElements.push(
          <Component.craft.related.sidebar
            key={component}
            hasActiveSub={hasActiveSub}
          />,
        );
        break;

      case 'Footer':
        footerElements.push(
          <Component.craft.related.sidebar
            key={component}
            hasActiveSub={hasActiveSub}
          />,
        );
        break;

      case 'Gallery':
        galleryElements.push(
          <Component.craft.related.sidebar
            key={component}
            hasActiveSub={hasActiveSub}
          />,
        );
        break;

      case 'Header':
        headerElements.push(
          <Component.craft.related.sidebar
            key={component}
            hasActiveSub={hasActiveSub}
          />,
        );
        break;

      case 'Hero':
        heroElements.push(
          <Component.craft.related.sidebar
            key={component}
            hasActiveSub={hasActiveSub}
          />,
        );
        break;

      case 'Logo':
        logoElements.push(
          <Component.craft.related.sidebar
            key={component}
            hasActiveSub={hasActiveSub}
          />,
        );
        break;

      case 'Navbar':
        navbarElements.push(
          <Component.craft.related.sidebar
            key={component}
            hasActiveSub={hasActiveSub}
          />,
        );
        break;

      case 'Pricing':
        pricingElements.push(
          <Component.craft.related.sidebar
            key={component}
            hasActiveSub={hasActiveSub}
          />,
        );
        break;

      case 'Team':
        teamElements.push(
          <Component.craft.related.sidebar
            key={component}
            hasActiveSub={hasActiveSub}
          />,
        );
        break;

      case 'Testimonial':
        testimonialElements.push(
          <Component.craft.related.sidebar
            key={component}
            hasActiveSub={hasActiveSub}
          />,
        );
        break;

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

  const handleMouseEnter = (selector: string) => {
    setOpen(true);
    setSelectedComponent(selector);
  };

  const componentElements = {
    Blog: blogElements,
    Contact: contactElements,
    CTA: ctaElements,
    FAQ: faqElements,
    Feature: featureElements,
    Footer: footerElements,
    Gallery: galleryElements,
    Header: headerElements,
    Hero: heroElements,
    Logo: logoElements,
    Navbar: navbarElements,
    Pricing: pricingElements,
    Team: teamElements,
    Testimonial: testimonialElements,
  };

  return (
    <div className="relative" id="sidebar-container">
      <SelectorsList collapsed={false}>
        {open && (
          <SelectorsListSidebarContent>
            <div id="select-sidebar-container">
              <RenderSelectorsSidebar collapsed={false}>
                <RenderSelectorsSidebarContent className="my-4 h-full overflow-auto">
                  <div className="flex flex-col gap-6">
                    {selectedComponent && (
                      <ComponentSection
                        name={selectedComponent}
                        elements={
                          componentElements[
                            selectedComponent as keyof typeof componentElements
                          ]
                        }
                      />
                    )}
                  </div>
                </RenderSelectorsSidebarContent>
              </RenderSelectorsSidebar>
            </div>
          </SelectorsListSidebarContent>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Components</h3>

          {selectors.map((selector) => (
            <SelectorsListSidebarContent key={selector}>
              <div className="text-base py-3 text-left">
                <span
                  className="py-2 text-sm cursor-pointer text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                  onMouseEnter={() => handleMouseEnter(selector)}
                >
                  {selector}
                </span>
              </div>
            </SelectorsListSidebarContent>
          ))}
        </div>
      </SelectorsList>
    </div>
  );
}

export default ComponentsSidebar;

function ComponentSection({
  name,
  elements,
}: {
  name: string;
  elements: any[];
}) {
  if (elements.length === 0) return null;

  return (
    <>
      <div className="mb-4 mt-2">
        <h5 className="text-lg font-semibold">{name}</h5>
        <hr className="mt-3" />
      </div>

      {elements}
    </>
  );
}
