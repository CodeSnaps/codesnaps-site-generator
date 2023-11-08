import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import AppContainer from '~/app/dashboard/[organization]/components/AppContainer';
import Button from '~/core/ui/Button';
import Heading from '~/core/ui/Heading';

function CreateComponentHeader({ children }: { children: React.ReactNode }) {
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

          <Button variant={'ghost'} href={'/admin/ui-kit'}>
            <span className={'flex space-x-2.5 items-center'}>
              <ArrowLeftIcon className={'w-4 h-4'} />

              <span>Back to Components</span>
            </span>
          </Button>
        </div>
      </AppContainer>
    </div>
  );
}

export default CreateComponentHeader;
