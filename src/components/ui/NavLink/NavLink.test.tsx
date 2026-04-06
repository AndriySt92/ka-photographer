import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import NavLink from './';

jest.mock('../Typography', () => {
  const { MockTypography } = jest.requireActual('tests');

  return {
    __esModule: true,
    default: MockTypography,
  };
});

jest.mock('@/lib', () => {
  const { mockCn } = jest.requireActual('tests');

  return {
    cn: mockCn,
  };
});

describe('NavLink', () => {
  const defaultProps = {
    to: '/home',
    children: 'Home',
  };

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a link with correct href', () => {
    renderWithRouter(<NavLink {...defaultProps} />);

    const link = screen.getByTestId('nav-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/home');
  });

  it('applies default classes and custom className', () => {
    renderWithRouter(<NavLink {...defaultProps} className="my-custom-class" />);

    const link = screen.getByTestId('nav-link');
    expect(link).toHaveClass(
      'transition-all',
      'duration-300',
      'pointer-fine:hover:bg-accent/40',
      'my-custom-class',
    );
  });

  it('passes default textSize and font to Typography', () => {
    renderWithRouter(<NavLink {...defaultProps} />);

    const typography = screen.getByTestId('typography');
    expect(typography).toHaveAttribute('data-size', 'lg');
    expect(typography).toHaveAttribute('data-font', 'primary');
    expect(typography).toHaveAttribute('data-weight', 'normal');
    expect(typography).toHaveAttribute('data-parent', 'span');
  });

  it('passes custom textSize and font to Typography', () => {
    renderWithRouter(<NavLink {...defaultProps} textSize="base" font="secondary" />);

    const typography = screen.getByTestId('typography');
    expect(typography).toHaveAttribute('data-size', 'base');
    expect(typography).toHaveAttribute('data-font', 'secondary');
  });

  it('renders children text inside Typography', () => {
    renderWithRouter(<NavLink {...defaultProps} />);

    const typography = screen.getByTestId('typography');
    expect(typography).toHaveTextContent('Home');
  });

  it('calls onClick when link is clicked', () => {
    const handleClick = jest.fn();
    renderWithRouter(<NavLink {...defaultProps} onClick={handleClick} />);

    const link = screen.getByTestId('nav-link');
    fireEvent.click(link);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
