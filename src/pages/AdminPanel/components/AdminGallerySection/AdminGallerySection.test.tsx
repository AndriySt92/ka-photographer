import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AxiosError } from 'axios';

import { useCurrentUser, useInfiniteScroll, useModal, usePhotos, useRemovePhoto } from '@/hooks';
import type { CategoriesItem, PhotoItem } from '@/types';

import AdminGallerySection from './';

jest.mock('@/hooks', () => ({
  useCurrentUser: jest.fn(),
  useInfiniteScroll: jest.fn(),
  useModal: jest.fn(),
  usePhotos: jest.fn(),
  useRemovePhoto: jest.fn(),
}));

jest.mock('@/components', () => ({
  Button: jest.fn(({ children, onClick, isLoading, loadingText, size }) => (
    <button onClick={onClick} disabled={isLoading} data-testid="button" data-size={size}>
      {isLoading ? loadingText : children}
    </button>
  )),
  ErrorMessage: jest.fn(({ error, size, animationKey }) => (
    <div data-testid="error-message" data-size={size} data-animation={animationKey}>
      Error: {error}
    </div>
  )),
  GroupButtons: jest.fn(({ options, selectedOption, onChange, className }) => (
    <div data-testid="group-buttons" className={className}>
      {options.map((opt: { value: string; label: string }) => (
        <button
          key={opt.value}
          data-selected={opt.value === selectedOption}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )),
  Loader: jest.fn(() => <div data-testid="loader">Loading...</div>),
  Modal: jest.fn(({ isOpen, onClose, title, children }) =>
    isOpen ? (
      <div data-testid="modal" role="dialog">
        <h2>{title}</h2>
        <button data-testid="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    ) : null,
  ),
  Typography: jest.fn(({ children, parentAs, size, align, className }) => (
    <div data-testid="typography" data-size={size} data-align={align} className={className}>
      {parentAs === 'h1' ? <h1>{children}</h1> : children}
    </div>
  )),
}));

jest.mock('@/config', () => ({
  allPhotoCategories: [
    { value: 'individual', label: 'індивідуальна' },
    { value: 'group', label: 'групова' },
  ],
}));

jest.mock('./AdminGallery', () => ({
  __esModule: true,
  default: jest.fn(({ photos, onDelete, isAdmin }) => (
    <div data-testid="admin-gallery">
      <span>Photos: {photos.length}</span>
      <span>Is admin: {String(isAdmin)}</span>
      {photos.map((photo: any) => (
        <button key={photo._id} data-testid={`delete-${photo._id}`} onClick={() => onDelete(photo)}>
          Delete
        </button>
      ))}
    </div>
  )),
}));

// Mocked hooks
const mockUseCurrentUser = jest.mocked(useCurrentUser);
const mockUseInfiniteScroll = jest.mocked(useInfiniteScroll);
const mockUseModal = jest.mocked(useModal);
const mockUsePhotos = jest.mocked(usePhotos);
const mockUseRemovePhoto = jest.mocked(useRemovePhoto);

type UsePhotosReturn = ReturnType<typeof usePhotos>;

const createMockPhotosReturn = (overrides: Partial<UsePhotosReturn> = {}): UsePhotosReturn => {
  const status = overrides.isError ? 'error' : overrides.isSuccess ? 'success' : 'pending';
  return {
    data: [],
    fetchNextPage: jest.fn(),
    hasNextPage: false,
    isFetchingNextPage: false,
    isFetching: false,
    isSuccess: false,
    isError: false,
    error: null,
    status,
    ...overrides,
  } as UsePhotosReturn;
};

const createMockPhoto = (
  id = 'photo123',
  categories: string[] = ['individual'],
  overrides = {},
): PhotoItem => ({
  _id: id,
  photoUrl: 'a.jpg',
  categories,
  ...overrides,
});

describe('AdminGallerySection', () => {
  const defaultCategory = 'individual';
  const setCategory = jest.fn();
  const mockTriggerRef = { current: document.createElement('div') };

  const defaultProps = {
    category: defaultCategory as CategoriesItem['value'],
    setCategory,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseCurrentUser.mockReturnValue({ data: { role: 'admin' } } as any);
    mockUseInfiniteScroll.mockReturnValue({ triggerRef: mockTriggerRef } as any);
    mockUseModal.mockReturnValue({
      isOpenModal: false,
      closeModal: jest.fn(),
      openModal: jest.fn(),
    } as any);
    mockUsePhotos.mockReturnValue(createMockPhotosReturn());
    mockUseRemovePhoto.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    } as any);
  });

  // Rendering tests
  it('renders the component with all props correctly', () => {
    mockUsePhotos.mockReturnValue(createMockPhotosReturn({ isFetching: true }));
    render(<AdminGallerySection {...defaultProps} />);

    expect(screen.getByTestId('typography')).toHaveTextContent('Фотографії');
    expect(screen.getByTestId('group-buttons')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays gallery when photos are loaded successfully', () => {
    mockUsePhotos.mockReturnValue(
      createMockPhotosReturn({
        data: [createMockPhoto()],
        isSuccess: true,
      }),
    );

    render(<AdminGallerySection {...defaultProps} />);

    expect(screen.getByTestId('admin-gallery')).toBeInTheDocument();
    expect(screen.getByText('Photos: 1')).toBeInTheDocument();
    expect(screen.getByText('Is admin: true')).toBeInTheDocument();
  });

  it('displays empty state when no photos', () => {
    mockUsePhotos.mockReturnValue(
      createMockPhotosReturn({
        data: [],
        isSuccess: true,
      }),
    );

    render(<AdminGallerySection {...defaultProps} />);
    expect(screen.getByText('Немає фотографій для відображення!')).toBeInTheDocument();
  });

  it('displays error message on error', () => {
    const errorMessage = 'Failed to load';
    mockUsePhotos.mockReturnValue(
      createMockPhotosReturn({
        isError: true,
        error: new AxiosError(errorMessage),
      }),
    );

    render(<AdminGallerySection {...defaultProps} />);
    expect(screen.getByTestId('error-message')).toHaveTextContent(`Error: ${errorMessage}`);
  });

  it('shows infinite scroll trigger when hasNextPage is true', () => {
    mockUsePhotos.mockReturnValue(
      createMockPhotosReturn({
        data: [createMockPhoto('1')],
        hasNextPage: true,
        isSuccess: true,
      }),
    );

    render(<AdminGallerySection {...defaultProps} />);
    expect(screen.getByTestId('infinite-scroll-trigger')).toBeInTheDocument();
  });

  it('does not show infinite scroll trigger when hasNextPage is false', () => {
    mockUsePhotos.mockReturnValue(
      createMockPhotosReturn({
        data: [createMockPhoto('1')],
        isSuccess: true,
      }),
    );

    render(<AdminGallerySection {...defaultProps} />);
    expect(screen.queryByTestId('infinite-scroll-trigger')).not.toBeInTheDocument();
  });

  // User role tests
  it('passes isAdmin=false to AdminGallery when user is not admin', () => {
    mockUseCurrentUser.mockReturnValue({ data: { role: 'user' } } as any);
    mockUsePhotos.mockReturnValue(
      createMockPhotosReturn({
        data: [createMockPhoto()],
        isSuccess: true,
      }),
    );

    render(<AdminGallerySection {...defaultProps} />);
    expect(screen.getByText('Is admin: false')).toBeInTheDocument();
  });

  // Delete modal flow tests
  it('opens modal with photo details when delete button is clicked', async () => {
    const user = userEvent.setup();
    const openModal = jest.fn();
    mockUseModal.mockReturnValue({
      isOpenModal: false,
      closeModal: jest.fn(),
      openModal,
    } as any);

    mockUsePhotos.mockReturnValue(
      createMockPhotosReturn({
        data: [createMockPhoto('photo123')],
        isSuccess: true,
      }),
    );

    render(<AdminGallerySection {...defaultProps} />);
    const deleteBtn = screen.getByTestId('delete-photo123');
    await user.click(deleteBtn);

    expect(openModal).toHaveBeenCalled();
  });

  it('closes modal without deleting when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const closeModal = jest.fn();
    const mutateAsync = jest.fn();

    mockUseModal.mockReturnValue({
      isOpenModal: true,
      closeModal,
      openModal: jest.fn(),
    } as any);

    mockUseRemovePhoto.mockReturnValue({
      mutateAsync,
      isPending: false,
    } as any);

    mockUsePhotos.mockReturnValue(
      createMockPhotosReturn({
        data: [createMockPhoto('photo123')],
        isSuccess: true,
      }),
    );

    render(<AdminGallerySection {...defaultProps} />);

    const cancelBtn = screen.getByRole('button', { name: 'Закрити' });
    await user.click(cancelBtn);

    expect(mutateAsync).not.toHaveBeenCalled();
    expect(closeModal).toHaveBeenCalled();
  });

  // Hook parameter tests
  it('passes category prop to usePhotos', () => {
    render(<AdminGallerySection {...defaultProps} />);
    expect(mockUsePhotos).toHaveBeenCalledWith({ category: 'individual' });
  });

  it('calls useInfiniteScroll with correct parameters', () => {
    const fetchNextPage = jest.fn();
    mockUsePhotos.mockReturnValue(
      createMockPhotosReturn({
        fetchNextPage,
        isFetchingNextPage: false,
        hasNextPage: true,
      }),
    );

    render(<AdminGallerySection {...defaultProps} />);
    expect(mockUseInfiniteScroll).toHaveBeenCalledWith({
      hasNextPage: true,
      isFetchingNextPage: false,
      fetchNextPage,
    });
  });

  it('shows loading spinner when isFetching is true', () => {
    mockUsePhotos.mockReturnValue(
      createMockPhotosReturn({
        isFetching: true,
        isLoading: false, // initial loading is false, but still fetching
      }),
    );

    render(<AdminGallerySection {...defaultProps} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('does not show loader when not fetching', () => {
    mockUsePhotos.mockReturnValue(createMockPhotosReturn());

    render(<AdminGallerySection {...defaultProps} />);
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });
});
