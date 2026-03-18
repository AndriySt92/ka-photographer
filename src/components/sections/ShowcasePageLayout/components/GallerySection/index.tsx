import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import { Gallery, Typography } from '@/components/ui';
import { fadeInRight } from '@/lib';
import type { PhotoItem } from '@/types';

interface GallerySectionProps {
  photos: PhotoItem[];
}

const GallerySection = ({ photos }: GallerySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.01 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="container space-y-6 sm:space-y-8 xl:space-y-12"
      data-testid="gallery-section"
    >
      <Typography parentAs="h2" size="6xl" animated parentMotionProps={{ variants: fadeInRight }}>
        приклади останніх зйомок
      </Typography>

      <Gallery photos={photos} />
    </motion.div>
  );
};

export default GallerySection;
