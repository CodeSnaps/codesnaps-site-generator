import clsx from 'clsx';

import React, { forwardRef } from 'react';

const PaddingMarginWrapper = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    classes?: string;
    paddingArray?: string[];
    marginArray?: string[];
  }
>(({ children, classes, paddingArray, marginArray }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        classes,
        paddingArray && paddingArray.join(' '),
        marginArray && marginArray.join(' '),
      )}
    >
      {children}
    </div>
  );
});

PaddingMarginWrapper.displayName = 'PaddingMarginWrapper';

export default PaddingMarginWrapper;
