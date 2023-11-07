import clsx from 'clsx';

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
  isFree: boolean;
  search: string;
  setSearch: (search: string) => void;
  setIsFree: (isFree: boolean) => void;
  category: string | null;
  setCategory: (category: string | null) => void;
  isInteractive: boolean;
  setInteraction: (isInteractive: boolean) => void;
  layout: string[];
  setLayout: (layout: string[]) => void;
  elements: string[];
  setElements: (elements: string[]) => void;
}

function FilterSheet({
  isFree,
  setIsFree,
  search,
  setSearch,
  category: categoryState,
  setCategory,
  isInteractive,
  setInteraction,
  layout,
  setLayout,
  elements,
  setElements,
}: FilterProps) {
  return (
    <aside className="border-neutral-200 dark:border-slate-800 fixed inset-y-0 right-0 top-[60px] hidden h-full w-72 overflow-y-auto border-l px-4 py-6 sm:px-6 lg:px-8 xl:block">
      <form
        method={'GET'}
        className="flex flex-col divide-y divide-neutral-300 dark:divide-neutral-800 space-y-8"
      >
        <div className="flex items-center space-x-4 bg-neutral-100 dark:bg-neutral-900 py-3.5 rounded-md px-4 border">
          <label
            htmlFor="isFree"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-800 dark:text-white"
          >
            Free Components
          </label>
          <Switch id="isFree" checked={isFree} onCheckedChange={setIsFree} />
        </div>

        <div className="flex flex-col space-y-4">
          <label
            htmlFor="search"
            className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mt-6"
          >
            Search
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
            Categories
          </h4>

          {categories.map((category) => (
            <button
              type="button"
              key={category.value}
              onClick={() => setCategory(category.value)}
              className={clsx(
                category.value === categoryState
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-neutral-900 dark:text-neutral-100 hover:text-primary-600 dark:hover:text-primary-400',
                'underline text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left',
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col space-y-4">
          <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mt-6">
            Interaction
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
              Interactive
            </label>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 mt-6">
            Layout
          </h3>

          <div>
            <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Text Alignment
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
              Visual Layout
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
              Columns
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
            Elements
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
