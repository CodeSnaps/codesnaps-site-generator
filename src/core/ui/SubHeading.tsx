import classNames from 'clsx';

const SubHeading = ({
  children,
  className,
}: React.PropsWithChildren<{
  className?: string;
}>) => {
  return (
    <h2>
      <span
        className={classNames(
          'flex flex-col space-y-1 bg-gradient-to-br text-xl' +
            ' lg:text-2xl dark:from-white dark:via-neutral-300' +
            ' dark:to-neutral-400 bg-clip-text text-neutral-500' +
            ' font-normal dark:text-transparent',
          className,
        )}
      >
        {children}
      </span>
    </h2>
  );
};

export default SubHeading;
