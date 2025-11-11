import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { get } from '@/api/clients';
import { endpoints, queryKeys } from '@/api/endpoints';
import type { Admin, ApiResponse } from '@/types';

const useCurrentUser = () => {
  return useQuery<ApiResponse<Admin>, AxiosError, Admin | null>({
    queryKey: queryKeys.admin.current,
    queryFn: () => get<ApiResponse<Admin>>(endpoints.admin.current),
    select: (data) => data?.data ?? null,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export default useCurrentUser;
