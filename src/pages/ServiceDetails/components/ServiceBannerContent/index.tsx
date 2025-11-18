import { motion } from 'framer-motion';

import { Button, SessionOrderModal, Typography } from '@/components';
import { useModal, useWindowSize } from '@/hooks';
import { fadeIn, fadeInBottom, fadeInLeft, staggerContainer } from '@/lib';
import type { CategoriesItem } from '@/types';

interface ServiceBannerTextProps {
  name: string;
  value: CategoriesItem['value'];
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
    return 'text-[4.2rem]';
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
      className="flex flex-1 flex-col justify-between"
    >
      {/* Title */}
      <motion.div variants={fadeIn} className="text-center sm:text-left">
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
          <Typography parentAs="h1" size="6xl" className="text-center text-4xl sm:text-left">
            {name}
          </Typography>
        )}
        {isIndividual && (
          <Typography
            content={name.split(' ')}
            parentAs="h1"
            size="6xl"
            childrenClasses={{ 1: 'sm:text-right' }}
            className="inline-block text-4xl !leading-[1.15] sm:!leading-[1]"
          />
        )}
      </motion.div>

      {/* Details Section */}
      <Typography
        parentAs="ul"
        childAs="li"
        weight="normal"
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

        {/* Modal */}
        <SessionOrderModal onClose={closeModal} isOpen={isOpenModal} sessionType={value} />
      </motion.div>

      {/* Vertical text */}
      <div className="margin-t absolute bottom-0 right-0 top-0 w-fit">
        <div className="mr-4 hidden h-full transform flex-col items-center justify-center sm:flex">
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
      </div>
    </motion.div>
  );
};

export default ServiceBannerContent;
