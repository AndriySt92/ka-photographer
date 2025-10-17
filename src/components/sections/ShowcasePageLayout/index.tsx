import React from 'react';
import { motion } from 'framer-motion';

import { cn } from '@/lib';

import { Banner, DescriptionSection, GallerySection } from './components';

interface BannerProps {
  bannerPhoto: string;
  bannerPhotoMobile?: string;
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
      className={cn('space-y-lg padding-b relative min-h-screen w-full', className)}
      key={motionKey}
    >
      <Banner {...bannerProps} bannerContent={children} />
      <DescriptionSection {...descriptionProps} />
      <GallerySection {...galleryProps} />
    </motion.div>
  );
};

export default ShowcasePageLayout;
