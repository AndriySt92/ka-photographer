import { render, screen } from '@testing-library/react';

import Icon from './';

describe('Icon', () => {
  const defaultProps = {
    name: 'test-icon',
    icon: '/path/to/icon.svg',
  };

  it('renders a static span when as="icon" (default)', () => {
    render(<Icon {...defaultProps} />);

    const element = screen.getByTestId('icon');

    expect(element.tagName).toBe('SPAN');
    expect(element).toHaveClass(
      'flex',
      'flex-shrink-0',
      'items-center',
      'justify-center',
      'overflow-hidden',
    );
    expect(element).not.toHaveClass('cursor-pointer', 'hover:scale-110');
  });

  it('renders an anchor when as="link" and link is provided', () => {
    const link = 'https://example.com';

    render(<Icon {...defaultProps} as="link" link={link} />);

    const element = screen.getByTestId('icon');

    expect(element.tagName).toBe('A');
    expect(element).toHaveAttribute('href', link);
    expect(element).toHaveAttribute('target', '_blank');
    expect(element).toHaveAttribute('rel', 'noopener noreferrer');
    expect(element).toHaveAttribute('aria-label', defaultProps.name);
    expect(element).toHaveClass('cursor-pointer', 'duration-300', 'hover:scale-110');
  });

  it('falls back to span when as="link" but link is missing', () => {
    render(<Icon {...defaultProps} as="link" link={undefined} />);

    const element = screen.getByTestId('icon');

    expect(element.tagName).toBe('SPAN');
  });

  it('applies default size classes when size prop is not provided', () => {
    render(<Icon {...defaultProps} />);

    const element = screen.getByTestId('icon');

    expect(element).toHaveClass('w-5', 'h-5', 'xl:h-7', 'xl:w-7', '2xl:h-9', '2xl:w-9');
  });

  it('applies custom size classes', () => {
    render(<Icon {...defaultProps} size="custom-size-class" />);

    const element = screen.getByTestId('icon');

    expect(element).toHaveClass('custom-size-class');
    expect(element).not.toHaveClass('w-5', 'h-5');
  });

  it('applies custom className', () => {
    render(<Icon {...defaultProps} className="my-custom-class" />);

    const element = screen.getByTestId('icon');

    expect(element).toHaveClass('my-custom-class');
  });

  it('renders an img with correct src and classes', () => {
    render(<Icon {...defaultProps} />);

    const img = screen.getByAltText('');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', defaultProps.icon);
    expect(img).toHaveAttribute('aria-hidden', 'true');
    expect(img).toHaveClass('h-full', 'w-full', 'object-contain');
  });

  it('passes both icon and link props correctly', () => {
    const link = 'https://example.com';

    render(<Icon {...defaultProps} as="link" link={link} />);

    const anchor = screen.getByTestId('icon');

    expect(anchor).toHaveAttribute('href', link);
    expect(anchor).toHaveAttribute('aria-label', defaultProps.name);

    const img = screen.getByAltText('');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', defaultProps.icon);
  });
});
