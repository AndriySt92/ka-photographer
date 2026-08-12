import { render, screen } from '@testing-library/react';
import { motion } from 'framer-motion';

import HoverCircles from './';

jest.mock('framer-motion', () => {
  const { createMotionComponent } = jest.requireActual('tests');

  return {
    motion: {
      div: createMotionComponent('div'),
    },
  };
});

jest.mock('@/assets', () => ({
  logo: 'logo-mock.png',
}));

jest.mock('@/lib', () => {
  const { mockCn, createMockVariants } = jest.requireActual('tests');
  const mockVariant = createMockVariants();

  return {
    cn: mockCn,
    circleVariants: mockVariant,
    staggerContainer: jest.fn().mockReturnValue(mockVariant),
  };
});

describe('HoverCircles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders container with default classes', () => {
    render(<HoverCircles />);
    const container = screen.getByTestId('hover-circles-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(
      'pointer-events-none',
      'absolute',
      'inset-0',
      'z-0',
      'h-full',
      'w-full',
    );
  });

  it('applies custom className', () => {
    render(<HoverCircles className="my-custom-class" />);
    const container = screen.getByTestId('hover-circles-container');
    expect(container).toHaveClass('my-custom-class');
  });

  it('renders all three circles with correct testids', () => {
    render(<HoverCircles />);
    expect(screen.getByTestId('hover-circle-outer')).toBeInTheDocument();
    expect(screen.getByTestId('hover-circle-middle')).toBeInTheDocument();
    expect(screen.getByTestId('hover-circle-inner')).toBeInTheDocument();
  });

  it('passes custom values to circle variants', () => {
    render(<HoverCircles />);
    const motionDivMock = motion.div as unknown as jest.Mock;
    const calls = motionDivMock.mock.calls;

    // Find calls by testid
    const outerCall = calls.find((c) => c[0]?.['data-testid'] === 'hover-circle-outer');
    const middleCall = calls.find((c) => c[0]?.['data-testid'] === 'hover-circle-middle');
    const innerCall = calls.find((c) => c[0]?.['data-testid'] === 'hover-circle-inner');

    expect(outerCall[0].custom).toBe(5);
    expect(middleCall[0].custom).toBe(4);
    expect(innerCall[0].custom).toBe(1);
  });

  it('does not render logo when withLogo is false (default)', () => {
    render(<HoverCircles />);
    expect(screen.queryByTestId('hover-logo')).not.toBeInTheDocument();
  });

  it('renders logo inside inner circle when withLogo is true', () => {
    render(<HoverCircles withLogo={true} />);
    const logoImg = screen.getByTestId('hover-logo');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', 'logo-mock.png');
    expect(logoImg).toHaveAttribute('alt', 'logo');
    // Ensure it's inside the inner circle
    const innerCircle = screen.getByTestId('hover-circle-inner');
    expect(innerCircle).toContainElement(logoImg);
  });

  it('passes correct animation props to the main motion.div', () => {
    render(<HoverCircles />);
    const motionDivMock = motion.div as unknown as jest.Mock;
    // Find the main container motion.div (the one with initial/whileInView)
    const mainCall = motionDivMock.mock.calls.find(
      (c) => c[0]?.['initial'] === 'hidden' && c[0]?.['whileInView'] === 'visible',
    );
    expect(mainCall).toBeDefined();
    expect(mainCall[0].viewport).toEqual({ once: true, amount: 0.2 });
  });
});
