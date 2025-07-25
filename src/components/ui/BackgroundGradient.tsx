import type { CSSProperties, HTMLAttributes } from 'react';
import { motion, type MotionProps } from 'framer-motion';

import { cn } from '../../lib';

interface BackgroundGradientProps {
  className?: string;
  gradient?: string;
  animated?: boolean;
  motionProps?: MotionProps & HTMLAttributes<HTMLDivElement>;
  style?: CSSProperties;
}

const BackgroundGradient = ({
  className,
  gradient = 'linear-gradient(90deg, #1a00ff 0%, transparent 100%)',
  animated = false,
  motionProps = {},
  style = {},
}: BackgroundGradientProps) => {
  // Choose element types
  const WrapperComponent = animated ? motion.div : 'div';
  return (
    <WrapperComponent
      className={cn('z-5 absolute h-full w-full opacity-40', className)}
      style={{ background: gradient, ...style }}
      {...(animated ? motionProps : {})}
    />
  );
};

export default BackgroundGradient;
