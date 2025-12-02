import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

import { close } from '@/assets';
import { Button, FancyboxAnchor, Icon } from '@/components';
import { cn, fadeInScale } from '@/lib';
import type { PhotoItem } from '@/types';

interface AdminGalleryItemProps {
  photo: PhotoItem;
  isAdmin?: boolean;
  onDelete?: (photo: PhotoItem) => void;
}

const AdminGalleryItem = ({ isAdmin, photo, onDelete }: AdminGalleryItemProps) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className="relative h-[544px] cursor-pointer overflow-hidden lg:h-[565px] 2xl:h-[630px]"
      variants={fadeInScale}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <FancyboxAnchor href={photo.photoUrl} gallery="gallery">
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
          src={photo.photoUrl}
          alt="gallery-photo"
          loading="lazy"
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn('h-full w-full object-cover', status !== 'loaded' && 'opacity-0')}
        />
      </FancyboxAnchor>

      {isAdmin && (
        <Button
          intent="minimal"
          onClick={onDelete ? () => onDelete(photo) : undefined}
          style={{
            willChange: 'transform',
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)',
          }}
          className="absolute right-2 top-2 z-10 h-8 w-8 rounded-lg bg-secondary/10 p-2 backdrop-blur-sm hover:scale-105 hover:bg-secondary/15"
        >
          <Icon name="remove" icon={close} size=" h-4 aspect-auto" />
        </Button>
      )}
    </motion.div>
  );
};

export default AdminGalleryItem;
