import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useCurrentUser, useModal, usePhotos, useRemovePhoto, useUploadPhotos } from '@/hooks';

import AdminPanel from './';

// Mock createPortal to avoid needing a real DOM container
jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (children: React.ReactNode) => children,
}));

// Mock URL methods to avoid warnings
window.URL.createObjectURL = jest.fn(() => 'mock-url');
window.URL.revokeObjectURL = jest.fn();

// Mock hooks
jest.mock('@/hooks', () => ({
  useCloudinaryUpload: jest.fn(),
  useFancybox: jest.fn(),
  useCurrentUser: jest.fn(),
  useUploadPhotos: jest.fn(),
  usePhotos: jest.fn(),
  useRemovePhoto: jest.fn(),
  useModal: jest.fn(),
  useInfiniteScroll: jest.fn(() => ({ triggerRef: { current: null } })),
  useEventListener: jest.fn(),
  useClickOutside: jest.fn(() => [false, jest.fn()]),
  useInViewport: jest.fn(() => true),
  useThrottle: jest.fn((fn) => fn),
}));

jest.mock('@/utils', () => ({
  getCloudinaryUrl: jest.fn((publicId: string, width: number) => {
    return `https://cloudinary.test/${publicId}?width=${width}`;
  }),
  getCloudinarySrcSet: jest.fn(() => 'mock-srcset'),
}));

jest.mock('@/config', () => ({
  contactInfo: [],
  navigation: [],
  socialMediaPlatforms: [],
  allPhotoCategories: [
    { value: 'wedding', label: 'Весілля' },
    { value: 'portrait', label: 'Портрет' },
    { value: 'gallery', label: 'Галерея' },
  ],
  uploadCategories: [
    { value: 'wedding', label: 'Весілля' },
    { value: 'portrait', label: 'Портрет' },
    { value: 'gallery', label: 'Галерея' },
  ],
}));

const mockUploadPhotos = useUploadPhotos as jest.Mock;
const mockUsePhotos = usePhotos as jest.Mock;
const mockUseRemovePhoto = useRemovePhoto as jest.Mock;
const mockUseCurrentUser = useCurrentUser as jest.Mock;
const mockUseModal = useModal as jest.Mock;

const scrollIntoViewMock = jest.fn();
window.HTMLDivElement.prototype.scrollIntoView = scrollIntoViewMock;

describe('AdminPanel Integration', () => {
  const defaultUploadMutate = jest.fn().mockResolvedValue(undefined);
  const defaultPhotosData = {
    data: [],
    fetchNextPage: jest.fn(),
    hasNextPage: false,
    isFetchingNextPage: false,
    isFetching: false,
    isSuccess: true,
    isError: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseCurrentUser.mockReturnValue({ data: { role: 'admin' } });
    mockUploadPhotos.mockReturnValue({
      mutateAsync: defaultUploadMutate,
      isPending: false,
    });
    mockUsePhotos.mockReturnValue(defaultPhotosData);
    mockUseRemovePhoto.mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue(undefined),
      isPending: false,
    });
    mockUseModal.mockReturnValue({
      isOpenModal: false,
      closeModal: jest.fn(),
      openModal: jest.fn(),
    });
  });

  it('uploads photos and updates gallery category', async () => {
    const user = userEvent.setup();
    render(<AdminPanel />);

    const fileInput = screen.getByTestId('file-input');
    expect(fileInput).toBeInTheDocument();

    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    await user.upload(fileInput, file);

    const select = await screen.findByRole('combobox', { name: /тип сесії/i });
    expect(select).toBeInTheDocument();

    const nativeSelect = screen.getByRole('combobox', { name: /тип сесії/i }) as HTMLSelectElement;
    // Change its value directly
    fireEvent.change(nativeSelect, { target: { value: 'gallery' } });

    const uploadButton = screen.getByRole('button', { name: /завантажити \d+ фото/i });
    await user.click(uploadButton);

    const uploadHook = mockUploadPhotos.mock.results[0].value;
    expect(uploadHook.mutateAsync).toHaveBeenCalledTimes(1);
    const callArgs = uploadHook.mutateAsync.mock.calls[0][0];
    expect(callArgs.photoFiles).toEqual([file]);
    expect(callArgs.categories).toEqual(['gallery']);

    await waitFor(() => {
      expect(mockUsePhotos).toHaveBeenCalledWith(expect.objectContaining({ category: 'gallery' }));
    });

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });

    await waitFor(() => {
      expect(screen.queryByRole('combobox', { name: /тип сесії/i })).not.toBeInTheDocument();
    });
  });

  it('uploads photos to both selected category and gallery when "add to gallery" is enabled', async () => {
    const user = userEvent.setup();

    render(<AdminPanel />);

    const fileInput = screen.getByTestId('file-input');

    const file = new File(['dummy content'], 'test.png', {
      type: 'image/png',
    });

    await user.upload(fileInput, file);

    const select = await screen.findByRole('combobox', {
      name: /тип сесії/i,
    });

    await user.selectOptions(select, 'wedding');

    const checkbox = screen.getByRole('checkbox', {
      name: /добавити до галереї/i,
    });

    await user.click(checkbox);

    const uploadButton = screen.getByRole('button', {
      name: /завантажити 1 фото/i,
    });

    await user.click(uploadButton);

    const uploadHook = mockUploadPhotos.mock.results[0].value;

    expect(uploadHook.mutateAsync).toHaveBeenCalledWith({
      photoFiles: [file],
      categories: ['wedding', 'gallery'],
    });
  });
  it('uploads multiple selected photos', async () => {
    const user = userEvent.setup();

    render(<AdminPanel />);

    const fileInput = screen.getByTestId('file-input');

    const files = [
      new File(['one'], 'one.png', { type: 'image/png' }),
      new File(['two'], 'two.png', { type: 'image/png' }),
      new File(['three'], 'three.png', { type: 'image/png' }),
    ];

    await user.upload(fileInput, files);

    const uploadButton = screen.getByRole('button', {
      name: /завантажити 3 фото/i,
    });

    await user.click(uploadButton);

    const uploadHook = mockUploadPhotos.mock.results[0].value;

    expect(uploadHook.mutateAsync).toHaveBeenCalledWith({
      photoFiles: files,
      categories: ['wedding'],
    });
  });
});
