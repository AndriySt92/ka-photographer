import { motion } from 'framer-motion';

import { locationBanner } from '../../../assets/icons';
import { bannerImg } from '../../../assets/images';
import { useAspectRatio } from '../../../hooks';
import { fadeIn, fadeInBottom, fadeInLeft, staggerContainer } from '../../../lib';

const Banner = () => {
  const aspectRatio = useAspectRatio();

  const ROWS = 6;
  let COLUMNS = 12;
  // Calculate dynamic columns based on aspect ratio
  switch (true) {
    case aspectRatio < 0.8: // Extreme portrait (uncommon)
    case aspectRatio >= 0.8 && aspectRatio <= 1.3: // Portrait-oriented devices
      COLUMNS = 6;
      break;
    case aspectRatio > 1.3 && aspectRatio <= 1.9: // Standard landscape (laptops/desktops)
      COLUMNS = 10;
      break;
    case aspectRatio > 1.9 && aspectRatio <= 2.5: // Ultra-wide screens
      COLUMNS = 12;
      break;
    default:
      COLUMNS = 8;
  }

  const squares = Array.from({ length: COLUMNS * ROWS });

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="z-5 absolute inset-0">
        <div className="absolute z-10 block h-full w-full bg-primary/40 backdrop-blur-md xl:hidden" />
        <img
          src={bannerImg}
          alt="banner"
          className="z-5 absolute h-full w-full object-cover object-[45%_0%] sm:object-cover"
        />
      </div>

      {/* Grid container with explicit columns/rows */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        className="relative hidden h-full w-full overflow-hidden xl:block"
      >
        <div
          className="absolute inset-0 z-10 grid h-full w-full"
          style={{
            gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          }}
        >
          {squares.map((_, i) => (
            <div className="border border-transparent" style={{ borderWidth: '0.01px' }} key={i}>
              <AnimatedSquare />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Content overlay */}
      <div className="pointer-events-none absolute inset-0 top-14 z-20 h-full w-full">
        <motion.div
          className="container flex h-full flex-col justify-between gap-4 pb-28"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <div className="flex flex-col justify-between lg:flex-row lg:items-center">
            {/* Main title and description */}
            <motion.h1
              variants={staggerContainer}
              className="md:ml-30 lg:ml-34 mb-16 ml-0 max-w-lg pt-3 font-title text-8xl font-medium leading-[0.8] text-white sm:mb-0 sm:ml-4 sm:pt-6 md:ml-3 md:max-w-2xl md:pt-0 md:text-[120px] lg:ml-12 lg:text-[100px] xl:ml-[250px] xl:text-[120px] 2xl:ml-72 2xl:pt-7 2xl:text-[200px]"
            >
              <motion.p className="block" variants={fadeIn}>
                ART.
              </motion.p>
              <motion.p className="block" variants={fadeIn}>
                MOOD.
              </motion.p>
              <motion.p className="block" variants={fadeIn}>
                YOU.
              </motion.p>
            </motion.h1>
            <div className="">
              {/* Location section */}
              <motion.div className="flex justify-end" variants={staggerContainer}>
                <motion.p
                  className="font-body text-xl uppercase text-white sm:mb-0 sm:text-2xl lg:text-2xl xl:text-2xl 2xl:text-5xl"
                  variants={fadeInBottom}
                >
                  <motion.span className="block" variants={fadeInBottom}>
                    івано-франківськ
                  </motion.span>
                  <motion.span className="block text-right" variants={fadeInBottom}>
                    львів
                  </motion.span>
                </motion.p>
                <motion.div className="ml-3 xl:ml-6" variants={fadeInBottom}>
                  <div className="flex items-center justify-center">
                    <img
                      className="h-14 w-14 filter xl:h-14 xl:w-14 2xl:h-20 2xl:w-20"
                      src={locationBanner}
                      alt="location"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col">
            {/* Left description */}
            <motion.p
              className="mb-[64px] font-body uppercase text-white sm:mb-0 sm:text-2xl xl:text-xl 2xl:text-2xl "
              variants={staggerContainer}
            >
              <motion.span className="block leading-[0.9]" variants={fadeInLeft}>
                Твоя історія — через
              </motion.span>
              <motion.span className="block leading-[0.9]" variants={fadeInLeft}>
                світло
              </motion.span>
              <motion.span className="block leading-[0.9]" variants={fadeInLeft}>
                тінь
              </motion.span>
              <motion.span className="block leading-[0.9]" variants={fadeInLeft}>
                натхнення.
              </motion.span>
            </motion.p>

            {/* Right description */}
            <motion.div className="flex sm:justify-end" variants={staggerContainer}>
              <motion.p
                className="inline-block w-auto font-body uppercase text-white sm:text-2xl xl:text-2xl 2xl:text-5xl"
                variants={staggerContainer}
              >
                <motion.span
                  className="xl:ml-18 ml-8 block whitespace-nowrap text-left leading-[0.9] sm:ml-20 sm:text-right 2xl:ml-36"
                  variants={fadeInBottom}
                >
                  Незвичайні фотосесії
                </motion.span>
                <motion.span className="block leading-[0.9]" variants={fadeInBottom}>
                  для тих,
                </motion.span>
                <motion.span className="block leading-[0.9]" variants={fadeInBottom}>
                  хто шукає
                </motion.span>
                <motion.span className="block leading-[0.9]" variants={fadeInBottom}>
                  нові форми себе.
                </motion.span>
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const AnimatedSquare = () => (
  <motion.div
    className="hidden h-full w-full bg-primary lg:block"
    initial={{ opacity: 1 }}
    whileHover={{
      opacity: 0,
      transition: { duration: 0.1 },
    }}
    transition={{
      opacity: { duration: 1.5 },
    }}
  />
);

export default Banner;
