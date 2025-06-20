import type { Variants } from 'framer-motion';

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: 'easeOut' },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)', x: -30 },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export const fadeInBottom: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 30 },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};
