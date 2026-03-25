import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';

import { remove } from '@/api/clients';

import useToast from '../useToast';

import useLogout from './';

jest.mock('@/api/clients', () => ({
  remove: jest.fn(),
}));

jest.mock('@/api/endpoints', () => {
  const { mockEndpoints, mockQueryKeys } = jest.requireActual('tests');
  return {
    endpoints: mockEndpoints,
    queryKeys: mockQueryKeys,
  };
});

jest.mock('@/config', () => ({
  contactInfo: [],
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: jest.fn(),
}));

jest.mock('../useToast');

describe('useLogout', () => {
  const mockNavigate = jest.fn();
  const mockSetQueryData = jest.fn();
  const mockInvalidateQueries = jest.fn();
  const mockShowError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useQueryClient as jest.Mock).mockReturnValue({
      setQueryData: mockSetQueryData,
      invalidateQueries: mockInvalidateQueries,
    });
    (useToast as jest.Mock).mockReturnValue({ showError: mockShowError });
  });

  const { queryClientWrapper } = jest.requireActual('tests');
  const wrapper = queryClientWrapper();

  it('calls logout endpoint, clears cache, and navigates on success', async () => {
    (remove as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useLogout(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync();
    });

    expect(remove).toHaveBeenCalledWith('/admin/logout');
    expect(mockSetQueryData).toHaveBeenCalledWith(['admin', 'current'], null);
    expect(mockInvalidateQueries).toHaveBeenCalledWith({ queryKey: ['admin', 'current'] });
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });

  it('shows error toast on failure', async () => {
    const error = new Error('Network error');
    (remove as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useLogout(), { wrapper });

    await act(async () => {
      await expect(result.current.mutateAsync()).rejects.toThrow();
    });

    expect(mockShowError).toHaveBeenCalledWith('Network error');
  });
});
