import { act, renderHook } from '@testing-library/react';
import axios from 'axios';

import { getCloudinaryErrorMessage } from '@/utils';

import useCloudinaryUpload from './';

jest.mock('@/config', () => ({
  cloudinaryConfig: {
    cloudName: 'test-cloud',
    uploadPreset: 'test-preset',
  },
  contactInfo: [],
}));

jest.mock('axios');
jest.mock('@/utils', () => ({
  getCloudinaryErrorMessage: jest.fn(),
}));

describe('useCloudinaryUpload', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const mockedGetCloudinaryErrorMessage = getCloudinaryErrorMessage as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should upload a single file successfully', async () => {
    const mockFile = new File(['dummy'], 'test.jpg', { type: 'image/jpeg' });
    const mockResponse = {
      data: {
        secure_url: 'https://res.cloudinary.com/test/image/upload/v1/test.jpg',
        public_id: 'test-public-id',
      },
    };
    mockedAxios.post.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCloudinaryUpload());

    let uploaded;
    await act(async () => {
      uploaded = await result.current.uploadMultiple([mockFile]);
    });

    expect(uploaded).toEqual([
      { url: mockResponse.data.secure_url, publicId: mockResponse.data.public_id },
    ]);
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      'https://api.cloudinary.com/v1_1/test-cloud/image/upload',
      expect.any(FormData),
      expect.objectContaining({ timeout: 120000 }),
    );
  });

  it('should upload multiple files successfully', async () => {
    const files = [new File(['dummy1'], 'img1.jpg'), new File(['dummy2'], 'img2.jpg')];
    const mockResponses = [
      { data: { secure_url: 'url1', public_id: 'id1' } },
      { data: { secure_url: 'url2', public_id: 'id2' } },
    ];
    mockedAxios.post
      .mockResolvedValueOnce(mockResponses[0])
      .mockResolvedValueOnce(mockResponses[1]);

    const { result } = renderHook(() => useCloudinaryUpload());

    let uploaded;
    await act(async () => {
      uploaded = await result.current.uploadMultiple(files);
    });

    expect(uploaded).toEqual([
      { url: 'url1', publicId: 'id1' },
      { url: 'url2', publicId: 'id2' },
    ]);
    expect(mockedAxios.post).toHaveBeenCalledTimes(2);
  });

  it('should throw an aggregated error when some uploads fail', async () => {
    const files = [
      new File(['dummy1'], 'img1.jpg'),
      new File(['dummy2'], 'img2.jpg'),
      new File(['dummy3'], 'img3.jpg'),
    ];
    const error1 = new Error('Network error');
    const error2 = new Error('Invalid format');
    mockedGetCloudinaryErrorMessage
      .mockImplementationOnce(() => error1.message)
      .mockImplementationOnce(() => error2.message);
    mockedAxios.post
      .mockRejectedValueOnce(error1)
      .mockRejectedValueOnce(error2)
      .mockResolvedValueOnce({ data: { secure_url: 'url3', public_id: 'id3' } });

    const { result } = renderHook(() => useCloudinaryUpload());

    await expect(result.current.uploadMultiple(files)).rejects.toThrow(
      'Не вдалося завантажити 2 файл(ів): Network error, Invalid format',
    );
  });

  it('should use getCloudinaryErrorMessage to format upload errors', async () => {
    const file = new File(['dummy'], 'test.jpg');
    const error = new Error('Some axios error');
    mockedAxios.post.mockRejectedValue(error);
    mockedGetCloudinaryErrorMessage.mockReturnValue('Formatted error');

    const { result } = renderHook(() => useCloudinaryUpload());

    await expect(result.current.uploadMultiple([file])).rejects.toThrow('Formatted error');
    expect(mockedGetCloudinaryErrorMessage).toHaveBeenCalledWith(error, file.name);
  });
});
