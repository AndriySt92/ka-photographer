import { Gallery, Typography } from '../../../../components/ui';
import { fadeInRight } from '../../../../lib';

interface GallerySectionProps {
  photosUrl: string[];
}

const GallerySection = ({ photosUrl }: GallerySectionProps) => {
  return (
    <div className="container space-y-6 sm:space-y-8 xl:space-y-12">
      {/* <h2 className="font-title text-2xl uppercase text-primary xl:text-[42px] 2xl:text-[64px]">
        приклади останніх зйомок
      </h2> */}
      <Typography parentAs="h2" size="6xl" animated parentMotionProps={{ variants: fadeInRight }}>
        приклади останніх зйомок
      </Typography>

      <Gallery photosUrls={photosUrl} />
    </div>
  );
};

export default GallerySection;
