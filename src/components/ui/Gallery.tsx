import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

import { FancyboxAnchor, FancyboxLayout } from '@/components';
import { cn, fadeInScale } from '@/lib';

interface GalleryProps {
  photosUrls: string[];
  className?: string;
  motionKey?: string;
}

const GalleryItem = ({ photoUrl }: { photoUrl: string }) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('error');

  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapperRef, { once: true, amount: 0.4 });

  return (
    <motion.div
      className="overflow-hidden"
      ref={wrapperRef}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInScale}
    >
      <FancyboxAnchor
        href={photoUrl}
        gallery="gallery"
        className="relative aspect-[3/4] w-full cursor-pointer overflow-hidden"
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
            'w-full object-cover transition-all duration-500 hover:scale-105',
            status !== 'loaded' && 'opacity-0',
          )}
        />
      </FancyboxAnchor>
    </motion.div>
  );
};

const Gallery = ({ photosUrls, className }: GalleryProps) => {
  return (
    <FancyboxLayout>
      <div
        className={cn(
          'grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 2xl:gap-8',
          className,
        )}
      >
        {photosUrls.map((photoUrl) => (
          <GalleryItem photoUrl={photoUrl} key={photoUrl} />
        ))}
      </div>
    </FancyboxLayout>
  );
};

export default Gallery;
