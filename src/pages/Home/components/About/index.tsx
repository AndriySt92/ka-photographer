import { motion } from 'framer-motion';

import { Typography } from '../../../../components';
import { fadeInBottom, fadeInRight, staggerContainer } from '../../../../lib';

import Avatar from './Avatar';
import TextCircles from './TextCircles';

const About = () => {
  return (
    <motion.div
      className="flex flex-col items-center space-y-6 sm:items-start lg:block xl:space-y-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2, once: true }}
      variants={staggerContainer(0.2, 0.6)}
    >
      {/* Title */}
      <Typography
        parentAs="h1"
        size="extraLarge"
        content={['Хто', 'я?']}
        className="flex w-[50%] justify-between text-6xl sm:text-7xl lg:max-w-[50%] lg:text-8xl xl:text-9xl 2xl:text-[160px]"
        animated
        parentMotionProps={{
          variants: staggerContainer(),
        }}
        childrenVariants={fadeInBottom}
      />

      {/* Content */}
      <div className="flex w-full flex-col gap-4 sm:justify-center lg:flex-row">
        {/* Left Block */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="flex flex-1 flex-col lg:w-[340px]  lg:flex-none lg:gap-2 xl:w-[420px] xl:gap-10 2xl:w-[500px]">
              <Avatar />

              {/* Name */}
              <Typography
                parentAs="h3"
                // size="6xl"
                size="4xl"
                align="right"
                font="secondary"
                content={['Кугіт', 'Анастасія']}
                className="w-full leading-tight"
                animated
                parentMotionProps={{
                  initial: 'hidden',
                  whileInView: 'visible',
                  variants: staggerContainer(0, 0.3),
                }}
                childrenVariants={fadeInBottom}
              />
            </div>

            {/* Quote (Tablet & Mobile visible) */}
            <Typography
              parentAs="h3"
              size="custom"
              childrenClasses={{ 2: 'text-right', 3: 'text-right' }}
              font="secondary"
              content={['“Я знімаю те,', 'що відчувається, ', 'а не тільки те, ', 'що видно.”']}
              className="mb-20 block flex-1 leading-tight md:text-xl lg:hidden"
              animated
              parentMotionProps={{
                variants: staggerContainer(),
              }}
              childrenVariants={fadeInRight}
            />
          </div>
        </div>

        {/* Right Block - Text Content */}
        <div className="relative flex flex-1 gap-5 xl:gap-10">
          <div className="absolute h-full w-[112%] lg:-left-[56px] lg:-top-10 xl:-left-[76px] xl:-top-16">
            {/* First text circles */}
            <TextCircles
              text={[
                'Привіт! Я — Анастасія,',
                'Уже понад три роки я створюю кадри, що живуть поза межами “класики”.',
                'Моє бачення — на перетині мистецтва, дизайну і кіно.',
              ]}
            />

            {/* Second text circles */}
            <TextCircles
              className="lg:-top-8 xl:-top-14 2xl:-top-16"
              text={[
                'Часто працюю з тінню, простором, кольором так, як працює режисер',
                'або художник-постановник.',
                'Мої зйомки — це більше ніж просто “позувати”.',
                'Це про атмосферу, настрій, рух, сенс.',
              ]}
            />

            {/*Quote (Desctop visible) */}
            <div>
              <Typography
                parentAs="h3"
                size="5xl"
                childrenClasses={{ 2: 'text-right' }}
                font="secondary"
                content={['“Я знімаю те,', 'що відчувається, а не тільки те,', 'що видно.”']}
                className="hidden w-max leading-tight lg:block"
                animated
                parentMotionProps={{
                  initial: 'hidden',
                  whileInView: 'visible',
                  variants: staggerContainer(),
                  viewport: { amount: 0.2, once: true },
                }}
                childrenVariants={fadeInRight}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
