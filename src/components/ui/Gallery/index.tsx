import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

import { cn, fadeInScale } from '@/lib';
import type { PhotoItem } from '@/types';
import { getCloudinarySrcSet, getCloudinaryUrl } from '@/utils';

import FancyboxAnchor from '../FancyboxAnchor';
import FancyboxLayout from '../FancyboxLayout';

interface GalleryProps {
  photos: PhotoItem[];
  className?: string;
  itemClassName?: string;
}

interface GalleryItemProps {
  publicId: string;
  className?: string;
}

const Gallery = ({ photos, className, itemClassName }: GalleryProps) => {
  if (!photos || !photos.length) return null;

  return (
    <FancyboxLayout>
      <div
        className={cn(
          'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 2xl:gap-8',
          className,
        )}
        data-testid="gallery-grid"
      >
        {photos.map((photo) => (
          <GalleryItem publicId={photo.publicId} key={photo._id} className={itemClassName} />
        ))}
      </div>
    </FancyboxLayout>
  );
};

const GalleryItem = ({ publicId, className }: GalleryItemProps) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={cn(
        'ios-overflow-fix group h-[544px] cursor-pointer overflow-hidden lg:h-[565px] 2xl:h-[630px]',
        className,
      )}
      variants={fadeInScale}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      data-testid="gallery-item"
    >
      <FancyboxAnchor href={getCloudinaryUrl(publicId, 1920)} gallery="gallery">
        {/* Loading placeholder */}
        {status === 'loading' && (
          <div
            className="absolute inset-0 animate-pulse bg-secondary/10"
            data-testid="loading-skeleton"
          ></div>
        )}

        {/* Error state */}
        {status === 'error' && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-secondary/5"
            data-testid="error-state"
          >
            <span className="text-sm text-secondary/80">Failed to load</span>
          </div>
        )}

        {/* Main img */}
        <img
          src={getCloudinaryUrl(publicId, 640)}
          srcSet={getCloudinarySrcSet(publicId)}
          sizes="
            (min-width: 1024px) 33vw,
            (min-width: 640px) 50vw,
            100vw
          "
          alt="gallery-photo"
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn(
            'h-full w-full object-cover transition-transform duration-500 group-hover:scale-105',
            status !== 'loaded' && 'opacity-0',
          )}
          data-testid="gallery-image"
        />
      </FancyboxAnchor>
    </motion.div>
  );
};

export default Gallery;
