import { AxiosError } from 'axios';

import type { ApiResponse } from '@/types';

const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError<ApiResponse>;

    return axiosError.response?.data?.message || axiosError.message || 'Помилка сервера';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Невідома помилка';
};

export default getErrorMessage;
