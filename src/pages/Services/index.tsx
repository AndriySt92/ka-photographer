import { motion } from 'framer-motion';

import { MButton, Typography } from '../../components/ui';
import { services } from '../../config';
import { fadeInBottom, fadeInWithOpacity, staggerContainer } from '../../lib';

import ServiceCard from './ServiceCard';

const Services = () => {
  return (
    <motion.section
      className="relative min-h-screen overflow-hidden bg-primary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="container relative z-10 space-y-12 py-16 2xl:space-y-16 2xl:py-24"
        initial="hidden"
        animate="visible"
      >
        {/* Animated title */}
        <div className="overflow-hidden">
          <Typography
            parentAs="h1"
            size="extraLarge"
            align="center"
            content={'послуги'.split('')}
            animated
            parentMotionProps={{
              variants: staggerContainer(0, 0, 0.1),
            }}
            childrenVariants={fadeInBottom}
            className="flex justify-center"
          />

          <Typography
            parentAs="p"
            size="lg"
            align="center"
            className="mt-0 sm:mt-3 lg:mt-6"
            animated
            parentMotionProps={{
              variants: staggerContainer(0, 0, 0.1),
              initial: { y: 40, opacity: 0 },
              animate: { y: 0, opacity: 1 },
              transition: { delay: 0.8, duration: 0.6 },
            }}
          >
            Кожна зйомка — це простір для відчуттів. Обирай свій формат.
          </Typography>
        </div>

        {/* Services grid */}
        <motion.div
          className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, staggerChildren: 0.2 }}
        >
          {services.map((service, index) => (
            <ServiceCard key={service.title} item={service} index={index} />
          ))}
        </motion.div>

        {/* Order service section */}
        <motion.div
          className="space-y-6 text-center lg:space-y-10"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="space-y-2 lg:space-y-4">
            <Typography parentAs="h3" weight="semibold" size="5xl" align="center">
              Готові створити свою історію?
            </Typography>

            <Typography parentAs="p" size="lg" align="center" className="normalcase lg:uppercase">
              Зв'яжіться з нами для обговорення деталей та бронювання дати зйомки
            </Typography>
          </div>
          <MButton size="textLg" variants={fadeInWithOpacity}>
            Замовити зйомку
          </MButton>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Services;
