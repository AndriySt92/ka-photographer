import { motion } from 'framer-motion';

import { BannerWrapper, GoBackButton } from '@/components';
import { fadeIn, staggerContainer } from '@/lib';

interface BannerProps {
  bannerContent: React.ReactNode;
  imageClassName?: string;
  bannerPhoto: string;
  bannerPhotoMobile?: string;
}

const Banner = ({ imageClassName, bannerPhoto, bannerPhotoMobile, bannerContent }: BannerProps) => {
  return (
    <BannerWrapper
      imageSrc={bannerPhoto}
      imageSrcMobile={bannerPhotoMobile}
      imageClassName={imageClassName}
      wrapperMotionProps={{
        initial: 'hidden',
        animate: 'visible',
        variants: staggerContainer(0.2, 1),
      }}
      imageMotionProps={{
        variants: fadeIn,
      }}
    >
      <div className="container relative h-full overflow-hidden py-12">
        <div className="flex h-full flex-col gap-6">
          {/* Go back button */}
          <motion.div className="mt-10 hidden lg:block" variants={fadeIn}>
            <GoBackButton />
          </motion.div>
          <div className="mt-10 flex flex-1 lg:mt-0">{bannerContent}</div>
        </div>
      </div>
    </BannerWrapper>
  );
};

export default Banner;
