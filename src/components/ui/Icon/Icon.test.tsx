import { render, screen } from '@testing-library/react';

import { cn } from '@/lib';

import Icon from './';

jest.mock('@/lib', () => ({
  cn: jest.fn((...args) => args.join(' ')),
}));

describe('Icon', () => {
  const defaultProps = {
    name: 'test-icon',
    icon: '/path/to/icon.svg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

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
    expect(element).toHaveClass('cursor-pointer', 'hover:scale-110');
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

  it('renders an img with correct src and alt', () => {
    render(<Icon {...defaultProps} />);

    const img = screen.getByRole('img', { name: defaultProps.name });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', defaultProps.icon);
    expect(img).toHaveClass('h-full', 'w-full', 'object-contain');
  });

  it('passes both icon and link props correctly', () => {
    const link = 'https://example.com';
    render(<Icon {...defaultProps} as="link" link={link} />);

    const anchor = screen.getByTestId('icon');
    expect(anchor).toHaveAttribute('href', link);

    const img = screen.getByRole('img', { name: defaultProps.name });
    expect(img).toBeInTheDocument();
  });

  it('calls cn with correct arguments for static icon', () => {
    render(<Icon {...defaultProps} className="extra" />);
    expect(cn).toHaveBeenCalledWith(
      'flex flex-shrink-0 items-center justify-center overflow-hidden',
      false,
      'w-5 h-5 xl:h-7 xl:w-7 2xl:h-9 2xl:w-9',
      'extra',
    );
  });

  it('calls cn with correct arguments for link icon', () => {
    render(<Icon {...defaultProps} as="link" link="https://example.com" className="extra" />);
    expect(cn).toHaveBeenCalledWith(
      'flex flex-shrink-0 items-center justify-center overflow-hidden',
      'cursor-pointer duration-300 hover:scale-110',
      'w-5 h-5 xl:h-7 xl:w-7 2xl:h-9 2xl:w-9',
      'extra',
    );
  });
});
