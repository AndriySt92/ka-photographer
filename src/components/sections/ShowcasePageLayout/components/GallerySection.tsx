import { Gallery, Typography } from '../../../../components/ui';
import { fadeInRight } from '../../../../lib';

interface GallerySectionProps {
  photosUrls: string[];
}

const GallerySection = ({ photosUrls }: GallerySectionProps) => {
  return (
    <div className="container space-y-6 sm:space-y-8 xl:space-y-12">
      <Typography parentAs="h2" size="6xl" animated parentMotionProps={{ variants: fadeInRight }}>
        приклади останніх зйомок
      </Typography>

      <Gallery photosUrls={photosUrls} />
    </div>
  );
};

export default GallerySection;
