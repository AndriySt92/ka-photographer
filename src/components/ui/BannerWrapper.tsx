import type { HTMLAttributes, ImgHTMLAttributes } from 'react';
import { motion, type MotionProps } from 'framer-motion';

import { cn } from '../../lib';

interface BannerWrapperProps {
  children: React.ReactNode;
  imageSrc: string;
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
      {' '}
      {/* Background image section */}
      <div className="absolute inset-0">
        <div className={cn('absolute z-10 h-full w-full', overlayClassName)} />

        <ImageComponent
          src={imageSrc}
          alt={imageAlt}
          {...(animated ? imageMotionProps : {})}
          className={cn('absolute h-full w-full object-cover', imageClassName)}
        />
      </div>
      {/* Content section */}
      <div className={cn('relative z-20 h-full w-full', contentClassName)}>{children}</div>
    </WrapperComponent>
  );
};

export default BannerWrapper;
