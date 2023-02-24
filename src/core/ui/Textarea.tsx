import { forwardRef } from 'react';
import classNames from 'classnames';

const Textarea = forwardRef<
  React.ElementRef<'textarea'>,
  React.TextareaHTMLAttributes<unknown>
>(function TextareaComponent({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      {...props}
      className={classNames(
        'min-h-[60px] flex-auto resize-none bg-transparent py-2 px-2 outline-none',
        className
      )}
    />
  );
});

export default Textarea;
