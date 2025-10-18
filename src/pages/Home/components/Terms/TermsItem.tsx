import { motion } from 'framer-motion';

import { BackgroundGradient, Typography } from '@/components';
import { cn, fadeInLeft, fadeInRight } from '@/lib';

interface TermsItemProps {
  item: { title: string; subtitle: string };
  index: number;
}

const TermsItem = ({ item, index }: TermsItemProps) => {
  const isEven = (index + 1) % 2 === 0;

  return (
    <motion.div
      variants={isEven ? fadeInRight : fadeInLeft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="space-y-0 lg:space-y-2 xl:space-y-3 2xl:space-y-5"
    >
      <div className="relative flex items-center py-2 sm:py-1">
        <BackgroundGradient
          className={cn(
            'h-full w-[90vw] sm:w-[60vw] lg:w-[38vw] [@media(min-width:1950px)]:w-[30vw]',
            isEven
              ? 'right-[calc(50%-50vw)] rotate-[180deg] bg-gradient-to-r from-[#1a00ff] to-transparent [@media(min-width:1950px)]:right-0'
              : 'left-[calc(50%-50vw)] bg-gradient-to-l from-[#1a00ff] to-transparent [@media(min-width:1950px)]:left-0',
          )}
        />

        <Typography
          parentAs="h3"
          size="5xl"
          align={isEven ? 'right' : 'left'}
          className="relative z-50 w-full uppercase leading-[1.1] sm:normal-case"
        >
          {item.title}
        </Typography>
      </div>

      <Typography
        parentAs="div"
        size="lg"
        content={item.subtitle.split('\n')}
        align={isEven ? 'right' : 'left'}
        className="relative z-40 normal-case text-secondary xl:uppercase"
      />
    </motion.div>
  );
};

export default TermsItem;
