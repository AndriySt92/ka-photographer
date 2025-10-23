import { motion } from 'framer-motion';

import { SessionOrderSection, Typography } from '@/components';
import { fadeInBottom, staggerContainer } from '@/lib';

import { AdditionalInfo, TermsSection } from './components';

const Terms = () => {
  return (
    <motion.section
      className="padding-y relative h-full overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="space-y-lg container">
        {/* Title */}
        <Typography
          parentAs="h1"
          size="extraLarge"
          align="center"
          content={'Умови'.split('')}
          animated
          parentMotionProps={{
            variants: staggerContainer(0, 0, 0.1),
          }}
          childrenVariants={fadeInBottom}
          className="flex justify-center"
        />

        {/* Terms section */}
        <TermsSection />

        {/* Additional info block */}
        <AdditionalInfo />

        {/* Session order section */}
        <SessionOrderSection />
      </div>
    </motion.section>
  );
};

export default Terms;
