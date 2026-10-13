import { useState } from 'react';

import { cn } from '@/lib';
import { getCloudinaryUrl } from '@/utils';

interface ReviewCardProps {
  avatar: string;
  reviewImage: string;
}

interface ImageWithStatusProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}

const ImageWithStatus = ({ src, alt, className, wrapperClassName }: ImageWithStatusProps) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div className={cn('relative overflow-hidden', wrapperClassName)}>
      {status === 'loading' && <div className="absolute inset-0 animate-pulse bg-secondary/10" />}

      {status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/10">
          <span className="text-xs text-secondary/60">Failed</span>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className={cn(className, status === 'loading' && 'opacity-0')}
      />
    </div>
  );
};

const ReviewCard = ({ avatar, reviewImage }: ReviewCardProps) => {
  return (
    <div className="mb-4 flex gap-1 last:mb-0 sm:mb-6">
      <ImageWithStatus
        src={getCloudinaryUrl(avatar, 128)}
        alt="User avatar"
        wrapperClassName="flex aspect-square h-10 items-center justify-center sm:h-14"
        className="h-full w-full object-contain"
      />

      <div className="mt-10 flex-1 space-y-2 sm:mt-14">
        <ImageWithStatus
          src={getCloudinaryUrl(reviewImage, 600)}
          alt="User review"
          wrapperClassName="flex min-h-12 min-w-40 items-center justify-center rounded-[22px]"
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
};

export default ReviewCard;
