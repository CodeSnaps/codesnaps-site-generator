import { forwardRef } from 'react';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import classNames from 'clsx';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(function PopoverContentComponent(
  { className, align = 'start', sideOffset = 8, alignOffset = 0, ...props },
  ref,
) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className={classNames(
          `animate-in data-[side=bottom]:slide-in-from-top-2
          data-[side=top]:slide-in-from-bottom-2 z-50 rounded-md border
          border-neutral-100 bg-white p-2 shadow-lg outline-none
          dark:border-dark-700 dark:bg-dark-800`,
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
});

const PopoverItem = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
>(function PopoverItemComponent({ children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={classNames(
        `flex cursor-pointer items-center rounded-md bg-transparent py-2 px-4 transition duration-150 ease-in-out hover:bg-neutral-50 focus:outline-none active:bg-neutral-100 dark:hover:bg-dark-700 dark:active:bg-dark-700`,
        className,
      )}
      {...props}
    >
      <span
        className={classNames(
          `truncate text-sm font-medium text-neutral-700 hover:text-dark-900 dark:text-neutral-300 dark:hover:text-white`,
        )}
      >
        {children}
      </span>
    </div>
  );
});

const PopoverDivider: React.FC<{
  className?: string;
}> = ({ className }) => (
  <div
    className={classNames(
      `my-1 border-t border-neutral-100 dark:border-dark-700`,
      className,
    )}
  />
);

PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverItem, PopoverDivider };
