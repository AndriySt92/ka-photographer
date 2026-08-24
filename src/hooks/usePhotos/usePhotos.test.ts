import { act, renderHook, waitFor } from '@testing-library/react';

import * as api from '@/api/clients';
import { endpoints } from '@/api/endpoints';

import usePhotos from './';

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

describe('usePhotos', () => {
  const { queryClientWrapper } = jest.requireActual('tests');
  const category = 'wedding';
  const defaultParams = { category, limit: 6 };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches photos and returns flattened data', async () => {
    const wrapper = queryClientWrapper();
    const mockPage1 = {
      data: [{ _id: '1', publicId: 'url1' }],
      pagination: { hasNextPage: true, currentPage: 1, totalPages: 2 },
    };
    const mockPage2 = {
      data: [{ _id: '2', publicId: 'url2' }],
      pagination: { hasNextPage: false, currentPage: 2, totalPages: 2 },
    };
    (api.get as jest.Mock).mockResolvedValueOnce(mockPage1).mockResolvedValueOnce(mockPage2);

    const { result } = renderHook(() => usePhotos(defaultParams), { wrapper });

    // Wait for first page
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([mockPage1.data[0]]);
    expect(api.get).toHaveBeenCalledWith(endpoints.photos.photos({ category, page: 1, limit: 6 }));

    // Fetch next page
    await act(async () => {
      await result.current.fetchNextPage();
    });

    // Wait for data to include second page
    await waitFor(() => expect(result.current.data).toHaveLength(2));
    expect(result.current.data).toEqual([mockPage1.data[0], mockPage2.data[0]]);
    expect(api.get).toHaveBeenCalledWith(endpoints.photos.photos({ category, page: 2, limit: 6 }));
  });

  it('handles empty response', async () => {
    const wrapper = queryClientWrapper();
    const mockResponse = {
      data: [],
      pagination: { hasNextPage: false, currentPage: 1, totalPages: 1 },
    };
    (api.get as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => usePhotos(defaultParams), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([]);
  });

  it('stops fetching when hasNextPage is false', async () => {
    const wrapper = queryClientWrapper();
    const mockResponse = {
      data: [],
      pagination: { hasNextPage: false, currentPage: 1, totalPages: 1 },
    };
    (api.get as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => usePhotos(defaultParams), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.hasNextPage).toBe(false);
  });
});
