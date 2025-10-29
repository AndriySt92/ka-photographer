import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { post } from '@/api/clients';
import { endpoints, queryKeys } from '@/api/endpoints';
import type { ApiResponse } from '@/types';
import { getErrorMessage } from '@/utils';

interface UploadPhotosData {
  categories: string[];
  photoFiles: File[];
}

const useUploadPhotos = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError, UploadPhotosData>({
    mutationFn: async ({ categories, photoFiles }: UploadPhotosData) => {
      const formData = new FormData();

      formData.append('categories', JSON.stringify(categories));

      photoFiles.forEach((file) => {
        formData.append('photoFiles', file);
      });

      return await post<ApiResponse, FormData>(endpoints.photos.uploadPhotos, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },

    onSuccess: (response, variables) => {
      toast.success(response.message || `Завантажено ${variables.photoFiles.length} фото!`);

      variables.categories.forEach((category) => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.photos.photosByCategory(category),
        });
      });
    },

    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });
};

export default useUploadPhotos;
