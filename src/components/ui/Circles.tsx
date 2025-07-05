import { motion } from 'framer-motion';

import { cn, fadeInScale } from '../../lib';

interface CircleProps {
  className?: string;
}

const Circles = ({ className }: CircleProps) => {
  return (
    <motion.div
      variants={fadeInScale}
      className={cn(
        'absolute left-0 top-0 flex aspect-square h-full items-center justify-center rounded-full border border-secondary/40',
        className,
      )}
    >
      <div className="absolute aspect-square h-[50%] rounded-full border border-secondary/40" />
    </motion.div>
  );
};

export default Circles;
