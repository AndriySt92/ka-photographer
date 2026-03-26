import { act, renderHook } from '@testing-library/react';

import * as api from '@/api/clients';
import { endpoints, queryKeys } from '@/api/endpoints';
import { getErrorMessage } from '@/utils';

import useToast from '../useToast';

import useRemovePhoto from './';

jest.mock('@/api/clients', () => ({
  remove: jest.fn(),
}));

jest.mock('@/config', () => ({
  contactInfo: [],
}));

jest.mock('@/api/endpoints', () => {
  const { mockEndpoints, mockQueryKeys } = jest.requireActual('tests');
  return {
    endpoints: mockEndpoints,
    queryKeys: mockQueryKeys,
  };
});

jest.mock('../useToast');

jest.mock('@/utils', () => ({
  getErrorMessage: jest.fn(),
}));

const mockInvalidateQueries = jest.fn();
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: jest.fn(() => ({
    invalidateQueries: mockInvalidateQueries,
  })),
}));

describe('useRemovePhoto', () => {
  const { queryClientWrapper } = jest.requireActual('tests');
  const mockShowSuccess = jest.fn();
  const mockShowError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({
      showSuccess: mockShowSuccess,
      showError: mockShowError,
    });
    (getErrorMessage as jest.Mock).mockImplementation((err) => err.message);
  });

  const wrapper = queryClientWrapper();

  it('calls remove API and invalidates queries on success', async () => {
    const photoId = '123';
    const categories = ['wedding', 'portrait'];
    const payload = { photoId, categories };
    const mockResponse = { message: 'Photo removed' };
    (api.remove as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useRemovePhoto(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(payload);
    });

    expect(api.remove).toHaveBeenCalledWith(endpoints.photos.remove(photoId));
    expect(mockShowSuccess).toHaveBeenCalledWith('Photo removed');
    expect(mockInvalidateQueries).toHaveBeenCalledTimes(categories.length + 1);
    categories.forEach((cat) => {
      expect(mockInvalidateQueries).toHaveBeenCalledWith({
        queryKey: queryKeys.photos.photos(cat),
      });
    });
    expect(mockInvalidateQueries).toHaveBeenCalledWith({
      queryKey: queryKeys.photos.photos('all'),
    });
  });

  it('shows error on failure', async () => {
    const payload = { photoId: '123', categories: [] };
    const error = new Error('Network error');
    (api.remove as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useRemovePhoto(), { wrapper });

    await act(async () => {
      await expect(result.current.mutateAsync(payload)).rejects.toThrow();
    });

    expect(mockShowError).toHaveBeenCalledWith('Network error');
  });
});
