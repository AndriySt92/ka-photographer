import { motion } from 'framer-motion';

import { Button, SessionOrderModal, Typography } from '@/components';
import { useModal } from '@/hooks';
import { fadeIn, fadeInBottom, fadeInRight } from '@/lib';

const GalleryBannerContent = () => {
  const { closeModal, openModal, isOpenModal } = useModal();

  return (
    <div className="flex flex-1 flex-col justify-between">
      {/* Title */}
      <Typography
        parentAs="h1"
        size="extraLarge"
        className="[@media(max-width:599px)]:!text-[60px]"
        animated
        parentMotionProps={{ variants: fadeIn }}
      >
        Галерея
      </Typography>

      {/* Text & Button */}
      <div className="flex flex-col gap-10">
        <Typography
          parentAs="h3"
          size="5xl"
          animated
          parentMotionProps={{ variants: fadeInRight }}
          className="self-center sm:self-end"
        >
          Кожне фото — окрема історія.
        </Typography>
        <motion.div className="text-center sm:text-left" variants={fadeInBottom}>
          <Button size="textLg" onClick={openModal}>
            Замовити
          </Button>
        </motion.div>

        {/* Modal */}
        <SessionOrderModal onClose={closeModal} isOpen={isOpenModal} />
      </div>
    </div>
  );
};

export default GalleryBannerContent;
