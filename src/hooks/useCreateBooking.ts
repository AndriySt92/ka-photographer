import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { post } from '@/api/clients';
import { endpoints } from '@/api/endpoints';
import type { ApiResponse, BookingFormData } from '@/types';
import { getErrorMessage } from '@/utils';

import useToast from './useToast';

export const useCreateBooking = () => {
  const { showSuccess, showError } = useToast();

  return useMutation<ApiResponse, AxiosError, BookingFormData>({
    mutationFn: async (bookingData: BookingFormData) => {
      return await post<ApiResponse, BookingFormData>(endpoints.booking.create, bookingData);
    },

    onSuccess: (response) => {
      showSuccess(response.message);
    },

    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      showError(errorMessage);
    },
  });
};

export default useCreateBooking;
