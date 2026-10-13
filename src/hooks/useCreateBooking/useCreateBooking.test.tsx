import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';

import * as api from '@/api/clients';

import useToast from '../useToast';

import useCreateBooking from './';

jest.mock('@/api/clients', () => ({
  post: jest.fn(),
}));

jest.mock('@/utils', () => ({
  getErrorMessage: jest.fn((error: Error) => error.message),
}));

jest.mock('@/api/endpoints', () => ({
  endpoints: {
    booking: {
      create: '/bookings',
    },
  },
}));

jest.mock('@/config', () => ({
  contactInfo: [],
}));

jest.mock('../useToast');

const mockShowSuccess = jest.fn();
const mockShowError = jest.fn();
(useToast as jest.Mock).mockReturnValue({
  showSuccess: mockShowSuccess,
  showError: mockShowError,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useCreateBooking', () => {
  const bookingData = {
    name: 'Test',
    contact: '@test',
    sessionType: 'wedding',
    sessionDate: '',
    comment: '',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls post and shows success on successful response', async () => {
    const mockResponse = { message: 'Booking created' };
    (api.post as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCreateBooking(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(bookingData);
    });

    expect(api.post).toHaveBeenCalledWith('/bookings', bookingData);
    expect(mockShowSuccess).toHaveBeenCalledWith('Booking created');
  });

  it('shows error on failed request', async () => {
    const error = new Error('Network error');

    (api.post as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useCreateBooking(), { wrapper });

    await act(async () => {
      await expect(result.current.mutateAsync(bookingData)).rejects.toThrow('Network error');
    });

    expect(mockShowError).toHaveBeenCalledWith('Network error');
  });
});
