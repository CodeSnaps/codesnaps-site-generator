import classNames from 'classnames';

const NavigationContainer: React.FCC<{
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={classNames(
        `border-b border-gray-50 dark:border-black-400 dark:border-black-400`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default NavigationContainer;
