import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { get } from '@/api/clients';
import { endpoints, queryKeys } from '@/api/endpoints';
import type { Admin, ApiResponse } from '@/types';

const useCurrentUser = () => {
  return useQuery<ApiResponse<Admin>, AxiosError, Admin>({
    queryKey: queryKeys.admin.current,
    queryFn: () => get<ApiResponse<Admin>>(endpoints.admin.current),
    select: (data) => {
      if (!data.data) {
        throw new Error('User data not found');
      }
      return data.data;
    },
    retry: (failureCount, error) => {
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
    staleTime: Infinity,
    gcTime: 10 * 60 * 1000,
  });
};

export default useCurrentUser;
