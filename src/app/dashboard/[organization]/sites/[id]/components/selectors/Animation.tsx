'use client';

import { motion, useReducedMotion } from 'framer-motion';

export function FadeInAnimation(props: any) {
  const prefersReducedMotion = useReducedMotion();

  const animationVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0 },
  };

  const viewportSettings = { once: true, margin: '0px 0px -200px' };

  const animationProps = {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: viewportSettings,
  };

  return (
    <motion.div
      variants={animationVariants}
      transition={{ duration: 0.5 }}
      {...animationProps}
      {...props}
    />
  );
}
