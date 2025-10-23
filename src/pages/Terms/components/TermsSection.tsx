import { motion } from 'framer-motion';

import { Typography } from '@/components';
import { terms } from '@/config';
import { fadeInLeft, fadeInRight } from '@/lib';

interface TermsItemProps {
  icon: string;
  title: string;
  subtitle: string;
  index: number;
}

const TermsItem = ({ icon, title, subtitle, index }: TermsItemProps) => {
  const isEvenItem = (index + 1) % 2 === 0;
  const isLastItem = index === terms.length - 1;

  return (
    <motion.div
      variants={isEvenItem ? fadeInLeft : fadeInRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Icon with connector */}
        <div className="relative hidden w-16 flex-shrink-0 md:block">
          <motion.div
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/20 bg-black pb-1 text-2xl"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            {icon}
          </motion.div>

          {/* Vertical connector */}
          {!isLastItem && (
            <div className="absolute left-1/2 top-16 z-10 h-[calc(100%+2rem)] w-1 -translate-x-1/2 transform bg-accent/40 lg:h-[calc(100%+3rem)]"></div>
          )}
        </div>

        {/* Term content */}
        <motion.div
          className="section-border flex-1 rounded-3xl bg-gradient-to-r from-accent/40 to-primary p-8 backdrop-blur-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center md:hidden">
              <span className="mb-2 text-2xl">{icon}</span>
            </div>
            <div className="relative flex items-center py-2 sm:py-1">
              <Typography
                parentAs="h3"
                size="5xl"
                className="relative z-50 w-full uppercase leading-[1.1] sm:normal-case"
              >
                {title}
              </Typography>
            </div>
          </div>

          {subtitle.split('.').map((line, i) => (
            <Typography key={i} parentAs="p" size="lg" className="mb-3 normal-case opacity-80">
              {line}
            </Typography>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

const TermsSection = () => {
  return (
    <div className="space-y-sm relative">
      {terms.map(({ icon, title, subtitle }, index) => (
        <TermsItem index={index} key={title} icon={icon} title={title} subtitle={subtitle} />
      ))}
    </div>
  );
};

export default TermsSection;
