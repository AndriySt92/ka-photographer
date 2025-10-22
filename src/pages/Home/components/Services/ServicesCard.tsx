import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Typography } from '@/components';
import { cn, fadeIn } from '@/lib';
import type { ServicesItem } from '@/types';

interface ServiceCardProps {
  item: ServicesItem;
}

const ServicesCard = ({ item }: ServiceCardProps) => {
  return (
    <Link to={item.path} className="block h-full">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true, amount: 0.2 }}
        className="group relative inset-0 flex h-full flex-col overflow-hidden border-l pointer-fine:border-primary pointer-coarse:border-none"
      >
        {/* White overlay - visible by default */}
        <div className="opacity-1 absolute inset-0 z-10 hidden bg-white duration-700 group-hover:opacity-0 pointer-fine:block" />

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${item.img})` }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

        {/* Title overlay */}
        <div className="absolute bottom-[3%] z-20 flex w-full justify-center duration-500 group-hover:-translate-y-3 lg:bottom-[5%]">
          <Typography
            parentAs="h4"
            font="secondary"
            size="custom"
            align="center"
            className={cn(
              'whitespace-wrap w-min px-2 text-2xl duration-500 group-hover:text-secondary xl:text-3xl 2xl:text-4xl pointer-fine:text-primary pointer-coarse:text-secondary',
              item.title === 'Love Story' && 'w-auto whitespace-nowrap',
            )}
          >
            {item.title}
          </Typography>
        </div>
      </motion.div>
    </Link>
  );
};

export default ServicesCard;
