import { renderHook, waitFor } from '@testing-library/react';

import * as api from '@/api/clients';
import { endpoints } from '@/api/endpoints';

import useCurrentUser from './';

jest.mock('@/api/clients', () => ({
  get: jest.fn(),
}));

jest.mock('@/api/endpoints', () => {
  const { mockEndpoints, mockQueryKeys } = jest.requireActual('tests');

  return {
    endpoints: mockEndpoints,
    queryKeys: mockQueryKeys,
  };
});

describe('useCurrentUser', () => {
  const { queryClientWrapper } = jest.requireActual('tests');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches current user and returns data', async () => {
    const wrapper = queryClientWrapper();
    const mockUser = { id: 1, name: 'Admin', role: 'admin' };
    const mockResponse = { data: mockUser, message: 'OK' };
    (api.get as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCurrentUser(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(api.get).toHaveBeenCalledWith(endpoints.admin.current);
    expect(result.current.data).toEqual(mockUser);
  });

  it('returns null when no data', async () => {
    const wrapper = queryClientWrapper();
    const mockResponse = { data: null, message: 'Not found' };
    (api.get as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCurrentUser(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toBeNull();
  });
});
