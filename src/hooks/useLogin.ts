import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { post } from '@/api/clients';
import { endpoints, queryKeys } from '@/api/endpoints';
import type { ApiResponse, LoginCredentials } from '@/types';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<ApiResponse, Error, LoginCredentials>({
    mutationFn: async (payload) => {
      return await post<ApiResponse, LoginCredentials>(endpoints.admin.login, payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.current });
      navigate('/admin-panel', { replace: true });
    },
  });
};

export default useLogin;
