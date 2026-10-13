import { render, screen } from '@testing-library/react';

import FancyboxAnchor from './';

describe('FancyboxAnchor', () => {
  const defaultProps = {
    href: 'https://example.com/image.jpg',
    children: 'View Image',
  };

  it('renders an anchor with correct href and children', () => {
    render(<FancyboxAnchor {...defaultProps} />);

    const link = screen.getByRole('link', { name: /view image/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', defaultProps.href);
  });

  it('applies default gallery attribute when not provided', () => {
    render(<FancyboxAnchor {...defaultProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('data-fancybox', 'gallery');
  });

  it('applies custom gallery attribute', () => {
    render(<FancyboxAnchor {...defaultProps} gallery="custom-gallery" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('data-fancybox', 'custom-gallery');
  });

  it('applies data-caption attribute when caption is provided', () => {
    render(<FancyboxAnchor {...defaultProps} caption="Beautiful landscape" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('data-caption', 'Beautiful landscape');
  });

  it('does not apply data-caption attribute when caption is not provided', () => {
    render(<FancyboxAnchor {...defaultProps} />);

    const link = screen.getByRole('link');
    expect(link).not.toHaveAttribute('data-caption');
  });

  it('applies custom className', () => {
    render(<FancyboxAnchor {...defaultProps} className="my-custom-class" />);

    const link = screen.getByRole('link');
    expect(link).toHaveClass('my-custom-class');
  });

  it('renders complex children', () => {
    render(
      <FancyboxAnchor href="/test">
        <span data-testid="child-span">Click me</span>
      </FancyboxAnchor>,
    );

    const link = screen.getByRole('link');
    expect(link).toContainElement(screen.getByTestId('child-span'));
  });
});
