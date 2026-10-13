import { motion } from 'framer-motion';

import { cn, smallCircleVariants } from '@/lib';

interface CirclesProps {
  className?: string;
  custom?: number;
}

const Circles = ({ className, custom }: CirclesProps) => {
  return (
    <motion.div
      variants={smallCircleVariants}
      custom={custom}
      className={cn(
        'section-border absolute top-0 flex aspect-square h-full items-center justify-center rounded-full',
        className,
      )}
      data-testid="circles"
    >
      <div
        className="section-border absolute aspect-square h-[50%] rounded-full"
        data-testid="circles-inner"
      />
    </motion.div>
  );
};

export default Circles;
