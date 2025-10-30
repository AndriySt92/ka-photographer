import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

import { FancyboxAnchor, FancyboxLayout } from '@/components';
import { cn, fadeInScale } from '@/lib';
import type { PhotoItem } from '@/types';

interface GalleryProps {
  photos: PhotoItem[];
  className?: string;
}

const GalleryItem = ({ photoUrl }: { photoUrl: string }) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="overflow-hidden"
      variants={fadeInScale}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <FancyboxAnchor
        href={photoUrl}
        gallery="gallery"
        className="h-[70vh] cursor-pointer overflow-hidden sm:h-[80vh]"
      >
        {/* Loading placeholder */}
        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-primary" />
          </div>
        )}

        {/* Error state */}
        {status === 'error' && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-500">
            <span className="text-white">Failed to load</span>
          </div>
        )}

        {/* Main img */}
        <img
          src={photoUrl}
          alt="gallery-photo"
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-500',
            status !== 'loaded' && 'opacity-0',
          )}
        />
      </FancyboxAnchor>
    </motion.div>
  );
};

const Gallery = ({ photos, className }: GalleryProps) => {
  return (
    <FancyboxLayout>
      <div
        className={cn(
          'grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 2xl:gap-8',
          className,
        )}
      >
        {photos.map((photo) => (
          <GalleryItem photoUrl={photo.photoUrl} key={photo._id} />
        ))}
      </div>
    </FancyboxLayout>
  );
};

export default Gallery;
