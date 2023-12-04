'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import Button from '~/core/ui/Button';
import BrowseFilterSheet from '~/app/(site)/browse-components/components/BrowseFilterSheet';
import BrowseFilterSidebar from '~/app/(site)/browse-components/components/BrowseFilterSidebar';

import { allProperties } from '~/lib/components/database/filter-list';

function BrowseFilter({ pageIndex }: { pageIndex: number }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isFree, setIsFree] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [isInteractive, setIsInteractive] = useState<boolean>(false);
  const [layoutOptions, setLayoutOptions] = useState<string[]>([]);
  const [elementsOptions, setElementsOptions] = useState<string[]>([]);

  useEffect(() => {
    const isFreeQuery = isFree ? 'free=true' : '';
    const searchQuery = search ? `search=${search}` : '';
    const isInteractiveQuery = isInteractive ? 'interactive=true' : '';
    const layoutQuery = generateQuery(layoutOptions, 'layout');
    const elementsQuery = generateQuery(elementsOptions, 'elements');

    const combinedQuery = [
      isFreeQuery,
      searchQuery,
      isInteractiveQuery,
      layoutQuery,
      elementsQuery,
    ]
      .filter(Boolean)
      .join('&');

    const newURL = combinedQuery
      ? `${pathname}?page=${pageIndex}&${combinedQuery}`
      : `${pathname}?page=${pageIndex}`;
    router.push(newURL);
  }, [
    pageIndex,
    pathname,
    router,
    isFree,
    search,
    isInteractive,
    layoutOptions,
    elementsOptions,
  ]);

  return (
    <>
      {/* For mobile (hidden on larger screens) */}
      <BrowseFilterSheet
        isFree={isFree}
        search={search}
        setSearch={setSearch}
        setIsFree={setIsFree}
        layout={layoutOptions}
        setLayout={setLayoutOptions}
        elements={elementsOptions}
        setElements={setElementsOptions}
        isInteractive={isInteractive}
        setInteraction={setIsInteractive}
      />

      {/* Secondary column (hidden on smaller screens) */}
      <BrowseFilterSidebar
        isFree={isFree}
        search={search}
        setSearch={setSearch}
        setIsFree={setIsFree}
        layout={layoutOptions}
        setLayout={setLayoutOptions}
        elements={elementsOptions}
        setElements={setElementsOptions}
        isInteractive={isInteractive}
        setInteraction={setIsInteractive}
      />

      <div className="mt-10 min-h-[40px] w-full lg:mt-0 xl:max-w-[calc(100%-18rem)]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-4 px-4">
          {layoutOptions && layoutOptions.length > 0 && (
            <>
              {layoutOptions.map((layout) => {
                const layoutName = allProperties.find(
                  (property) => property.value === layout,
                )?.name;

                if (!layoutName) {
                  return null;
                }

                return (
                  <Button
                    key={layout}
                    variant="outline"
                    onClick={() => {
                      setLayoutOptions((prev) =>
                        prev.filter((item) => item !== layout),
                      );
                    }}
                    className="flex items-center space-x-2"
                  >
                    <span className={'flex space-x-2 items-center'}>
                      <span>{layoutName}</span>
                      <XMarkIcon className="h-5 w-5" />
                    </span>
                  </Button>
                );
              })}
            </>
          )}

          {elementsOptions && elementsOptions.length > 0 && (
            <>
              {elementsOptions.map((element) => {
                const elementName = allProperties.find(
                  (property) => property.value === element,
                )?.name;

                if (!elementName) {
                  return null;
                }

                return (
                  <Button
                    key={element}
                    variant="outline"
                    onClick={() => {
                      setElementsOptions((prev) =>
                        prev.filter((item) => item !== element),
                      );
                    }}
                    className="flex items-center space-x-2"
                  >
                    <span className={'flex space-x-2 items-center'}>
                      <span>{elementName}</span>
                      <XMarkIcon className="h-5 w-5" />
                    </span>
                  </Button>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default BrowseFilter;

const generateQuery = (options: Array<string>, paramName: string) => {
  return options.length > 0 ? `${paramName}=${options.join('%7C')}` : '';
};

function XMarkIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
