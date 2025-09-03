import { MButton, Typography } from '../../../../components/ui';
import { fadeIn, fadeInLeft, fadeInRight } from '../../../../lib';

const GalleryBannerContent = () => {
  return (
    <div className="flex h-full w-full flex-col pt-7 lg:h-[calc(100%-76px)] lg:pt-0">
      <div className="flex h-full w-full flex-col justify-between">
        {/* Title */}
        <Typography
          parentAs="h1"
          size="extraLarge"
          animated
          parentMotionProps={{ variants: fadeInLeft }}
        >
          Галерея
        </Typography>

        {/* Bottom */}
        <div className="mb-5 flex flex-col gap-10 sm:mb-0">
          <Typography
            parentAs="h3"
            size="5xl"
            animated
            parentMotionProps={{ variants: fadeInRight }}
            className="self-center sm:self-end"
          >
            Кожне фото — окрема історія.
          </Typography>
          <MButton size="textLg" variants={fadeIn} className="self-center sm:self-start">
            Замовити
          </MButton>
        </div>
      </div>
    </div>
  );
};

export default GalleryBannerContent;
