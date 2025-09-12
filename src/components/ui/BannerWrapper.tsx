import type { HTMLAttributes, ImgHTMLAttributes } from 'react';
import { motion, type MotionProps } from 'framer-motion';

import { cn } from '@/lib';

interface BannerWrapperProps {
  children: React.ReactNode;
  imageSrc: string;
  imageSrcMobile?: string;
  imageAlt?: string;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  contentClassName?: string;
  animated?: boolean;
  wrapperMotionProps?: MotionProps & HTMLAttributes<HTMLDivElement>;
  imageMotionProps?: MotionProps & ImgHTMLAttributes<HTMLImageElement>;
}

const BannerWrapper = ({
  children,
  imageSrc,
  imageSrcMobile,
  imageAlt = 'Banner background',
  className = '',
  imageClassName = '',
  overlayClassName = '',
  contentClassName = '',
  animated = false,
  wrapperMotionProps = {},
  imageMotionProps = {},
}: BannerWrapperProps) => {
  // Choose element types
  const WrapperComponent = animated ? motion.div : 'div';
  const ImageComponent = animated ? motion.img : 'img';

  return (
    <WrapperComponent
      className={cn('relative h-screen w-full overflow-hidden', className)}
      {...(animated ? wrapperMotionProps : {})}
    >
      {/* Background image section */}
      <div className="absolute inset-0">
        <div className={cn('absolute z-10 h-full w-full', overlayClassName)} />

        <picture>
          {/* For screens above 640px */}
          <source media="(min-width: 640px)" srcSet={imageSrc} />
          {/* For screens less 640px */}
          <source media="(max-width: 639px)" srcSet={imageSrcMobile} />

          {/* fallback */}
          <ImageComponent
            src={imageSrcMobile || imageSrc}
            alt={imageAlt}
            {...(animated ? imageMotionProps : {})}
            className={cn('absolute h-full w-full object-cover', imageClassName)}
          />
        </picture>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content section */}
      <div className={cn('relative z-20 h-full w-full', contentClassName)}>{children}</div>
    </WrapperComponent>
  );
};

export default BannerWrapper;
