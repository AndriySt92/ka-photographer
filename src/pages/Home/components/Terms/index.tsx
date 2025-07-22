import { motion } from 'framer-motion';

import { BackgroundGradient, HoverCircles, Typography } from '../../../../components/ui';
import { terms } from '../../../../config';
import { useWindowSize } from '../../../../hooks';
import {
  containerVariants,
  fadeInBottom,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
} from '../../../../lib';

const Terms = () => {
  const { width } = useWindowSize();

  const getMarginValue = () => {
    if (width > 2100) return 0;
    if (width > 1800) return (width - 1672) / 2;
    if (width > 1280) return (width - 1232) / 2;
    if (width > 1024) return (width - 976) / 2;
    if (width > 725) return (width - 590) / 2;
    if (width > 360) return (width - 350) / 2;

    return 0;
  };

  const marginValue = getMarginValue();

  return (
    <motion.div
      className="relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="pointer-events-none relative z-10 space-y-6 xl:space-y-8 2xl:space-y-10">
        {/* Title */}
        <Typography
          parentAs="h1"
          size="extraLarge"
          content={['Умови', 'Співпраці']}
          childrenClasses={{ 1: 'text-right ml-[12%]' }}
          className="mx-auto w-fit !leading-[0.8] sm:mx-0"
          animated
          parentMotionProps={{
            variants: staggerContainer(),
          }}
          childrenVariants={fadeInBottom}
        />

        <motion.div
          className="space-y-12 xl:space-y-3 xl:pt-20 2xl:mb-24 2xl:space-y-5"
          variants={staggerContainer()}
        >
          {terms.map((item, index) => {
            const isEven = (index + 1) % 2 === 0;

            return (
              <motion.div
                variants={isEven ? fadeInRight : fadeInLeft}
                key={item.title}
                className="space-y-1 lg:space-y-2 xl:space-y-3 2xl:space-y-5"
              >
                <div className="relative flex items-center py-3">
                  {/* Gradient overlay */}
                  <BackgroundGradient
                    className="h-full w-full sm:w-[50%]"
                    style={{
                      left: !isEven ? 0 : '',
                      right: isEven ? 0 : '',
                      background: isEven
                        ? 'linear-gradient(270deg, #1a00ff 0%, transparent 100%)'
                        : 'linear-gradient(90deg, #1a00ff 0%, transparent 100%)',
                      marginLeft: !isEven ? `-${marginValue}px` : 0,
                      marginRight: isEven ? `-${marginValue}px` : 0,
                    }}
                  />

                  <Typography
                    parentAs="h3"
                    size="5xl"
                    align={isEven ? 'right' : 'left'}
                    className="relative z-50 w-full uppercase leading-[0.77]"
                  >
                    {item.title}
                  </Typography>
                </div>

                <Typography
                  parentAs="div"
                  size="xl"
                  align={isEven ? 'right' : 'left'}
                  className="relative z-40 normal-case text-secondary xl:uppercase"
                >
                  {item.subtitle.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </Typography>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Concentric Circles */}
      <HoverCircles />
    </motion.div>
  );
};

export default Terms;
