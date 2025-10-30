import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import { ErrorMessage, Loader, Typography } from '@/components/ui';
import { useInViewport, usePhotos } from '@/hooks';
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
    status,
    error,
  } = usePhotos({ category: category as string });

  const ref = useRef(null);
  const isInView = useInViewport(ref, {
    root: null,
    rootMargin: '100px',
    threshold: 0.1,
  });

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <motion.div
      className={cn(
        'relative min-h-screen w-full space-y-10 pb-10 sm:space-y-14 xl:space-y-16 xl:pb-14 2xl:pb-20',
        className,
      )}
      key={motionKey}
    >
      <Banner {...bannerProps} bannerContent={children} />
      <DescriptionSection {...descriptionProps} />
      {status === 'success' && photos.length > 0 ? (
        <GallerySection photos={photos} />
      ) : (
        <Typography size="2xl" align="center">
          Немає фотографій для відображення!
        </Typography>
      )}

      {/* Infinite scroll trigger */}
      {hasNextPage && <div ref={ref} className="h-2" />}

      {/* Loading state */}
      {isFetching && isFetchingNextPage && <Loader />}

      {/* Error state */}
      {status === 'error' && (
        <ErrorMessage
          error={String((error as Error).message)}
          size="lg"
          animationKey="server-error"
        />
      )}
    </motion.div>
  );
};

export default ShowcasePageLayout;
