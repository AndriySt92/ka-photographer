import { render, screen } from '@testing-library/react';

import Circles from './';

jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: jest
        .fn()
        .mockImplementation(({ children, ...props }) => <div {...props}>{children}</div>),
    },
  };
});

jest.mock('@/lib', () => ({
  cn: (...args: any[]) => args.join(' '),
  smallCircleVariants: { initial: {}, animate: {} },
}));

describe('Circles', () => {
  it('renders with default props', () => {
    render(<Circles />);
    const outer = screen.getByTestId('circles');
    expect(outer).toBeInTheDocument();
    expect(outer).toHaveClass(
      'section-border',
      'absolute',
      'top-0',
      'flex',
      'aspect-square',
      'h-full',
      'items-center',
      'justify-center',
      'rounded-full',
    );
  });

  it('applies custom className', () => {
    render(<Circles className="my-custom-class" />);
    const outer = screen.getByTestId('circles');
    expect(outer).toHaveClass('my-custom-class');
  });

  it('renders the inner div with correct classes', () => {
    render(<Circles />);

    const inner = screen.getByTestId('circles-inner');
    expect(inner).toHaveClass(
      'section-border',
      'absolute',
      'aspect-square',
      'h-[50%]',
      'rounded-full',
    );
  });
});
