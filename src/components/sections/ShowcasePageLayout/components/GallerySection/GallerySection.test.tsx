import { render, screen } from '@testing-library/react';
import { motion, useInView } from 'framer-motion';

import GallerySection from './';

jest.mock('framer-motion', () => {
  const { createMotionComponent } = jest.requireActual('tests/mocks');

  return {
    motion: {
      div: createMotionComponent('div'),
    },
    useInView: jest.fn(),
  };
});

jest.mock('@/hooks', () => ({
  useCloudinaryUpload: jest.fn(),
  useFancybox: jest.fn(),
}));

jest.mock('@/config', () => ({
  navigation: [],
  contactInfo: [],
  socialMediaPlatforms: [],
  allPhotoCategories: [],
}));

jest.mock('@/components/ui', () => {
  const { MockGallery, MockTypography } = jest.requireActual('tests/mocks');

  return {
    Gallery: MockGallery,
    Typography: MockTypography,
  };
});

jest.mock('@/lib', () => {
  const { createMockVariants, MockCn } = jest.requireActual('tests/mocks');
  const mockVariants = createMockVariants();

  return {
    fadeInRight: mockVariants,
    cn: MockCn,
  };
});

describe('GallerySection', () => {
  const mockUseInView = useInView as jest.Mock;
  const mockPhotos = [
    { _id: '1', photoUrl: 'photo1.jpg', categories: [] },
    { _id: '2', photoUrl: 'photo2.jpg', categories: [] },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseInView.mockReturnValue(true);
  });

  const renderComponent = (props = { photos: mockPhotos }) => render(<GallerySection {...props} />);

  it('renders the title with correct props', () => {
    renderComponent();

    const title = screen.getByTestId('typography');
    expect(title).toHaveTextContent('приклади останніх зйомок');
    expect(title).toHaveAttribute('data-parent', 'h2');
    expect(title).toHaveAttribute('data-size', '6xl');
    expect(title).toHaveAttribute('data-animated', 'true');
    expect(title).toHaveAttribute('data-motionprops', 'present');
  });

  it('renders Gallery with correct photos', () => {
    renderComponent();

    const gallery = screen.getByTestId('gallery');
    expect(gallery).toHaveAttribute('data-photos-count', '2');
  });

  it('passes animation props to root motion.div', () => {
    renderComponent();

    const motionDivMock = motion.div as unknown as jest.Mock;
    expect(motionDivMock).toHaveBeenCalled();
    const lastCall = motionDivMock.mock.calls[motionDivMock.mock.calls.length - 1][0];
    expect(lastCall).toMatchObject({
      initial: 'hidden',
      animate: 'visible',
    });
  });

  it('sets animate to hidden when not in view', () => {
    mockUseInView.mockReturnValue(false);
    renderComponent();

    const motionDivMock = motion.div as unknown as jest.Mock;
    const lastCall = motionDivMock.mock.calls[motionDivMock.mock.calls.length - 1][0];
    expect(lastCall).toMatchObject({
      initial: 'hidden',
      animate: 'hidden',
    });
  });

  it('calls useInView with correct ref and options', () => {
    renderComponent();
    expect(mockUseInView).toHaveBeenCalledWith(expect.any(Object), { once: true, amount: 0.01 });
  });

  it('applies container classes to root element', () => {
    renderComponent();

    const root = screen.getByTestId('gallery-section');
    expect(root).toHaveClass('container', 'space-y-6', 'sm:space-y-8', 'xl:space-y-12');
  });
});
