import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { post } from '@/api/clients';
import { endpoints, queryKeys } from '@/api/endpoints';
import type { Admin, ApiResponse, LoginCredentials } from '@/types';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<ApiResponse<Admin>, Error, LoginCredentials>({
    mutationFn: async (payload) => {
      return await post<ApiResponse<Admin>, LoginCredentials>(endpoints.admin.login, payload);
    },

    onSuccess: (response) => {
      queryClient.setQueryData<ApiResponse<Admin> | null>(queryKeys.admin.current, response);
      navigate('/admin-panel', { replace: true });
    },
  });
};

export default useLogin;
