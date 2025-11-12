import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { post } from '@/api/clients';
import { endpoints } from '@/api/endpoints';
import type { ApiResponse, BookingFormData } from '@/types';
import { getErrorMessage } from '@/utils';

export const useCreateBooking = () => {
  return useMutation<ApiResponse, AxiosError, BookingFormData>({
    mutationFn: async (bookingData: BookingFormData) => {
      return await post<ApiResponse, BookingFormData>(endpoints.booking.create, bookingData);
    },

    onSuccess: (response) => {
      toast.success(response.message);
    },

    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });
};

export default useCreateBooking;
