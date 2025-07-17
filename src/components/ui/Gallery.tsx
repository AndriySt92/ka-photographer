import { useState } from 'react';
import { motion } from 'framer-motion';

import { cn, fadeInScale } from '../../lib';

import { FancyboxAnchor, FancyboxLayout } from './';

interface GalleryProps {
  photosUrl: string[];
}

const GalleryItem = ({ photoUrl }: { photoUrl: string }) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('error');

  return (
    <div className="overflow-hidden">
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
        <motion.img
          src={photoUrl}
          alt="gallery-photo"
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn(
            'w-full object-cover transition-opacity duration-500 hover:scale-[1.02]',
            status !== 'loaded' && 'opacity-0',
          )}
          variants={fadeInScale}
          initial="hidden"
          whileInView="visible"
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 },
          }}
          viewport={{ amount: 0.5, once: true }}
        />
      </FancyboxAnchor>
    </div>
  );
};

const Gallery = ({ photosUrl }: GalleryProps) => {
  return (
    <FancyboxLayout>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 2xl:gap-8">
        {photosUrl.map((photoUrl) => (
          <GalleryItem photoUrl={photoUrl} key={photoUrl} />
        ))}
      </div>
    </FancyboxLayout>
  );
};

export default Gallery;
