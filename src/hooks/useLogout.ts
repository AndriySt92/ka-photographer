import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { remove } from '@/api/clients';
import { endpoints, queryKeys } from '@/api/endpoints';
import type { Admin, ApiResponse } from '@/types';
import { getErrorMessage } from '@/utils';

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<ApiResponse, Error>({
    mutationFn: async () => {
      return await remove<ApiResponse>(endpoints.admin.logout);
    },

    onSuccess: () => {
      queryClient.setQueryData<Admin | null>(queryKeys.admin.current, null);
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.current });

      navigate('/', { replace: true });
    },

    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });
};

export default useLogout;
