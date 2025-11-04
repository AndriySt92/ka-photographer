import { useInfiniteQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { get } from '@/api/clients';
import { endpoints, queryKeys } from '@/api/endpoints';
import type { PhotoItem } from '@/types';

interface PhotosResponse {
  data: PhotoItem[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

interface UsePhotosParams {
  category: string;
  limit?: number;
}

const usePhotos = ({ category, limit = 6 }: UsePhotosParams) => {
  return useInfiniteQuery<PhotosResponse, AxiosError, PhotoItem[]>({
    queryKey: queryKeys.photos.photos(category),
    queryFn: ({ pageParam = 1 }) =>
      get<PhotosResponse>(endpoints.photos.photos({ category, page: pageParam as number, limit })),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasNextPage ? lastPage.pagination.currentPage + 1 : undefined;
    },
    select: (data) => data.pages.flatMap((page) => page.data),
    staleTime: Infinity,
  });
};

export default usePhotos;
