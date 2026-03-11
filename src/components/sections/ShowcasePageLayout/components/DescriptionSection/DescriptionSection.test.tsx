import { render, screen } from '@testing-library/react';
import { useInView } from 'framer-motion';

import DescriptionSection from './';

jest.mock('framer-motion', () => {
  const { createMotionComponent } = jest.requireActual('tests/mocks');

  return {
    motion: {
      div: createMotionComponent('div'),
    },
    useInView: jest.fn(),
  };
});

jest.mock('@/components/ui/BackgroundGradient', () => {
  const { MockBackgroundGradient } = jest.requireActual('tests/mocks');

  return {
    __esModule: true,
    default: MockBackgroundGradient,
  };
});

jest.mock('@/components/ui/Circles', () => {
  const { MockCircles } = jest.requireActual('tests/mocks');

  return {
    __esModule: true,
    default: MockCircles,
  };
});

jest.mock('@/components/ui/Typography', () => {
  const { MockTypography } = jest.requireActual('tests/mocks');

  return {
    __esModule: true,
    default: MockTypography,
  };
});

jest.mock('@/lib', () => {
  const { createMockVariants, mockStaggerContainer, mockCn } = jest.requireActual('tests/mocks');
  const mockVariants = createMockVariants();

  return {
    expandFadeIn: mockVariants,
    fadeInLeft: mockVariants,
    fadeInRight: mockVariants,
    staggerContainer: mockStaggerContainer,
    cn: mockCn,
  };
});

describe('DescriptionSection', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'Test description content.',
  };

  const mockUseInView = useInView as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseInView.mockReturnValue(true);
  });

  const renderComponent = (props = defaultProps) => render(<DescriptionSection {...props} />);

  it('renders title and description', () => {
    renderComponent();

    const typographyElements = screen.getAllByTestId('typography');
    expect(typographyElements[0]).toHaveTextContent('Test Title');
    expect(typographyElements[1]).toHaveTextContent('Test description content.');
  });

  it('passes correct props to Typography for title', () => {
    renderComponent();

    const typographyElements = screen.getAllByTestId('typography');
    const titleTypography = typographyElements[0];

    expect(titleTypography).toHaveAttribute('data-parent', 'h2');
    expect(titleTypography).toHaveAttribute('data-size', '6xl');
    expect(titleTypography).toHaveAttribute('data-animated', 'true');
    expect(titleTypography).toHaveAttribute('data-motionprops', 'present');
  });

  it('passes correct props to Typography for description', () => {
    renderComponent();

    const typographyElements = screen.getAllByTestId('typography');
    const descTypography = typographyElements[1];

    expect(descTypography).toHaveAttribute('data-parent', 'p');
    expect(descTypography).toHaveAttribute('data-size', '2xl');
    expect(descTypography).toHaveAttribute('data-animated', 'true');
    expect(descTypography).toHaveAttribute('data-motionprops', 'present');
  });

  it('renders BackgroundGradient with correct props', () => {
    renderComponent();

    const gradient = screen.getByTestId('background-gradient');
    expect(gradient).toBeInTheDocument();
    expect(gradient).toHaveAttribute('data-animated', 'true');
    expect(gradient).toHaveAttribute('data-motionprops', 'present');
    expect(gradient).toHaveClass('w-[100vw]');
    expect(gradient).toHaveClass('bg-gradient-to-l');
  });

  it('renders Circles with correct custom prop', () => {
    renderComponent();

    const circles = screen.getByTestId('circles');
    expect(circles).toBeInTheDocument();
    expect(circles).toHaveAttribute('data-custom', '10');
    expect(circles).toHaveClass('h-[200%]');
  });

  it('calls useInView with correct ref and options', () => {
    renderComponent();
    expect(mockUseInView).toHaveBeenCalledWith(expect.any(Object), { once: true, amount: 0.2 });
  });

  it('applies correct classes to the root element', () => {
    renderComponent();
    const root = screen.getByTestId('description-root');
    expect(root).toHaveClass('space-y-sm', 'container');
  });

  it('applies correct classes to the inner wrapper', () => {
    renderComponent();
    const gradientWrapper = screen.getByTestId('gradient-wrapper');
    expect(gradientWrapper).toHaveClass(
      'relative',
      'inset-0',
      'flex',
      'h-full',
      'items-center',
      'py-3',
      'xl:py-10',
      '2xl:py-12',
    );
  });
});
