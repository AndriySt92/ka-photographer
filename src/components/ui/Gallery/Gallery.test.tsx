import { fireEvent, render, screen } from '@testing-library/react';
import { motion, useInView } from 'framer-motion';

import type { PhotoItem } from '@/types';

import Gallery from './';

jest.mock('../FancyboxAnchor', () => {
  const { MockFancyboxAnchor } = jest.requireActual('tests');

  return {
    __esModule: true,
    default: MockFancyboxAnchor,
  };
});

jest.mock('../FancyboxLayout', () => {
  const { MockFancyboxLayout } = jest.requireActual('tests');

  return {
    __esModule: true,
    default: MockFancyboxLayout,
  };
});

jest.mock('@/lib', () => {
  const { mockCn, createMockVariants } = jest.requireActual('tests');

  return {
    cn: mockCn,
    fadeInScale: createMockVariants(),
  };
});

jest.mock('framer-motion', () => {
  const { createMotionComponent } = jest.requireActual('tests');

  return {
    useInView: jest.fn(),
    motion: {
      div: createMotionComponent('div'),
    },
  };
});

jest.mock('@/utils', () => ({
  getCloudinaryUrl: jest.fn((publicId: string, width: number) => {
    return `https://cloudinary.test/${publicId}?width=${width}`;
  }),
  getCloudinarySrcSet: jest.fn(() => 'mock-srcset'),
}));

describe('Gallery', () => {
  const mockPhotos: PhotoItem[] = [
    { _id: '1', publicId: 'photo1.jpg', categories: [] },
    { _id: '2', publicId: 'photo2.jpg', categories: [] },
    { _id: '3', publicId: 'photo3.jpg', categories: [] },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useInView as jest.Mock).mockReturnValue(true);
  });

  describe('Gallery component', () => {
    it('returns null when photos is empty', () => {
      const { container } = render(<Gallery photos={[]} />);
      expect(container).toBeEmptyDOMElement();
    });

    it('returns null when photos is undefined', () => {
      const { container } = render(<Gallery photos={undefined as any} />);
      expect(container).toBeEmptyDOMElement();
    });

    it('renders FancyboxLayout and grid with correct number of items', () => {
      render(<Gallery photos={mockPhotos} />);

      expect(screen.getByTestId('fancybox-layout')).toBeInTheDocument();
      const grid = screen.getByTestId('gallery-grid');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
      const items = screen.getAllByTestId('gallery-item');
      expect(items).toHaveLength(3);
    });

    it('applies custom className to grid', () => {
      render(<Gallery photos={mockPhotos} className="custom-grid-class" />);

      const grid = screen.getByTestId('gallery-grid');
      expect(grid).toHaveClass('custom-grid-class');
    });

    it('passes itemClassName to each GalleryItem', () => {
      render(<Gallery photos={mockPhotos} itemClassName="custom-item" />);

      const items = screen.getAllByTestId('gallery-item');
      items.forEach((item) => {
        expect(item).toHaveClass('custom-item');
      });
    });
  });

  describe('GalleryItem', () => {
    const mockPublicId = 'https://example.com/photo.jpg';

    // Helper to render a single GalleryItem via Gallery with one photo
    const renderItem = (options?: { className?: string }) => {
      render(
        <Gallery
          photos={[{ _id: '1', publicId: mockPublicId, categories: [] }]}
          itemClassName={options?.className}
        />,
      );
    };

    it('renders loading skeleton initially', () => {
      renderItem();

      expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
      expect(screen.queryByTestId('error-state')).not.toBeInTheDocument();
      const img = screen.getByTestId('gallery-image');
      expect(img).toHaveClass('opacity-0');
    });

    it('shows image and hides loading-skeleton on load', () => {
      renderItem();

      const img = screen.getByTestId('gallery-image');
      fireEvent.load(img);
      expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument();
      expect(img).not.toHaveClass('opacity-0');
    });

    it('shows error state on image error', () => {
      renderItem();

      const img = screen.getByTestId('gallery-image');
      fireEvent.error(img);
      expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument();
      expect(screen.getByTestId('error-state')).toBeInTheDocument();
    });

    it('applies animation when in view', () => {
      (useInView as jest.Mock).mockReturnValue(true);
      renderItem();

      const motionDivMock = motion.div as unknown as jest.Mock;
      const call = motionDivMock.mock.calls.find(
        (c: any) => c[0]?.['data-testid'] === 'gallery-item',
      );
      expect(call[0].animate).toBe('visible');
    });

    it('starts hidden when not in view', () => {
      (useInView as jest.Mock).mockReturnValue(false);
      renderItem();

      const motionDivMock = motion.div as unknown as jest.Mock;
      const call = motionDivMock.mock.calls.find(
        (c: any) => c[0]?.['data-testid'] === 'gallery-item',
      );
      expect(call[0].animate).toBe('hidden');
    });

    it('passes optimized Cloudinary URL and gallery to FancyboxAnchor', () => {
      renderItem();

      const anchor = screen.getByTestId('fancybox-anchor');

      expect(anchor).toHaveAttribute('href', `https://cloudinary.test/${mockPublicId}?width=1920`);

      expect(anchor).toHaveAttribute('data-gallery', 'gallery');
    });

    it('applies custom className to item container', () => {
      renderItem({ className: 'custom-item-class' });

      const item = screen.getByTestId('gallery-item');
      expect(item).toHaveClass('custom-item-class');
    });
  });
});
