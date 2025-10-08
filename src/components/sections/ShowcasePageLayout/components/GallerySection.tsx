import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import { Gallery, Typography } from '@/components';
import { fadeInRight } from '@/lib';

interface GallerySectionProps {
  photosUrls: string[];
  motionKey?: string;
}

const GallerySection = ({ photosUrls, motionKey }: GallerySectionProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { once: true, amount: 0.01 });

  return (
    <motion.div
      className="container space-y-6 sm:space-y-8 xl:space-y-12"
      ref={wrapperRef}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <Typography parentAs="h2" size="6xl" animated parentMotionProps={{ variants: fadeInRight }}>
        приклади останніх зйомок
      </Typography>

      <Gallery photosUrls={photosUrls} motionKey={motionKey} />
    </motion.div>
  );
};

export default GallerySection;
