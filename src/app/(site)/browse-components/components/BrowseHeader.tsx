import Heading from '~/core/ui/Heading';

const BrowseHeader: React.FCC<{
  Icon?: React.ReactNode;
}> = ({ children, Icon }) => {
  return (
    <div className="flex items-center justify-between border-b border-neutral-200 dark:border-dark-800 sticky top-0 bg-neutral-50 dark:bg-black">
      <div className={'flex w-full flex-1 flex-col px-3 pt-3 pb-6'}>
        <div className={'flex w-full flex-1 justify-between'}>
          <div
            className={
              'flex items-center justify-between space-x-2.5 lg:space-x-0'
            }
          >
            <div className={'flex items-center space-x-2 lg:space-x-4'}>
              <Heading type={5}>
                <span className={'flex items-center space-x-0.5 lg:space-x-2'}>
                  {Icon}

                  <span
                    className={
                      'lg:text-initial text-base font-medium dark:text-white'
                    }
                  >
                    {children}
                  </span>
                </span>
              </Heading>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseHeader;
