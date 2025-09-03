import { motion } from 'framer-motion';

import { cn, smallCircleVariants } from '../../lib';

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
        'absolute top-0 flex aspect-square h-full items-center justify-center rounded-full border border-secondary/40',
        className,
      )}
    >
      <div className="absolute aspect-square h-[50%] rounded-full border border-secondary/40" />
    </motion.div>
  );
};

export default Circles;
