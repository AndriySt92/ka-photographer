import React from 'react';
import { motion } from 'framer-motion';

import { ErrorMessage, Loader, Typography } from '@/components/ui';
import { useInfiniteScroll, usePhotos } from '@/hooks';
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

export interface ShowcasePageLayoutProps {
  category: string;
  children: React.ReactNode; // Content to be displayed in the banner
  bannerProps: BannerProps;
  descriptionProps: DescriptionProps;
  motionKey?: string;
  className?: string;
}

const ShowcasePageLayout = ({
  bannerProps,
  descriptionProps,
  children,
  motionKey,
  className,
  category,
}: ShowcasePageLayoutProps) => {
  const {
    data: photos,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isSuccess,
    isError,
    error,
  } = usePhotos({ category: category as string });

  const { triggerRef } = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return (
    <motion.div
      className={cn('padding-b space-y-lg relative min-h-screen w-full', className)}
      key={motionKey}
    >
      <Banner {...bannerProps} bannerContent={children} />
      <DescriptionSection {...descriptionProps} />

      {/* Gallery */}
      {isSuccess && photos.length > 0 && <GallerySection photos={photos} />}

      {/* Photos data is empty */}
      {isSuccess && photos?.length === 0 && (
        <Typography size="2xl" align="center">
          Немає фотографій для відображення!
        </Typography>
      )}

      {/* Infinite scroll trigger */}
      {hasNextPage && <div ref={triggerRef} className="h-2" />}

      {/* Loading state */}
      {isFetching && isFetchingNextPage && <Loader />}

      {/* Error state */}
      {isError && (
        <ErrorMessage
          error={String((error as Error).message)}
          size="lg"
          animationKey="server-error"
          className="text-center"
        />
      )}
    </motion.div>
  );
};

export default ShowcasePageLayout;
