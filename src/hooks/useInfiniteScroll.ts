import { useEffect, useRef } from 'react';

import { useInViewport } from '.';

interface UseInfiniteScrollProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  rootMargin?: string;
  threshold?: number;
}

const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  rootMargin = '100px',
  threshold = 0.1,
}: UseInfiniteScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInViewport(ref, {
    root: null,
    rootMargin,
    threshold,
  });

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    triggerRef: ref,
    isInView,
  };
};

export default useInfiniteScroll;
