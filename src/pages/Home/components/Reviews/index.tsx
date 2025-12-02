import { motion } from 'framer-motion';

import { BackgroundGradient, Button, SessionOrderModal, Typography } from '@/components';
import { reviews } from '@/config';
import { useModal } from '@/hooks';
import {
  cn,
  expandFadeIn,
  fadeIn,
  fadeInBottom,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
} from '@/lib';

import ReviewsSlider from './ReviewsSlider';

const Reviews = () => {
  const { isOpenModal, openModal, closeModal } = useModal();

  return (
    <motion.div
      className="space-y-sm"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer()}
    >
      {/* Title */}
      <Typography
        parentAs="h1"
        size="extraLarge"
        animated
        parentMotionProps={{ variants: fadeInLeft }}
      >
        Враження
      </Typography>

      <div className="space-y-sm relative flex flex-col justify-between gap-2 lg:flex-row ">
        {/* Text for mobile */}
        <div className="relative flex items-center justify-end py-2 sm:py-1 lg:hidden">
          <BackgroundGradient
            className={cn(
              'h-full w-[90vw] sm:w-[60vw] lg:w-[38vw]',
              'right-[calc(50%-50vw)] rotate-[180deg] bg-gradient-to-r from-[#1a00ff] to-transparent',
            )}
            motionProps={{ variants: expandFadeIn }}
          />

          <Typography
            parentAs="h3"
            size="5xl"
            align="right"
            content={['Говорять ті,', 'хто був по той бік', 'об’єктива']}
            className="!leading-[1] 2xl:text-5xl"
            animated
            parentMotionProps={{
              variants: staggerContainer(0),
            }}
            childrenVariants={fadeInRight}
          />
        </div>

        {/* Right side - Reviews slider */}
        <motion.div
          className="section-border-y relative py-8 sm:py-12 lg:w-[54%] lg:border-0 lg:py-0 xl:w-[43%]"
          variants={fadeIn}
        >
          <ReviewsSlider slides={reviews} />
        </motion.div>

        {/* Left side - Text block */}
        <motion.div
          className="flex flex-col justify-between lg:w-[45%] xl:w-[52%]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer()}
        >
          <Typography
            parentAs="h3"
            size="3xl"
            align="right"
            content={['Говорять ті,', 'хто був по той бік', 'об’єктива']}
            className="hidden !leading-[0.95] lg:block 2xl:text-5xl"
            animated
            parentMotionProps={{
              variants: staggerContainer(0),
            }}
            childrenVariants={fadeInRight}
          />

          <div className="relative flex items-center py-2 sm:py-1 lg:block">
            <BackgroundGradient
              className={cn(
                'block h-full w-[90vw] sm:w-[60vw] lg:hidden lg:w-[38vw] [@media(min-width:1950px)]:w-[30vw]',
                'left-[calc(50%-50vw)] bg-gradient-to-l from-[#1a00ff] to-transparent',
              )}
            />

            <Typography
              parentAs="h3"
              size="custom"
              content={['Готові створити свою історію?', ' Пиши мені — і ми зробимо це разом.']}
              className="text-base !leading-[0.95] xl:text-xl 2xl:text-2xl"
              childrenClasses={{ 1: 'text-left lg:text-right mt-2 lg:mt-0' }}
              animated
              parentMotionProps={{
                variants: staggerContainer(0.2),
              }}
              childrenVariants={fadeInLeft}
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeInBottom}
            viewport={{ once: true, amount: 0.2 }}
            className="mt-6 w-fit self-center sm:mt-8 lg:mt-0 lg:self-end"
          >
            <Button size="textLg" onClick={openModal}>
              Замовити
            </Button>
          </motion.div>

          {/* Modal */}
          <SessionOrderModal onClose={closeModal} isOpen={isOpenModal} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Reviews;
