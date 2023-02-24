'use client';

import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { Transition } from '@headlessui/react';
import Label from './Label';
import If from '~/core/ui/If';

type Props = React.InputHTMLAttributes<unknown>;

const Hint: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <span
      className={`block pl-1 text-xs
        font-normal leading-tight text-gray-500 dark:text-gray-400`}
    >
      {children}
    </span>
  );
};

const Input = forwardRef<React.ElementRef<'input'>, Props>(
  function TextFieldInputComponent(
    { className, children, defaultValue, ...props },
    ref
  ) {
    return (
      <div
        className={classNames(
          `relative flex h-10 w-full items-center rounded-md border
        border-gray-200 bg-white font-medium
        text-gray-800 shadow-sm ring-primary-500 transition-all focus-within:border-transparent
        focus-within:ring-2 hover:border-gray-300 hover:bg-gray-50 focus-within:hover:border-transparent
        dark:border-black-200 dark:bg-black-500
        dark:text-gray-200 dark:hover:border-black-100
        dark:focus-within:hover:border-transparent dark:focus:bg-black-400 lg:text-sm`,
          className,
          {
            [`cursor-not-allowed bg-gray-100 hover:bg-gray-100 dark:bg-black-400`]:
              props.disabled,
          }
        )}
      >
        <If condition={children}>
          <span className={'flex pl-2.5'}>{children}</span>
        </If>

        <input
          {...props}
          className={classNames(
            `h-10 flex-1 rounded-md bg-transparent px-2.5 outline-none`,
            className
          )}
          ref={ref}
        />
      </div>
    );
  }
);

type TextFieldComponent = React.FC<
  React.PropsWithChildren<{
    className?: string;
  }>
> & {
  Label: typeof Label;
  Hint: typeof Hint;
  Input: typeof Input;
  Error: typeof ErrorMessage;
};

const TextField: TextFieldComponent = ({ children, className }) => {
  return (
    <div className={classNames(`flex flex-col space-y-1`, className)}>
      {children}
    </div>
  );
};

const ErrorMessage: React.FC<
  { error: Maybe<string> } & React.HTMLAttributes<unknown>
> = ({ error, ...props }) => {
  const shouldDisplay = !!error;

  return (
    <Transition
      show={shouldDisplay}
      appear={shouldDisplay}
      enter="ease-out duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-50"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Hint>
        <span {...props} className={'py-0.5 text-red-700 dark:text-red-500'}>
          {error}
        </span>
      </Hint>
    </Transition>
  );
};

TextField.Hint = Hint;
TextField.Label = Label;
TextField.Input = Input;
TextField.Error = ErrorMessage;

export default TextField;
