import { motion } from 'framer-motion';

import { galleryBanner } from '../../../../assets/images';
import { BannerWrapper, GoBackButton } from '../../../../components/ui';
import { fadeIn, staggerContainer } from '../../../../lib';

import GalleryBannerText from './GalleryBannerText';

const GalleryBanner = () => {
  return (
    <BannerWrapper
      imageSrc={galleryBanner}
      imageClassName="object-[36%_0%]"
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
        <motion.div className="hidden lg:my-4 lg:block" variants={fadeIn}>
          <GoBackButton />
        </motion.div>

        <GalleryBannerText />
      </div>
    </BannerWrapper>
  );
};

export default GalleryBanner;
