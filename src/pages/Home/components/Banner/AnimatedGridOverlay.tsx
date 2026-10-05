import { motion, type Variants } from 'framer-motion';

import { useAspectRatio } from '@/hooks';

const ROWS = 6;
let COLUMNS = 12;

const AnimatedSquare = () => (
  <div className="hidden h-full w-full bg-primary transition-opacity duration-[2000ms] hover:opacity-0 hover:duration-100 lg:block" />
);

const fadeInWithOpacity: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: 'easeOut' },
  },
};

const AnimatedGridOverlay = () => {
  const aspectRatio = useAspectRatio();

  // Dynamic column calculation
  switch (true) {
    case aspectRatio < 0.8:
    case aspectRatio <= 1.3:
      COLUMNS = 6;
      break;
    case aspectRatio <= 1.9:
      COLUMNS = 10;
      break;
    case aspectRatio <= 2.5:
      COLUMNS = 12;
      break;
    default:
      COLUMNS = 12;
  }

  const squares = Array.from({ length: COLUMNS * ROWS });

  return (
    <motion.div
      variants={fadeInWithOpacity}
      initial="hidden"
      animate="visible"
      className="absolute inset-0 z-10 hidden w-full overflow-hidden lg:block [@media(pointer:fine)]:lg:block"
    >
      <div
        className="absolute inset-0 z-20 grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {squares.map((_, i) => (
          <div className="border border-transparent" key={i}>
            <AnimatedSquare />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default AnimatedGridOverlay;
