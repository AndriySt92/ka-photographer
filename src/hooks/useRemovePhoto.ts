import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { remove } from '@/api/clients';
import { endpoints, queryKeys } from '@/api/endpoints';
import type { ApiResponse } from '@/types';
import { getErrorMessage } from '@/utils';

interface RemovePhotoData {
  categories: string[];
  photoId: string;
}

const useRemovePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError, RemovePhotoData>({
    mutationFn: async (payload: RemovePhotoData) => {
      return await remove<ApiResponse>(endpoints.photos.remove(payload.photoId));
    },

    onSuccess: (response, variables) => {
      toast.success(response.message || `Фото ${variables.photoId} видалено!`);

      variables.categories.forEach((category) => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.photos.photos(category),
        });
      });
    },

    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });
};

export default useRemovePhoto;
