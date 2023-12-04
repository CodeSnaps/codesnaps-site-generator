import clsx from 'clsx';
import Link from 'next/link';

import {
  categories,
  textLayout,
  visualLayout,
  columnLayout,
  elementsProps,
} from '~/lib/components/database/filter-list';
import Button from '~/core/ui/Button';
import { TextFieldInput } from '~/core/ui/TextField';
import { Checkbox } from '~/core/ui/Checkbox';
import { Switch } from '~/core/ui/Switch';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from '~/core/ui/Sheet';

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
    <Sheet>
      <SheetTrigger asChild>
        <div className="max-w-xl mx-auto w-full px-10">
          <Button variant={'outline'} className={'xl:hidden w-full'}>
            <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mr-4">
              Filter
            </span>
            <AdjustmentsHorizontalIcon className={'h-6 dark:text-white'} />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <form
          method={'GET'}
          className="flex flex-col divide-y divide-neutral-300 dark:divide-neutral-800 space-y-8"
        >
          <SheetClose asChild>
            <div className="flex items-center space-x-4 bg-neutral-100 dark:bg-neutral-900 py-3.5 rounded-md px-4 border mt-10">
              <label
                htmlFor="isFree"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-800 dark:text-white"
              >
                Free Components
              </label>
              <Switch
                id="isFree"
                checked={isFree}
                onCheckedChange={setIsFree}
              />
            </div>
          </SheetClose>

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
              <Link
                href={clsx(
                  category.value === 'all'
                    ? `/dashboard/${organization}`
                    : `/dashboard/${organization}/${category.value}`,
                )}
                key={category.value}
                className="underline text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-left text-neutral-900 dark:text-neutral-100 hover:text-primary-600 dark:hover:text-primary-400"
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col space-y-4">
            <h4 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4 mt-6">
              Interaction
            </h4>

            <div className="flex items-center space-x-2">
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

          <div className="flex flex-col space-y-6">
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
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-800 dark:text-neutral-200"
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
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-800 dark:text-neutral-200"
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
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-800 dark:text-neutral-200"
                  >
                    {property.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-6">
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
                  className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-800 dark:text-neutral-200"
                >
                  {property.name}
                </label>
              </div>
            ))}
          </div>
        </form>

        <SheetFooter className="mt-10">
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
}

function AdjustmentsHorizontalIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
      />
    </svg>
  );
}

export default FilterSheet;
