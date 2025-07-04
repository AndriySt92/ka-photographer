import { bannerImg } from '../../../../assets/images';
import { BannerWrapper } from '../../../../components/ui';

import AnimatedGridOverlay from './AnimatedGridOverlay';
import TextContent from './TextContent';

const Banner = () => {
  return (
    <BannerWrapper
      overlayClassName="block bg-primary/40 backdrop-blur-md xl:hidden"
      imageClassName="object-[45%_0%]"
      imageSrc={bannerImg}
      imageAlt="banner"
    >
      <AnimatedGridOverlay />
      <TextContent />
    </BannerWrapper>
  );
};

export default Banner;
