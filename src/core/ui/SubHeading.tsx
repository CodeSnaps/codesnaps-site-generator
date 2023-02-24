import classNames from 'classnames';

const SubHeading: React.FCC<{
  className?: string;
}> = ({ children, className }) => {
  return (
    <h2
      className={classNames(
        `text-lg font-normal text-gray-500 dark:text-gray-400
        lg:leading-[2.2rem] xl:text-xl`,
        className
      )}
    >
      {children}
    </h2>
  );
};

export default SubHeading;
