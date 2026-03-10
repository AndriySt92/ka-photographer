import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { post } from '@/api/clients';
import { endpoints, queryKeys } from '@/api/endpoints';
import type { ApiResponse, UploadedPhoto, UploadPhotosData } from '@/types';
import { getErrorMessage } from '@/utils';

import useCloudinaryUpload from '../useCloudinaryUpload';
import useToast from '../useToast';

const useUploadPhotos = () => {
  const queryClient = useQueryClient();
  const { uploadMultiple } = useCloudinaryUpload();
  const { showSuccess, showError } = useToast();

  return useMutation<ApiResponse, AxiosError, UploadPhotosData>({
    mutationFn: async ({ categories, photoFiles }) => {
      const uploadedPhotos = await uploadMultiple(photoFiles);

      return await post<ApiResponse, { categories: string[]; photos: UploadedPhoto[] }>(
        endpoints.photos.uploadPhotos,
        {
          categories,
          photos: uploadedPhotos,
        },
        {
          timeout: 300000,
        },
      );
    },

    onSuccess: (response, variables) => {
      showSuccess(response.message || `Завантажено ${variables.photoFiles.length} фото!`);

      variables.categories.forEach((category) => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.photos.photos(category),
        });
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.photos.photos('all'),
      });
    },

    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
    },
  });
};

export default useUploadPhotos;
