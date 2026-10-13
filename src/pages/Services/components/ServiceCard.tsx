import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

import { Typography } from '@/components';
import { useMediaQuery } from '@/hooks';
import { cn, fadeInBottom, smoothTransition } from '@/lib';
import type { ServicesItem } from '@/types';

interface ServiceCardProps {
  item: ServicesItem;
}

const ServiceCard = ({ item }: ServiceCardProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { once: true, amount: 0.1 });
  const isCoarsePointer = useMediaQuery('(pointer: coarse)');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={wrapperRef}
      className="relative h-[600px] w-full overflow-hidden rounded-lg"
      variants={fadeInBottom}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={item.path} className="group block h-full">
        {/* Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-105"
          style={{ backgroundImage: `url(${item.img})` }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-6 pb-8 text-center text-white">
          {/* Title */}
          <motion.div
            animate={{
              y: isHovered ? -5 : 0,
            }}
            transition={smoothTransition(0.7)}
          >
            <Typography
              parentAs="h3"
              font="primary"
              size="custom"
              color="light"
              align="center"
              weight="normal"
              className={cn(
                'text-2xl xl:text-3xl 2xl:text-4xl',
                item.title === 'Love Story' && 'whitespace-nowrap',
              )}
            >
              {item.title}
            </Typography>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={false}
            animate={{
              y: isCoarsePointer ? 0 : isHovered ? 0 : 8,
              opacity: isCoarsePointer ? 1 : isHovered ? 1 : 0,
              height: isCoarsePointer ? 'auto' : isHovered ? 'auto' : 0,
            }}
            transition={smoothTransition(0.7)}
            className="overflow-hidden"
          >
            <Typography
              parentAs="p"
              align="center"
              size="custom"
              className="mt-2 max-w-[280px] text-base normal-case xl:text-lg"
            >
              {item.description}
            </Typography>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
