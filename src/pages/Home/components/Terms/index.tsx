import { motion } from 'framer-motion';

import { Typography } from '../../../../components/ui';
import { terms } from '../../../../config';
import { fadeInBottom, staggerContainer } from '../../../../lib';

import TermsItem from './TermsItem';

const Terms = () => {
  return (
    <motion.div
      className="pointer-events-none relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer()}
    >
      <div className="relative z-10 space-y-12 2xl:space-y-16">
        {/* Title */}
        <div className="flex justify-center sm:justify-start">
          <Typography
            parentAs="h1"
            size="extraLarge"
            content={['Умови', 'Співпраці']}
            childrenClasses={{ 1: 'text-right ml-[12%]' }}
            className="mr-[8%] !leading-[0.8] sm:mx-0"
            animated
            parentMotionProps={{
              variants: staggerContainer(),
            }}
            childrenVariants={fadeInBottom}
          />
        </div>

        <motion.div className="space-y-12 xl:space-y-3 2xl:space-y-5" variants={staggerContainer()}>
          {terms.map((item, index) => (
            <TermsItem key={item.title} item={item} index={index} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Terms;
