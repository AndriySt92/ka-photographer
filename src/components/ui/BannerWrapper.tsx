import { type HTMLAttributes, type ImgHTMLAttributes, useRef } from 'react';
import { motion, type MotionProps, useScroll, useTransform } from 'framer-motion';

import { useWindowSize } from '@/hooks';
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
  wrapperMotionProps = {},
  imageMotionProps = {},
}: BannerWrapperProps) => {
  // Ref for the banner wrapper to track scroll position
  const ref = useRef<HTMLDivElement | null>(null);

  const { width } = useWindowSize();
  const isMobile = width < 768;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax translation & scale effects for the background image.
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '0%' : '60%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 0.9], [1, isMobile ? 1 : 1.1]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative w-full overflow-hidden',
        'h-[100dvh] min-h-[100dvh]',
        'sm:h-screen sm:min-h-screen',
        className,
      )}
      {...wrapperMotionProps}
    >
      {/* Background image section */}
      <div className="absolute inset-0">
        <div className={cn('absolute z-10 h-full w-full', overlayClassName)} />

        <picture>
          {/* For screens above 640px */}
          <source media="(min-width: 640px)" srcSet={imageSrc} />
          {/* For screens less 639x */}
          <source media="(max-width: 639px)" srcSet={imageSrcMobile} />

          <motion.img
            src={imageSrcMobile || imageSrc}
            alt={imageAlt}
            {...imageMotionProps}
            className={cn('absolute h-full w-full object-cover', imageClassName)}
            style={{
              y: backgroundY,
              scale: backgroundScale,
            }}
          />
        </picture>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content section */}
      <div className={cn('relative z-20 h-full', contentClassName)}>{children}</div>
    </motion.div>
  );
};

export default BannerWrapper;
