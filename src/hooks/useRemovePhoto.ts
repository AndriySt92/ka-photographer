import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { remove } from '@/api/clients';
import { endpoints, queryKeys } from '@/api/endpoints';
import type { ApiResponse } from '@/types';
import { getErrorMessage } from '@/utils';

import useToast from './useToast';

interface RemovePhotoData {
  categories: string[];
  photoId: string;
}

const useRemovePhoto = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  return useMutation<ApiResponse, AxiosError, RemovePhotoData>({
    mutationFn: async (payload: RemovePhotoData) => {
      return await remove<ApiResponse>(endpoints.photos.remove(payload.photoId));
    },

    onSuccess: (response, variables) => {
      showSuccess(response.message || `Фото ${variables.photoId} видалено!`);

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

export default useRemovePhoto;
