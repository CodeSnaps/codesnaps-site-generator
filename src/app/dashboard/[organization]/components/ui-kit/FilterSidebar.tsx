import clsx from 'clsx';
import Link from 'next/link';
import Trans from '~/core/ui/Trans';

import {
  categories,
  textLayout,
  visualLayout,
  columnLayout,
  elementsProps,
} from '~/lib/components/database/filter-list';
import { TextFieldInput } from '~/core/ui/TextField';
import { Checkbox } from '~/core/ui/Checkbox';
import { Switch } from '~/core/ui/Switch';

interface FilterProps {
  organization: string;
  isFree: boolean;
  search: string;
  setSearch: (search: string) => void;
  setIsFree: (isFree: boolean) => void;
  isInteractive: boolean;
  setInteraction: (isInteractive: boolean) => void;
  layout: string[];
  setLayout: (layout: string[]) => void;
  elements: string[];
  setElements: (elements: string[]) => void;
}

function FilterSheet({
  organization,
  isFree,
  setIsFree,
  search,
  setSearch,
  isInteractive,
  setInteraction,
  layout,
  setLayout,
  elements,
  setElements,
}: FilterProps) {
  return (
    <aside className="border-neutral-300 dark:border-neutral-800 fixed inset-y-0 right-0 hidden h-full w-72 overflow-y-auto border-l px-4 py-6 sm:px-6 lg:px-8 xl:block">
      <form
        method={'GET'}
        className="flex flex-col divide-y divide-neutral-300 dark:divide-neutral-800 space-y-8"
      >
        <div className="flex items-center space-x-4 bg-neutral-100 dark:bg-neutral-900 py-3.5 rounded-md px-4 border">
          <label
            htmlFor="isFree"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-800 dark:text-white"
          >
            <Trans i18nKey="components:filterFreeComponentsLabel" />
          </label>
          <Switch id="isFree" checked={isFree} onCheckedChange={setIsFree} />
        </div>

        <div className="flex flex-col space-y-4">
          <label
            htmlFor="search"
            className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mt-6"
          >
            <Trans i18nKey="components:filterSearchLabel" />
          </label>

          <TextFieldInput
            id={'search'}
            name={'search'}
            defaultValue={search}
            placeholder={'Search component...'}
            onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mt-6">
            <Trans i18nKey="components:filterCategoriesLabel" />
          </h4>

          {categories.map((category) => (
            <Link
              href={clsx(
                category.value === 'all'
                  ? `/dashboard/${organization}/browse-components`
                  : `/dashboard/${organization}/browse-components/${category.value}`,
              )}
              key={category.value}
              className="underline text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left text-neutral-900 dark:text-neutral-100 hover:text-primary-600 dark:hover:text-primary-400"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col space-y-4">
          <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mt-6">
            <Trans i18nKey="components:filterInteractionsLabel" />
          </h4>

          <div className="flex items-center space-x-4">
            <Switch
              id="isInteractive"
              checked={isInteractive}
              onCheckedChange={setInteraction}
            />
            <label
              htmlFor="isInteractive"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-800 dark:text-neutral-200"
            >
              <Trans i18nKey="components:filterInteractionsDescription" />
            </label>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 mt-6">
            <Trans i18nKey="components:filterLayoutLabel" />
          </h3>

          <div>
            <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              <Trans i18nKey="components:filterLayoutTextAlignmentLabel" />
            </h4>

            {textLayout.map((property) => (
              <div
                key={property.value}
                className="flex items-center space-x-2 mt-4"
              >
                <Checkbox
                  id={property.value}
                  checked={layout.includes(property.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setLayout([...layout, property.value]);
                    } else {
                      setLayout(
                        layout.filter((option) => option !== property.value),
                      );
                    }
                  }}
                />
                <label
                  htmlFor={property.value}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-800 dark:text-neutral-200"
                >
                  {property.name}
                </label>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mt-6">
              <Trans i18nKey="components:filterLayoutVisualLayoutLabel" />
            </h4>

            {visualLayout.map((property) => (
              <div
                key={property.value}
                className="flex items-center space-x-2 mt-4"
              >
                <Checkbox
                  id={property.value}
                  checked={layout.includes(property.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setLayout([...layout, property.value]);
                    } else {
                      setLayout(
                        layout.filter((option) => option !== property.value),
                      );
                    }
                  }}
                />
                <label
                  htmlFor={property.value}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-800 dark:text-neutral-200"
                >
                  {property.name}
                </label>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 mt-6">
              <Trans i18nKey="components:filterColumnsLabel" />
            </h4>

            {columnLayout.map((property) => (
              <div
                key={property.value}
                className="flex items-center space-x-2 mt-4"
              >
                <Checkbox
                  id={property.value}
                  checked={layout.includes(property.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setLayout([...layout, property.value]);
                    } else {
                      setLayout(
                        layout.filter((option) => option !== property.value),
                      );
                    }
                  }}
                />
                <label
                  htmlFor={property.value}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-800 dark:text-neutral-200"
                >
                  {property.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-4 pb-20">
          <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 mt-6">
            <Trans i18nKey="components:filterElementsLabel" />
          </h4>

          {elementsProps.map((property) => (
            <div
              key={property.value}
              className="flex items-center space-x-2 mt-4"
            >
              <Checkbox
                id={property.value}
                checked={elements.includes(property.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setElements([...elements, property.value]);
                  } else {
                    setElements(
                      elements.filter((option) => option !== property.value),
                    );
                  }
                }}
              />
              <label
                htmlFor={property.value}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-800 dark:text-neutral-200"
              >
                {property.name}
              </label>
            </div>
          ))}
        </div>
      </form>
    </aside>
  );
}

export default FilterSheet;
