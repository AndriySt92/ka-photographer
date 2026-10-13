import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';

import * as api from '@/api/clients';
import { endpoints } from '@/api/endpoints';

import useLogin from './';

jest.mock('@/api/clients', () => ({
  post: jest.fn(),
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

describe('useLogin', () => {
  const mockNavigate = jest.fn();
  const mockSetQueryData = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useQueryClient as jest.Mock).mockReturnValue({
      setQueryData: mockSetQueryData,
    });
  });

  const { queryClientWrapper } = jest.requireActual('tests');
  const wrapper = queryClientWrapper();

  it('calls login endpoint, sets cache, and navigates on success', async () => {
    const credentials = { email: 'admin@test.com', password: 'secret' };
    const mockAdmin = { id: 1, name: 'Admin', role: 'admin' };
    const mockResponse = { data: mockAdmin, message: 'Logged in' };
    (api.post as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(credentials);
    });

    expect(api.post).toHaveBeenCalledWith(endpoints.admin.login, credentials);
    expect(mockSetQueryData).toHaveBeenCalledWith(['admin', 'current'], mockResponse);
    expect(mockNavigate).toHaveBeenCalledWith('/admin-panel', { replace: true });
  });
});
