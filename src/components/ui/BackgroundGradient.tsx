import type { HTMLAttributes } from 'react';
import { motion, type MotionProps } from 'framer-motion';

import { cn } from '../../lib';

interface BackgroundGradientProps {
  className?: string;
  gradient?: string;
  animated?: boolean;
  motionProps?: MotionProps & HTMLAttributes<HTMLDivElement>;
}

const BackgroundGradient = ({
  className,
  gradient = 'linear-gradient(90deg, #1a00ff 0%, #000 100%)',
  animated = false,
  motionProps = {},
}: BackgroundGradientProps) => {
  // Choose element types
  const WrapperComponent = animated ? motion.div : 'div';
  return (
    <WrapperComponent
      className={cn(`z-5 absolute h-full w-full opacity-40`, className)}
      style={{ background: gradient }}
      {...(animated ? motionProps : {})}
    />
  );
};

export default BackgroundGradient;
