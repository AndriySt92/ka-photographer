import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

import { FancyboxAnchor, FancyboxLayout } from '@/components';
import { cn, fadeInScale } from '@/lib';
import type { PhotoItem } from '@/types';

interface GalleryItemProps {
  photoUrl: string;
  className?: string;
}

interface GalleryProps {
  photos: PhotoItem[];
  className?: string;
  itemClassName?: string;
}

const Gallery = ({ photos, className, itemClassName }: GalleryProps) => {
  if (!photos || !photos.length) return;

  return (
    <FancyboxLayout>
      <div
        className={cn(
          'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 2xl:gap-8',
          className,
        )}
      >
        {photos.map((photo) => (
          <GalleryItem photoUrl={photo.photoUrl} key={photo._id} className={itemClassName} />
        ))}
      </div>
    </FancyboxLayout>
  );
};

const GalleryItem = ({ photoUrl, className }: GalleryItemProps) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={cn(
        'group h-[544px] cursor-pointer overflow-hidden lg:h-[620px] 2xl:h-[630px]',
        className,
      )}
      // className={cn('group cursor-pointer overflow-hidden h-[544px] lg:h-[565px] 2xl:h-[630px]', className)}
      variants={fadeInScale}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <FancyboxAnchor href={photoUrl} gallery="gallery">
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

export default Gallery;
