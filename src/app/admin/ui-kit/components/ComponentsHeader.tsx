import { ArrowLeftIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

import AppContainer from '~/app/dashboard/[organization]/components/AppContainer';
import Button from '~/core/ui/Button';
import Heading from '~/core/ui/Heading';

function ComponentsHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-50 dark:border-dark-700">
      <AppContainer>
        <div
          className={
            'flex flex-col space-y-5 w-full justify-between items-start lg:items-center lg:flex-row lg:space-y-0'
          }
        >
          <div>
            <Heading type={3}>{children}</Heading>
          </div>

          <div className={'flex items-center gap-x-5'}>
            <Button href={'/admin/ui-kit/create'}>
              <span className={'flex space-x-2.5 items-center'}>
                <span>Create Component</span>

                <PlusCircleIcon className={'w-4 h-4'} />
              </span>
            </Button>

            <Button variant={'ghost'} href={'/dashboard'}>
              <span className={'flex space-x-2.5 items-center'}>
                <ArrowLeftIcon className={'w-4 h-4'} />

                <span>Back to Dashboard</span>
              </span>
            </Button>
          </div>
        </div>
      </AppContainer>
    </div>
  );
}

export default ComponentsHeader;
