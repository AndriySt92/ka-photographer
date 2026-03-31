import { act, renderHook } from '@testing-library/react';

import * as api from '@/api/clients';
import { endpoints, queryKeys } from '@/api/endpoints';
import { getErrorMessage } from '@/utils';

import useCloudinaryUpload from '../useCloudinaryUpload';
import useToast from '../useToast';

import useUploadPhotos from './';

jest.mock('../useCloudinaryUpload', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/config', () => ({
  contactInfo: [],
}));

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

describe('useUploadPhotos', () => {
  const { queryClientWrapper } = jest.requireActual('tests');
  const mockUploadMultiple = jest.fn();
  const mockShowSuccess = jest.fn();
  const mockShowError = jest.fn();
  const useCloudinaryUploadMock = useCloudinaryUpload as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    useCloudinaryUploadMock.mockReturnValue({
      uploadMultiple: mockUploadMultiple,
    });
    (useToast as jest.Mock).mockReturnValue({
      showSuccess: mockShowSuccess,
      showError: mockShowError,
    });
    (getErrorMessage as jest.Mock).mockImplementation((err) => err.message);
  });

  const wrapper = queryClientWrapper();

  it('uploads photos and invalidates queries on success', async () => {
    const categories = ['wedding', 'portrait'];
    const photoFiles = [new File([], 'test1.jpg'), new File([], 'test2.jpg')];
    const payload = { categories, photoFiles };
    const uploadedPhotos = [{ url: 'url1' }, { url: 'url2' }];
    const mockResponse = { message: 'Uploaded 2 photos' };

    mockUploadMultiple.mockResolvedValue(uploadedPhotos);
    (api.post as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useUploadPhotos(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(payload);
    });

    expect(mockUploadMultiple).toHaveBeenCalledWith(photoFiles);
    expect(api.post).toHaveBeenCalledWith(
      endpoints.photos.uploadPhotos,
      {
        categories,
        photos: uploadedPhotos,
      },
      { timeout: 300000 },
    );
    expect(mockShowSuccess).toHaveBeenCalledWith('Uploaded 2 photos');
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

  it('shows error on upload failure', async () => {
    const payload = { categories: [], photoFiles: [] };
    const error = new Error('Upload failed');
    mockUploadMultiple.mockRejectedValue(error);

    const { result } = renderHook(() => useUploadPhotos(), { wrapper });

    await act(async () => {
      await expect(result.current.mutateAsync(payload)).rejects.toThrow();
    });

    expect(mockShowError).toHaveBeenCalledWith('Upload failed');
  });
});
