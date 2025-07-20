import { motion } from 'framer-motion';

import { logo } from '../../assets/icons';
import { circleVariants, staggerContainer } from '../../lib';

interface CirclesProps {
  withLogo?: boolean;
}

const HoverCircles = ({ withLogo = false }: CirclesProps) => {
  return (
    <div className="pointer-events-none absolute -top-[1.1%] left-0 z-0 h-[102%] w-full">
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer()}
      >
        {/* Outer circle - largest */}
        <motion.div
          className="pointer-events-auto absolute -z-[3] aspect-square h-[110%] rounded-full border border-secondary/30 transition-all duration-700 hover:bg-secondary/20 group-hover:bg-secondary/20"
          variants={circleVariants}
          custom={5}
        />

        {/* Middle circle */}
        <motion.div
          className="pointer-events-auto absolute -z-[2] aspect-square h-[70%] rounded-full border border-secondary/30 bg-primary transition-all duration-500 hover:bg-secondary/10"
          variants={circleVariants}
          custom={4}
        />

        {/* Inner circle - smallest */}
        <motion.div
          className="pointer-events-auto absolute -z-[1] flex aspect-square h-1/3 items-center justify-center rounded-full border border-secondary/40 bg-primary"
          variants={circleVariants}
          custom={1}
        >
          {withLogo && (
            <div className="flex h-[60%] w-[60%] items-center justify-center duration-300 hover:scale-105 hover:opacity-60">
              <img src={logo} alt="logo" className="object-contain" />
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HoverCircles;
