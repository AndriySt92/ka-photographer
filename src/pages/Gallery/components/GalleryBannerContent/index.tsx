import { MButton, SessionOrderModal, Typography } from '@/components';
import { useModal } from '@/hooks';
import { fadeIn, fadeInLeft, fadeInRight } from '@/lib';

const GalleryBannerContent = () => {
  const { closeModal, openModal, isOpenModal } = useModal();

  return (
    <div className="flex flex-1 flex-col justify-between">
      {/* Title */}
      <Typography
        parentAs="h1"
        size="extraLarge"
        animated
        parentMotionProps={{ variants: fadeInLeft }}
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
        <MButton
          onClick={openModal}
          size="textLg"
          variants={fadeIn}
          className="self-center sm:self-start"
        >
          Замовити
        </MButton>

        {/* Modal */}
        <SessionOrderModal onClose={closeModal} isOpen={isOpenModal} />
      </div>
    </div>
  );
};

export default GalleryBannerContent;
