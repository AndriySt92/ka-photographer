import { render, screen } from '@testing-library/react';
import { motion } from 'framer-motion';

import Loader from './';

jest.mock('framer-motion', () => {
  const { createMotionComponent } = jest.requireActual('tests');

  return {
    motion: {
      div: createMotionComponent('div'),
      span: createMotionComponent('span'),
    },
  };
});

jest.mock('@/lib', () => {
  const { mockCn } = jest.requireActual('tests');
  return { cn: mockCn };
});

describe('Loader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without fullScreen by default', () => {
    render(<Loader />);
    const loader = screen.getByTestId('loader');

    expect(loader).toBeInTheDocument();
    expect(loader).not.toHaveClass('min-h-screen');
    expect(loader).toHaveClass('flex', 'items-center', 'justify-center');
  });

  it('applies fullScreen class when fullScreen is true', () => {
    render(<Loader fullScreen={true} />);

    const loader = screen.getByTestId('loader');
    expect(loader).toHaveClass('min-h-screen');
  });

  it('applies custom className', () => {
    render(<Loader className="my-custom-class" />);

    const loader = screen.getByTestId('loader');
    expect(loader).toHaveClass('my-custom-class');
  });

  it('renders three dots', () => {
    render(<Loader />);

    const dots = screen.getAllByTestId('loader-dot');
    expect(dots).toHaveLength(3);
  });

  it('has correct accessibility attributes', () => {
    render(<Loader />);

    const statusDiv = screen.getByRole('status');
    expect(statusDiv).toBeInTheDocument();
    expect(statusDiv).toHaveAttribute('aria-label', 'loading');
  });

  it('passes variants to motion.div', () => {
    render(<Loader />);

    const motionDivMock = motion.div as unknown as jest.Mock;
    const call = motionDivMock.mock.calls.find((c) => c[0]?.['role'] === 'status');
    expect(call).toBeDefined();

    const props = call[0];
    expect(props.variants).toBeDefined();
    expect(props.initial).toBe('initial');
    expect(props.animate).toBe('animate');
  });

  it('passes variants and transition to each motion.span', () => {
    render(<Loader />);

    const motionSpanMock = motion.span as unknown as jest.Mock;
    const calls = motionSpanMock.mock.calls;

    expect(calls).toHaveLength(3); // three dots
    calls.forEach((call) => {
      const props = call[0];
      expect(props.variants).toBeDefined();
      expect(props.transition).toBeDefined();
      expect(props.transition.duration).toBe(0.6);
      expect(props.transition.repeat).toBe(Infinity);
    });
  });
});
