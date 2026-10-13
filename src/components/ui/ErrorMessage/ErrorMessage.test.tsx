import { render, screen } from '@testing-library/react';

import ErrorMessage from './';

jest.mock('framer-motion', () => {
  const { createMotionComponent } = jest.requireActual('tests');

  return {
    motion: {
      div: createMotionComponent('div'),
    },
    AnimatePresence: jest.fn().mockImplementation(({ children }) => <>{children}</>),
  };
});

describe('ErrorMessage', () => {
  it('renders nothing when error is not provided', () => {
    render(<ErrorMessage />);
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  it('renders error message when error is provided', () => {
    render(<ErrorMessage error="Something went wrong" />);
    expect(screen.getByTestId('error-message')).toHaveTextContent('Something went wrong');
  });

  it('applies default size class (sm)', () => {
    render(<ErrorMessage error="Error" />);
    expect(screen.getByTestId('error-message')).toHaveClass('text-sm');
  });

  it('applies lg size class', () => {
    render(<ErrorMessage error="Error" size="lg" />);
    expect(screen.getByTestId('error-message')).toHaveClass('text-lg lg:text-xl');
  });

  it('applies custom className', () => {
    render(<ErrorMessage error="Error" className="my-custom-class" />);
    expect(screen.getByTestId('error-message')).toHaveClass('my-custom-class');
  });

  it('re‑creates element when animationKey changes (key change)', () => {
    const { rerender } = render(<ErrorMessage error="Test" animationKey="key1" />);
    const firstElement = screen.getByTestId('error-message');

    rerender(<ErrorMessage error="Test" animationKey="key2" />);
    const secondElement = screen.getByTestId('error-message');

    // Different instances indicate React unmounted/mounted due to key change
    expect(firstElement).not.toBe(secondElement);
  });
});
