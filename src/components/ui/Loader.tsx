import { motion } from 'framer-motion';

const DOT_COUNT = 3;

const containerVariants = {
  initial: { transition: { staggerChildren: 0.18 } },
  animate: { transition: { staggerChildren: 0.18 } },
};

const dotVariants = {
  initial: { y: '0%' },
  animate: { y: '100%' },
};

const Loader = () => (
  <div className="flex items-center justify-center">
    <motion.div
      className="flex h-4 w-20 items-start justify-around"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      role="status"
      aria-label="loading"
    >
      {Array.from({ length: DOT_COUNT }).map((_, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="block h-3 w-3 rounded-full bg-white"
          variants={dotVariants}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  </div>
);

export default Loader;
