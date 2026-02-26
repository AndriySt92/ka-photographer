import React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './';

jest.mock('framer-motion', () => {
  const motionMock = jest.fn().mockImplementation((Component: any) => {
    return React.forwardRef((props: any, ref: any) => <Component ref={ref} {...props} />);
  });
  (motionMock as any).span = jest
    .fn()
    .mockImplementation(({ children, ...props }) => <span {...props}>{children}</span>);
  const AnimatePresenceMock = ({ children }: any) => <>{children}</>;
  return {
    motion: motionMock,
    AnimatePresence: AnimatePresenceMock,
  };
});

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    Link: jest.fn().mockImplementation(({ children, to, className, ...props }) => (
      <a href={to} className={className} {...props}>
        {children}
      </a>
    )),
  };
});

jest.mock('@/lib', () => ({
  buttonTextVariants: { initial: {}, animate: {}, exit: {} },
  cn: (...args: any[]) => args.join(' '),
}));

describe('Button', () => {
  const renderButton = (props: any, options = { withRouter: false }) => {
    if (options.withRouter) {
      return render(
        <MemoryRouter>
          <Button {...props} />
        </MemoryRouter>,
      );
    }
    return render(<Button {...props} />);
  };

  it('renders as a button by default', () => {
    renderButton({ children: 'Click me' });

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });

  it('applies variant classes correctly', () => {
    const { rerender } = renderButton({
      children: 'Primary Large',
      intent: 'primary',
      size: 'textLg',
    });

    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'border',
      'border-secondary',
      'rounded-full',
      'px-5',
      'py-2',
      'lg:px-10',
      'lg:py-3',
    );

    rerender(
      <Button intent="secondary" size="iconSm">
        Icon Button
      </Button>,
    );

    expect(button).toHaveClass(
      'bg-primary',
      'border',
      'border-secondary',
      'p-1',
      'sm:p-2',
      'h-10',
      'w-10',
    );
  });

  it('handles onClick when not disabled or loading', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    renderButton({ children: 'Click', onClick: handleClick });

    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    renderButton({ children: 'Click', onClick: handleClick, disabled: true });

    await user.click(screen.getByRole('button'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when loading', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    renderButton({ children: 'Click', onClick: handleClick, isLoading: true });

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows loading spinner and text when isLoading', () => {
    renderButton({
      children: 'Save',
      isLoading: true,
      loadingText: 'Saving...',
    });
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    expect(screen.getByText('Saving...')).toBeInTheDocument();
    expect(screen.getByTestId('button-spinner')).toBeInTheDocument();
    expect(screen.queryByText('Save')).not.toBeInTheDocument();
  });

  it('shows original children when not loading', () => {
    renderButton({ children: 'Save', isLoading: false });

    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.queryByText('Saving...')).not.toBeInTheDocument();
  });

  it('renders as Link when as={Link} and to prop provided', () => {
    renderButton(
      {
        as: Link,
        to: '/home',
        children: 'Go Home',
      },
      { withRouter: true },
    );

    const link = screen.getByRole('link', { name: /go home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/home');
  });

  it('forwards ref to button element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    renderButton({ children: 'Ref', ref });

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('forwards ref to anchor element when as Link', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    renderButton(
      {
        as: Link,
        to: '/test',
        children: 'Link Ref',
        ref,
      },
      { withRouter: true },
    );

    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it('accepts and passes data-testid', () => {
    renderButton({ children: 'Test', 'data-testid': 'my-button' });
    expect(screen.getByTestId('my-button')).toBeInTheDocument();
  });

  it('applies custom className and merges with variant classes', () => {
    renderButton({ children: 'Custom', className: 'my-custom-class' });

    const button = screen.getByRole('button');
    expect(button).toHaveClass('my-custom-class', 'border', 'rounded-full');
  });

  it('renders with minimal props without crashing', () => {
    renderButton({ children: 'Minimal' });
    expect(screen.getByText('Minimal')).toBeInTheDocument();
  });

  it('handles AnimatePresence mode correctly', () => {
    const { rerender } = renderButton({ children: 'Content', isLoading: false });
    expect(screen.getByText('Content')).toBeInTheDocument();

    rerender(
      <Button isLoading loadingText="Loading">
        Loading
      </Button>,
    );
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
});
