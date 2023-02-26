'use client';

import { Transition } from '@headlessui/react';

function SlideUpTransition(props: React.PropsWithChildren) {
  return (
    <Transition
      show
      appear
      enter={'transition-all duration-500 ease-in-out'}
      enterFrom={'opacity-0 translate-y-16'}
      enterTo={'opacity-100 translate-y-0'}
    >
      {props.children}
    </Transition>
  );
}

export default SlideUpTransition;
