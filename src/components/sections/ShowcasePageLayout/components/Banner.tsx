import { motion } from 'framer-motion';

import { BannerWrapper } from '@/components/ui';
import GoBackButton from '@/components/ui/GoBackButton';
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
      animated
      wrapperMotionProps={{
        initial: 'hidden',
        animate: 'visible',
        variants: staggerContainer(0.2, 1),
      }}
      imageMotionProps={{
        variants: fadeIn,
      }}
    >
      <div className="container relative h-full overflow-hidden py-14 lg:py-20">
        {/* Go back button */}
        <motion.div className="mb-8 mt-4 hidden lg:block" variants={fadeIn}>
          <GoBackButton />
        </motion.div>

        {bannerContent}
      </div>
    </BannerWrapper>
  );
};

export default Banner;
