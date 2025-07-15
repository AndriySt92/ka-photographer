import { motion } from 'framer-motion';

import { services } from '../../../../config';
import { staggerContainer } from '../../../../lib';

import ServicesSlider from './ServicesSlider';
import TitleOverlay from './TitleOverlay';
import VerticalText from './VerticalText';

const Services = () => {
  return (
    <motion.div
      className="relative inset-0 flex h-[90vh] max-h-[900px] w-full flex-row"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer()}
    >
      {/* Title over services blocks */}
      <TitleOverlay />

      {/* Services cards slider */}
      <div className="h-full w-full sm:w-[80%] md:w-[82%] lg:w-[85%]">
        <ServicesSlider slides={services} />
      </div>

      {/* Title aside */}
      <VerticalText />
    </motion.div>
  );
};

export default Services;
