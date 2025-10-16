import type { Variants } from 'framer-motion';

export const staggerContainer = (delay = 0, duration = 1, staggerChildren = 0.3): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren: delay,
      duration: duration,
    },
  },
});

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: 'beforeChildren',
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: 'easeOut' },
  },
};

export const fadeInWithShadow: Variants = {
  hidden: {
    opacity: 0,
    textShadow: '0 0 0px rgba(255,255,255,0)',
    filter: 'blur(10px)',
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    textShadow: [
      '0 0 0px rgba(255,255,255,0)',
      '0 0 5px rgba(255,255,255,0.5)',
      '0 0 15px rgba(255,255,255,0.8)',
      '0 0 25px rgba(255,255,255,0.6)',
      '0 0 10px rgba(255,255,255,0.4)',
      '0 0 0px rgba(255,255,255,0)',
    ],
    transition: {
      duration: 1,
      type: 'tween',
      textShadow: {
        duration: 1.5,
        repeatType: 'reverse',
        type: 'tween',
      },
    },
  },
};

export const fadeInWithOpacity: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)', scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)', x: -30 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    x: 0,
    transition: { duration: 1, ease: 'easeOut' },
  },
};

export const fadeInBottom: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)', y: 30 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)', x: 50 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

export const expandFadeIn: Variants = {
  hidden: { opacity: 0, width: 0 },
  visible: {
    opacity: 0.4,
    width: '100%',
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const circleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.44,
    rotate: -25,
  },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
      duration: 0.8,
      delay: i * 0.08,
    },
  }),
};

export const smallCircleVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: i * 0.08,
      type: 'tween',
    },
  }),
};

export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(10px)',
    y: -50,
    transition: { duration: 0.3 },
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    filter: 'blur(10px)',
    y: 50,
    transition: { duration: 0.3 },
  },
};
