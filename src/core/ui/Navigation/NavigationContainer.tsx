import classNames from 'clsx';

const NavigationContainer: React.FCC<{
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={classNames(
        `border-b border-neutral-50 dark:border-dark-800`,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default NavigationContainer;
