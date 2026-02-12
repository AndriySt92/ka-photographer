import { render, screen } from '@testing-library/react';
import { AxiosError } from 'axios';

import { useInfiniteScroll, usePhotos } from '@/hooks';
import type { PhotoItem } from '@/types';

import ShowcasePageLayout, { type ShowcasePageLayoutProps } from './index';

// Mock all external hooks and components
jest.mock('@/hooks', () => ({
  usePhotos: jest.fn(),
  useInfiniteScroll: jest.fn(),
}));

jest.mock('@/components/ui', () => ({
  ErrorMessage: jest.fn(({ error, className }) => (
    <div data-testid="error-message" className={className}>
      Error: {error}
    </div>
  )),
  Loader: jest.fn(() => <div data-testid="loader">Loading...</div>),
  Typography: jest.fn(({ children, size, align }) => (
    <div data-testid="typography" data-size={size} data-align={align}>
      {children}
    </div>
  )),
}));

jest.mock('./components', () => ({
  Banner: jest.fn(({ bannerPhoto, bannerPhotoMobile, imageClassName, bannerContent }) => (
    <div data-testid="banner">
      <span>Banner Photo: {bannerPhoto}</span>
      {bannerPhotoMobile && <span>Mobile: {bannerPhotoMobile}</span>}
      {imageClassName && <span>Class: {imageClassName}</span>}
      <div>Content: {bannerContent}</div>
    </div>
  )),
  DescriptionSection: jest.fn(({ description, title }) => (
    <div data-testid="description-section">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )),
  GallerySection: jest.fn(({ photos }) => (
    <div data-testid="gallery-section">Photos: {photos.length}</div>
  )),
}));

type UsePhotosReturn = ReturnType<typeof usePhotos>;

const createMockPhotosReturn = (overrides: Partial<UsePhotosReturn> = {}) =>
  ({
    data: [],
    fetchNextPage: jest.fn(),
    hasNextPage: false,
    isFetchingNextPage: false,
    isFetching: false,
    isSuccess: false,
    isError: false,
    error: null,
    ...overrides,
  }) as UsePhotosReturn;

const mockUsePhotos = usePhotos as jest.MockedFunction<typeof usePhotos>;
const mockUseInfiniteScroll = useInfiniteScroll as jest.MockedFunction<typeof useInfiniteScroll>;

describe('ShowcasePageLayout', () => {
  const defaultProps: ShowcasePageLayoutProps = {
    category: 'individual',
    children: <div data-testid="child-content">Banner Child</div>,
    bannerProps: {
      bannerPhoto: 'photo.jpg',
      bannerPhotoMobile: 'mobile.jpg',
      imageClassName: 'banner-img',
    },
    descriptionProps: {
      title: 'Test Title',
      description: 'Test Description',
    },
    motionKey: 'page-1',
    className: 'custom-class',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePhotos.mockReturnValue(createMockPhotosReturn());
    mockUseInfiniteScroll.mockReturnValue({
      triggerRef: { current: null },
    } as any);
  });

  it('renders the component with all props correctly', () => {
    render(<ShowcasePageLayout {...defaultProps} />);

    // Motion div should have the key and className
    const rootDiv = screen.getByTestId('showcase-layout');
    expect(rootDiv).toHaveClass('custom-class');

    // Check Banner props
    expect(screen.getByTestId('banner')).toBeInTheDocument();
    expect(screen.getByText(/Banner Photo: photo.jpg/)).toBeInTheDocument();
    expect(screen.getByText(/Mobile: mobile.jpg/)).toBeInTheDocument();
    expect(screen.getByText(/Class: banner-img/)).toBeInTheDocument();
    expect(screen.getByTestId('child-content')).toBeInTheDocument();

    // Check DescriptionSection
    expect(screen.getByTestId('description-section')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('shows loader when fetching initial data', () => {
    mockUsePhotos.mockReturnValue(createMockPhotosReturn({ isFetching: true }));

    render(<ShowcasePageLayout {...defaultProps} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('does not show loader when only fetching next page (isFetchingNextPage) because loader is shown only if both isFetching and isFetchingNextPage are true', () => {
    // The component shows Loader when isFetching && isFetchingNextPage.
    mockUsePhotos.mockReturnValue(
      createMockPhotosReturn({
        hasNextPage: true,
        isFetchingNextPage: true,
      }),
    );

    render(<ShowcasePageLayout {...defaultProps} />);
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('shows loader when isFetching and isSuccess are true (during next page fetch)', () => {
    mockUsePhotos.mockReturnValue(
      createMockPhotosReturn({
        data: [{ _id: '1' } as PhotoItem],
        fetchNextPage: jest.fn(),
        hasNextPage: true,
        isFetching: true,
        isSuccess: true,
      }),
    );

    render(<ShowcasePageLayout {...defaultProps} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays error message when isError is true', () => {
    const errorMessage = 'Network error';
    const mockAxiosError = new AxiosError(errorMessage);

    mockUsePhotos.mockReturnValue(
      createMockPhotosReturn({
        isError: true,
        error: mockAxiosError,
      }),
    );

    render(<ShowcasePageLayout {...defaultProps} />);
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('renders GallerySection when isSuccess and photos.length > 0', () => {
    const photos = [
      { _id: '1', photoUrl: 'photo1.jpg' },
      { _id: '2', photoUrl: 'photo2.jpg' },
    ];

    mockUsePhotos.mockReturnValue(
      createMockPhotosReturn({
        data: photos as PhotoItem[],
        isSuccess: true,
      }),
    );

    render(<ShowcasePageLayout {...defaultProps} />);
    expect(screen.getByTestId('gallery-section')).toBeInTheDocument();
    expect(screen.getByText('Photos: 2')).toBeInTheDocument();
  });

  it('renders "no photos" message when isSuccess and photos array is empty', () => {
    mockUsePhotos.mockReturnValue(
      createMockPhotosReturn({
        isSuccess: true,
      }),
    );

    render(<ShowcasePageLayout {...defaultProps} />);
    expect(screen.getByTestId('typography')).toHaveTextContent(
      'Немає фотографій для відображення!',
    );
  });

  it('renders a trigger div for infinite scroll when hasNextPage is true', () => {
    mockUsePhotos.mockReturnValue(
      createMockPhotosReturn({
        data: [{ _id: '1' } as PhotoItem],
        hasNextPage: true,
        isSuccess: true,
      }),
    );

    // Mock useInfiniteScroll to provide a ref
    const triggerRef = { current: document.createElement('div') };
    mockUseInfiniteScroll.mockReturnValue({ triggerRef } as any);

    render(<ShowcasePageLayout {...defaultProps} />);
    const triggerDiv = screen.getByText(
      (_, element) => element?.tagName === 'DIV' && element.className === 'h-2',
    );
    expect(triggerDiv).toBeInTheDocument();
  });

  it('does not render trigger div when hasNextPage is false', () => {
    mockUsePhotos.mockReturnValue(
      createMockPhotosReturn({
        data: [{ _id: '1' } as PhotoItem],
        isSuccess: true,
      }),
    );

    render(<ShowcasePageLayout {...defaultProps} />);
    const triggerDiv = screen.queryByText(
      (_, element) => element?.tagName === 'DIV' && element.className === 'h-2',
    );
    expect(triggerDiv).not.toBeInTheDocument();
  });

  it('calls useInfiniteScroll with correct parameters', () => {
    const fetchNextPage = jest.fn();
    const hasNextPage = true;
    const isFetchingNextPage = false;

    mockUsePhotos.mockReturnValue(
      createMockPhotosReturn({
        data: [{ _id: '1' } as PhotoItem],
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isSuccess: true,
      }),
    );

    render(<ShowcasePageLayout {...defaultProps} />);

    expect(mockUseInfiniteScroll).toHaveBeenCalledWith({
      hasNextPage,
      isFetchingNextPage,
      fetchNextPage,
    });
  });

  it('passes the category prop correctly to usePhotos', () => {
    render(<ShowcasePageLayout {...defaultProps} />);
    expect(mockUsePhotos).toHaveBeenCalledWith({ category: 'individual' });
  });

  it('renders children correctly inside Banner', () => {
    render(<ShowcasePageLayout {...defaultProps} />);
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });
});
