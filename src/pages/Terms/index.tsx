import { motion } from 'framer-motion';

import { SessionOrderSection, Typography } from '@/components';
import { fadeInBottom, staggerContainer } from '@/lib';

import AdditionalInfo from './AdditionalInfo';
import TermsSection from './TermsSection';

const Terms = () => {
  return (
    <motion.section
      className="relative h-full overflow-hidden bg-primary py-16 xl:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container space-y-12 xl:space-y-16">
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
