import { motion } from 'framer-motion';

import { locationBanner } from '@/assets/icons';
import { Icon, Typography } from '@/components';
import { useWindowSize } from '@/hooks';
import { fadeIn, fadeInBottom, fadeInLeft, staggerContainer } from '@/lib';

const TextContent = () => {
  const { height, width } = useWindowSize();

  const getTitleFontSize = () => {
    if (height > 800) return '160px';
    if (height > 700) return '140px';
    if (height > 600) return '120px';
    return '100px';
  };

  const titleFontSize = getTitleFontSize();
  return (
    <div className="padding-y container pointer-events-none absolute inset-0 z-20 mt-10 lg:mt-0">
      <motion.div
        className="flex h-full flex-col justify-between gap-4"
        variants={staggerContainer()}
        initial="hidden"
        animate="visible"
        transition={{
          type: 'spring',
          visualDuration: 0.6,
          bounce: 0.25,
        }}
      >
        <div className="flex h-[50%] flex-col justify-between gap-10 sm:h-auto lg:flex-row lg:items-center lg:gap-2">
          {/* Main title */}
          <Typography
            parentAs="h1"
            size="custom"
            content={['ART.', 'MOOD.', 'YOU.']}
            className="ml-0 max-w-lg text-8xl leading-[0.8] sm:ml-[16%] md:max-w-2xl md:text-[100px] lg:text-[120px] 2xl:text-[180px]"
            style={{
              // Apply dynamic font size for xl screens
              fontSize: width >= 1280 && width < 1720 ? titleFontSize : undefined,
            }}
            animated
            parentMotionProps={{
              variants: staggerContainer(),
            }}
            childrenVariants={fadeIn}
          />

          {/* Location section */}
          <div className="flex items-center justify-end">
            <Typography
              parentAs="div"
              size="custom"
              content={['івано-франківськ', 'львів']}
              className="text-2xl leading-[1] sm:mb-0 sm:leading-[1.1] 2xl:text-4xl"
              childrenClasses={{ 1: 'text-right' }}
              animated
              parentMotionProps={{
                variants: staggerContainer(0.1),
              }}
              childrenVariants={fadeInBottom}
            />
            <motion.div className="ml-2" variants={fadeIn}>
              <Icon
                icon={locationBanner}
                name="location"
                size="h-12 sm:h-13 2xl:h-16 aspect-square"
              />
            </motion.div>
          </div>
        </div>

        {/* Description section */}
        <div className="flex h-[25%] flex-col justify-between sm:h-auto sm:gap-2">
          {/* Left description */}
          <Typography
            parentAs="div"
            size="custom"
            content={['Твоя історія — через', 'світло', ' тінь', 'натхнення.']}
            className="!leading-[0.9] sm:mb-0 2xl:text-2xl "
            animated
            parentMotionProps={{
              variants: staggerContainer(0, 0.1),
            }}
            childrenVariants={fadeInLeft}
          />

          {/* Right description */}
          <motion.div className="flex sm:justify-end" variants={staggerContainer()}>
            <Typography
              parentAs="div"
              size="custom"
              content={[' Незвичайні фотосесії', 'для тих,', 'хто шукає', 'нові форми себе.']}
              className="w-auto !leading-[0.9] sm:text-2xl lg:text-3xl 2xl:text-4xl"
              childrenClasses={{
                0: 'ml-8 text-left leading-[0.9] sm:ml-20',
              }}
              animated
              parentMotionProps={{
                variants: staggerContainer(0, 0.1),
              }}
              childrenVariants={fadeInBottom}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TextContent;
