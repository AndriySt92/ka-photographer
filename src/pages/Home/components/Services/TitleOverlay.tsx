import { motion } from 'framer-motion';

import { Typography } from '@/components';
import { fadeInBottom } from '@/lib';

const TitleOverlay = () => {
  return (
    <motion.div
      className="2xl:px-15 pointer-events-none absolute inset-0 top-5 z-20 px-5 xl:top-7 xl:px-8 2xl:top-10"
      variants={fadeInBottom}
    >
      <div className="flex flex-col gap-2">
        <Typography
          parentAs="h1"
          size="extraLarge"
          align="center"
          color="light"
          className="block sm:hidden"
        >
          Послуги
        </Typography>
        <Typography
          size="custom"
          font="secondary"
          className="w-full text-center text-lg font-normal leading-6 sm:max-w-[70%] sm:text-left md:text-3xl lg:max-w-[40%] xl:leading-8 2xl:max-w-[43%] 2xl:text-5xl 2xl:!leading-[3rem] pointer-fine:text-primary pointer-coarse:text-secondary"
        >
          Кожна зйомка — це простір для відчуттів, обирай свій формат.
        </Typography>
      </div>
    </motion.div>
  );
};

export default TitleOverlay;
