import { render, screen, within } from '@testing-library/react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { useWindowSize } from '@/hooks';

import BannerWrapper from './';

jest.mock('@/hooks', () => ({
  useWindowSize: jest.fn(),
}));

jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: jest
        .fn()
        .mockImplementation(({ children, ...props }) => <div {...props}>{children}</div>),
      img: jest.fn().mockImplementation((props) => <img {...props} />),
    },
    useScroll: jest.fn(),
    useTransform: jest.fn(),
  };
});

describe('BannerWrapper', () => {
  const mockUseWindowSize = useWindowSize as jest.Mock;
  const mockUseScroll = useScroll as jest.Mock;
  const mockUseTransform = useTransform as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseWindowSize.mockReturnValue({ width: 1024 }); // desktop by default
    mockUseScroll.mockReturnValue({
      scrollYProgress: { get: () => 0.5 },
    });
    mockUseTransform.mockImplementation(() => '0%');
  });

  const defaultProps = {
    children: <div data-testid="child">Content</div>,
    imageSrc: '/desktop.jpg',
  };

  it('renders with minimal props', () => {
    render(<BannerWrapper {...defaultProps} />);

    expect(screen.getByTestId('banner-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('banner-image')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('applies custom class names', () => {
    const customClasses = {
      className: 'custom-wrapper',
      imageClassName: 'custom-image',
      overlayClassName: 'custom-overlay',
      contentClassName: 'custom-content',
    };
    render(<BannerWrapper {...defaultProps} {...customClasses} />);

    const wrapper = screen.getByTestId('banner-wrapper');
    const img = screen.getByTestId('banner-image');
    const overlayLayer = screen.getByTestId('overlay-layer');
    const contentWrapper = screen.getByTestId('content-wrapper');

    expect(overlayLayer).toHaveClass('custom-overlay');
    expect(wrapper).toHaveClass(customClasses.className);
    expect(img).toHaveClass(customClasses.imageClassName);
    expect(contentWrapper).toHaveClass(customClasses.contentClassName);
  });

  it('renders both image sources correctly', () => {
    const imageSrc = '/desktop.jpg';
    const imageSrcMobile = '/mobile.jpg';
    render(<BannerWrapper {...defaultProps} imageSrc={imageSrc} imageSrcMobile={imageSrcMobile} />);

    const picture = screen.getByTestId('banner-picture');
    expect(picture).toBeInTheDocument();

    const sourceDesktop = within(picture).getByTestId('source-desktop');
    const sourceMobile = within(picture).getByTestId('source-mobile');

    expect(sourceDesktop).toHaveAttribute('media', '(min-width: 640px)');
    expect(sourceDesktop).toHaveAttribute('srcset', imageSrc);
    expect(sourceMobile).toHaveAttribute('media', '(max-width: 639px)');
    expect(sourceMobile).toHaveAttribute('srcset', imageSrcMobile);

    const allSources = within(picture).queryAllByTestId(/^source-/);
    expect(allSources).toHaveLength(2);

    const img = screen.getByTestId('banner-image');
    expect(img).toHaveAttribute('src', imageSrcMobile);
  });

  it('handles mobile viewport correctly', () => {
    mockUseWindowSize.mockReturnValue({ width: 500 });

    render(<BannerWrapper {...defaultProps} />);

    expect(mockUseTransform).toHaveBeenNthCalledWith(1, expect.anything(), [0, 1], ['0%', '0%']);
    expect(mockUseTransform).toHaveBeenNthCalledWith(2, expect.anything(), [0, 0.9], [1, 1]);
  });

  it('handles desktop viewport correctly', () => {
    mockUseWindowSize.mockReturnValue({ width: 1024 });

    render(<BannerWrapper {...defaultProps} />);

    expect(mockUseTransform).toHaveBeenNthCalledWith(1, expect.anything(), [0, 1], ['0%', '60%']);
    expect(mockUseTransform).toHaveBeenNthCalledWith(2, expect.anything(), [0, 0.9], [1, 1.1]);
  });

  it('applies transformed values to image style', () => {
    mockUseTransform.mockReturnValueOnce('10%').mockReturnValueOnce(1.2);

    render(<BannerWrapper {...defaultProps} />);

    expect(motion.img).toHaveBeenCalled();

    const imgMock = motion.img as unknown as jest.Mock;
    const props = imgMock.mock.calls[0][0];
    expect(props.style).toEqual({ y: '10%', scale: 1.2 });
  });

  it('passes motionProps to wrapper and image', () => {
    const wrapperMotionProps = { initial: { opacity: 0 }, animate: { opacity: 1 } };
    const imageMotionProps = { whileHover: { scale: 1.1 } };
    render(
      <BannerWrapper
        {...defaultProps}
        wrapperMotionProps={wrapperMotionProps}
        imageMotionProps={imageMotionProps}
      />,
    );

    const divMock = motion.div as unknown as jest.Mock;
    const imgMock = motion.img as unknown as jest.Mock;

    expect(divMock).toHaveBeenCalled();
    const divProps = divMock.mock.calls[0][0];
    expect(divProps).toMatchObject(wrapperMotionProps);

    expect(imgMock).toHaveBeenCalled();
    const imgProps = imgMock.mock.calls[0][0];
    expect(imgProps).toMatchObject(imageMotionProps);
  });

  it('renders the gradient overlay', () => {
    render(<BannerWrapper {...defaultProps} />);

    const overlay = screen.getByTestId('gradient-overlay');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass('from-black/80', 'via-black/20', 'to-transparent');
  });
});
