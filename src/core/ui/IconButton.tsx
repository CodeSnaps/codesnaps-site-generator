import React, { createElement, forwardRef } from 'react';
import classNames from 'classnames';

type DefaultProps = React.ButtonHTMLAttributes<unknown> & {
  loading?: boolean;
  label?: string;
};

type DivProps<TTag extends React.ElementType = 'div'> =
  React.HTMLAttributes<HTMLDivElement> & {
    loading?: boolean;
    disabled?: boolean;
    label?: string;
    as: TTag;
  };

type Props = React.PropsWithChildren<DefaultProps | DivProps>;

const CLASSNAME = `rounded-full bg-transparent h-10 w-10
  flex items-center justify-center
  ring-primary-400 transition-colors outline-none
  duration-300 hover:bg-gray-100 focus:ring 
  disabled:cursor-not-allowed disabled:opacity-50
  dark:hover:bg-black-300 dark:active:bg-gray-100 dark:active:bg-black-200
 `;

const IconButton = forwardRef(function IconButtonComponent(
  iconButtonProps: Props,
  ref
) {
  const { className, loading, disabled, children, label, ...props } =
    iconButtonProps;

  const allProps = {
    ...props,
    className: classNames(CLASSNAME, className),
    disabled: loading || disabled,
    'aria-label': label,
    title: label,
    innerRef: ref,
  };

  return <IconButtonElement {...allProps}>{children}</IconButtonElement>;
});

function IconButtonElement({
  innerRef,
  ...props
}: Props & {
  innerRef: React.ForwardedRef<unknown>;
}) {
  const tag = 'as' in props ? props.as : 'button';

  return createElement(tag, { ...props, ref: innerRef }, props.children);
}

export default IconButton;
