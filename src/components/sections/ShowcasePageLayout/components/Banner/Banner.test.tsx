import { render, screen } from '@testing-library/react';

import { fadeIn } from '@/lib';

import Banner from './';

jest.mock('@/components/ui/BannerWrapper', () => {
  const { MockBannerWrapper } = jest.requireActual('tests/mocks');

  return {
    __esModule: true,
    default: MockBannerWrapper,
  };
});

jest.mock('@/components/ui/GoBackButton', () => {
  const { MockGoBackButton } = jest.requireActual('tests/mocks');

  return {
    __esModule: true,
    default: MockGoBackButton,
  };
});

jest.mock('@/hooks', () => ({
  useWindowSize: jest.fn(),
}));

jest.mock('framer-motion', () => {
  const { createMotionComponent } = jest.requireActual('tests/mocks');

  return {
    motion: {
      div: createMotionComponent('div'),
    },
  };
});

jest.mock('@/lib', () => {
  const { createMockVariants } = jest.requireActual('tests/mocks');
  const mockVariants = createMockVariants();

  return {
    fadeIn: mockVariants,
    staggerContainer: jest.fn().mockReturnValue({}),
  };
});

jest.mock('@/config', () => ({
  allPhotoCategories: [],
}));

describe('Banner', () => {
  const defaultProps = {
    bannerPhoto: 'photo.jpg',
    bannerPhotoMobile: 'mobile.jpg',
    imageClassName: 'custom-img',
    bannerContent: <div data-testid="banner-content">Content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders BannerWrapper with correct props', () => {
    render(<Banner {...defaultProps} />);

    const BannerWrapperMock = jest.requireMock('@/components/ui/BannerWrapper').default;
    expect(BannerWrapperMock).toHaveBeenCalledTimes(1);

    const callArgs = BannerWrapperMock.mock.calls[0][0];
    expect(callArgs).toMatchObject({
      imageSrc: defaultProps.bannerPhoto,
      imageSrcMobile: defaultProps.bannerPhotoMobile,
      imageClassName: defaultProps.imageClassName,
      imageMotionProps: { variants: fadeIn },
      wrapperMotionProps: {
        initial: 'hidden',
        animate: 'visible',
        variants: expect.any(Object),
      },
    });
  });

  it('renders children content', () => {
    render(<Banner {...defaultProps} />);
    expect(screen.getByTestId('banner-content')).toBeInTheDocument();
  });

  it('renders go back button in a hidden-on-mobile wrapper', () => {
    render(<Banner {...defaultProps} />);

    const buttonWrapper = screen.getByTestId('go-back-button-wrapper');
    expect(buttonWrapper).toBeInTheDocument();
    expect(buttonWrapper).toHaveClass('hidden', 'lg:block');
    expect(screen.getByTestId('go-back-button')).toBeInTheDocument();
  });

  it('renders the content wrapper with correct classes', () => {
    render(<Banner {...defaultProps} />);

    const contentWrapper = screen.getByTestId('banner-content-wrapper');
    expect(contentWrapper).toBeInTheDocument();
    expect(contentWrapper).toHaveClass('mt-10', 'flex', 'flex-1', 'lg:mt-0');
  });
});
