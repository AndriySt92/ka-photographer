import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { post } from '@/api/clients';
import { endpoints, queryKeys } from '@/api/endpoints';
import type { ApiResponse, UploadPhotosData } from '@/types';
import { getErrorMessage } from '@/utils';

import useCloudinaryUpload from './useCloudinaryUpload';

const useUploadPhotos = () => {
  const queryClient = useQueryClient();
  const { uploadMultiple } = useCloudinaryUpload();

  return useMutation<ApiResponse, AxiosError, UploadPhotosData>({
    mutationFn: async ({ categories, photoFiles }) => {
      const photoUrls = await uploadMultiple(photoFiles);

      return await post<ApiResponse, { categories: string[]; photoUrls: string[] }>(
        endpoints.photos.uploadPhotos,
        { categories, photoUrls },
        {
          timeout: 300000, // 5 minutes
        },
      );
    },

    onSuccess: (response, variables) => {
      toast.success(response.message || `Завантажено ${variables.photoFiles.length} фото!`);

      variables.categories.forEach((category) => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.photos.photos(category),
        });
      });

      // Invalidate all photos after upload
      queryClient.invalidateQueries({
        queryKey: queryKeys.photos.photos('all'),
      });
    },

    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });
};

export default useUploadPhotos;
