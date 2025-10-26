import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

import { detailsArrow } from '@/assets';
import { Icon, Typography } from '@/components';
import { cn, fadeInBottom } from '@/lib';
import type { ServicesItem } from '@/types';

interface ServiceCardProps {
  item: ServicesItem;
}

const ServiceCard = ({ item }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { once: true, amount: 0.01 });

  return (
    <motion.div
      className="relative h-[600px] w-full overflow-hidden rounded-lg xl:h-[600px]"
      transition={{ duration: 0.8 }}
      whileHover={{ y: -10 }}
      ref={wrapperRef}
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInBottom}
      viewport={{ once: true, amount: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={item.path} className="block h-full">
        {/* Background image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.img})` }}
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-end p-6 text-white">
          <motion.div
            animate={{
              y: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="mb-2 flex items-center justify-center"
          >
            <span className="mb-2 text-4xl">{item.icon}</span>
            <Typography parentAs="span" font="secondary" size="lg" className="mr-2">
              {item.title}
            </Typography>
          </motion.div>

          <motion.div
            className="absolute z-20 ml-[-24px] flex w-full justify-center"
            animate={{
              y: isHovered ? 20 : 0,
              opacity: isHovered ? 0 : 1,
            }}
            transition={{ duration: 0.4 }}
          >
            <Typography
              parentAs="h3"
              font="primary"
              size="custom"
              color="light"
              align="center"
              className={cn(
                'whitespace-wrap w-min px-2 text-2xl duration-500 xl:text-3xl 2xl:text-4xl',
                item.title === 'Love Story' && 'w-auto whitespace-nowrap',
              )}
            >
              {item.title}
            </Typography>
          </motion.div>

          <motion.div
            animate={{
              y: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Typography
              parentAs="p"
              align="center"
              size="custom"
              className="mt-1 text-lg normal-case"
            >
              {item.description}
            </Typography>
          </motion.div>

          <motion.div
            className="mt-4 flex items-center opacity-0"
            animate={{
              y: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Typography parentAs="span" font="secondary" size="custom" className="mr-2 text-base">
              Дізнатися більше
            </Typography>

            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{
                duration: 0.3,
                repeat: isHovered ? Infinity : 0,
                repeatType: 'reverse',
              }}
            >
              <Icon icon={detailsArrow} name="service-details" size="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
