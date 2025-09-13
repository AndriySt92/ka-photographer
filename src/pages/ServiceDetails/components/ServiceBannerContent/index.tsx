import { motion } from 'framer-motion';

import { Button, SessionOrderModal, Typography } from '@/components';
import { useModal, useWindowSize } from '@/hooks';
import { fadeIn, fadeInBottom, fadeInLeft, staggerContainer } from '@/lib';
import type { SessionOption } from '@/types';

interface ServiceBannerTextProps {
  name: string;
  value: SessionOption['value'];
  details: {
    price: string;
    duration: string;
    photosCount: string;
    deliveryTime: string;
  };
}

const ServiceBannerContent = ({ name, details, value }: ServiceBannerTextProps) => {
  const { isOpenModal, openModal, closeModal } = useModal();
  const { height } = useWindowSize();

  const getTextSize = () => {
    if (height > 800) return 'text-[7rem]';
    if (height > 700) return 'text-[6rem]';
    if (height > 600) return 'text-[5.3rem]';
    return 'text-[3.2rem]';
  };

  const textSizeClass = getTextSize();
  const isGroupOrExpress = name === 'Групова зйомка' || name === 'Експрес зйомка';
  const isLoveStory = name === 'Love Story';
  const isIndividual = name === 'Індивідуальна зйомка';
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer(0.7, 0.1, 0.3)}
      className="h-full pt-7 lg:h-[calc(100%-76px)] lg:pt-0"
    >
      <div className="flex h-full flex-col">
        <div className="z-20 flex flex-grow flex-col justify-between text-white">
          {/* Title */}
          <motion.div variants={fadeIn}>
            {isGroupOrExpress && (
              <Typography
                content={name.split(' ')}
                parentAs="h1"
                size="6xl"
                childrenClasses={{ 1: 'sm:ml-[100%] sm:text-right' }}
                className="inline-block text-4xl leading-[1]"
              />
            )}

            {isLoveStory && (
              <Typography parentAs="h1" size="6xl" className="text-4xl">
                {name}
              </Typography>
            )}
            {isIndividual && (
              <Typography
                content={name.split(' ')}
                parentAs="h1"
                size="6xl"
                childrenClasses={{ 1: 'sm:text-right' }}
                className="inline-block text-4xl leading-[1]"
              />
            )}
          </motion.div>

          {/* Details */}
          <Typography
            parentAs="ul"
            childAs="li"
            content={[
              `— ${details.price} / ${details.duration}`,
              `— ${details.photosCount} в авторській обробці`,
              `— ${details.deliveryTime} Термін віддачі: до 10 днів`,
            ]}
            size="2xl"
            animated
            parentMotionProps={{ variants: staggerContainer(0, 0, 0.2) }}
            childrenVariants={fadeInLeft}
          />

          {/* Button */}
          <motion.div
            className="text-center sm:text-left"
            variants={fadeInBottom}
            transition={{ delay: 1 }}
          >
            <Button size="textLg" onClick={openModal}>
              Замовити
            </Button>
          </motion.div>

          {/* Modal  */}
          <SessionOrderModal onClose={closeModal} isOpen={isOpenModal} sessionType={value} />
        </div>
      </div>

      {/* Vertical text */}
      <div className="absolute right-0 top-7 z-20 mr-5 hidden h-full transform flex-col items-center justify-center sm:flex xl:top-5">
        <Typography
          parentAs="h1"
          content={'Послуги'.split('')}
          size="custom"
          className={`!leading-[0.87] ${textSizeClass}`}
          animated
          parentMotionProps={{ variants: staggerContainer(0, 0, 0.1) }}
          childrenVariants={fadeInBottom}
        />
      </div>
    </motion.div>
  );
};

export default ServiceBannerContent;
