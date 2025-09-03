import React from 'react';
import { motion } from 'framer-motion';

import { cn } from '../../../lib';

import { Banner, DescriptionSection, GallerySection } from './components';

interface BannerProps {
  bannerPhoto: string;
  imageClassName?: string;
}

interface DescriptionProps {
  description: string;
  title: string;
}

interface GalleryProps {
  photosUrls: string[];
}

export interface ShowcasePageLayoutProps {
  children: React.ReactNode; // Content to be displayed in the banner
  bannerProps: BannerProps;
  descriptionProps: DescriptionProps;
  galleryProps: GalleryProps;
  motionKey?: string;
  className?: string;
}

const ShowcasePageLayout = ({
  bannerProps,
  descriptionProps,
  galleryProps,
  children,
  motionKey,
  className,
}: ShowcasePageLayoutProps) => {
  return (
    <motion.div
      className={cn(
        'relative min-h-screen w-full space-y-10 sm:space-y-14 xl:space-y-16 xl:pb-14 2xl:pb-20',
        className,
      )}
      key={motionKey}
    >
      <Banner {...bannerProps} bannerContent={children} />
      <DescriptionSection {...descriptionProps} />
      <GallerySection {...galleryProps} />
    </motion.div>
  );
};

export default ShowcasePageLayout;
