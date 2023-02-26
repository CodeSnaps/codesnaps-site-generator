import classNames from 'classnames';

const SubHeading: React.FCC<{
  className?: string;
}> = ({ children, className }) => {
  return (
    <h2
      className={classNames(
        `font-heading text-lg font-normal text-gray-500 dark:text-gray-400`,
        className
      )}
    >
      {children}
    </h2>
  );
};

export default SubHeading;
