import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DesktopNav from './';

jest.mock('../DesktopNavItem', () => {
  const { MockDesktopNavItem } = jest.requireActual('tests');

  return {
    __esModule: true,
    default: MockDesktopNavItem,
  };
});

jest.mock('@/components', () => {
  const { MockButton, MockIcon, MockTypography } = jest.requireActual('tests');

  return {
    Button: MockButton,
    Icon: MockIcon,
    Typography: MockTypography,
  };
});

jest.mock('react-router-dom', () => {
  const { mockLink } = jest.requireActual('tests');
  const actual = jest.requireActual('react-router-dom');

  return {
    ...actual,
    Link: mockLink,
  };
});

jest.mock('@/config', () => ({
  ROUTES: { GALLERY: '/gallery' },
}));

jest.mock('@/assets', () => ({
  arrowTopLeft: 'arrow-top-left-mock',
  logout: 'logout-mock',
}));

describe('DesktopNav', () => {
  const { mockNavigation } = jest.requireActual('tests');
  const mockOnLogout = jest.fn();
  const defaultProps = {
    navigation: mockNavigation,
    isAdmin: false,
    onLogout: mockOnLogout,
    isLoggingOut: false,
  };

  const renderComponent = (props = {}) => {
    const { renderWithRouter } = jest.requireActual('tests');

    const mergedProps = { ...defaultProps, ...props };
    return renderWithRouter(<DesktopNav {...mergedProps} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders DesktopNavItem for each main link (excluding gallery)', () => {
    renderComponent();

    const navLinks = screen.getAllByTestId('nav-link');

    expect(navLinks[0]).toHaveTextContent('Головна');
    expect(navLinks[0]).toHaveAttribute('data-to', '/');
    expect(navLinks[1]).toHaveTextContent('Послуги');
    expect(navLinks[1]).toHaveAttribute('data-to', '/services');
  });

  it('does not render logout button when isAdmin is false', () => {
    renderComponent();
    expect(screen.queryByTestId('button')).not.toBeInTheDocument();
  });

  it('renders logout button when isAdmin is true', () => {
    renderComponent({ isAdmin: true });

    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-intent', 'minimal');
    expect(button).toBeEnabled();
    expect(screen.getByTestId('icon-logout')).toBeInTheDocument();
  });

  it('calls onLogout when logout button is clicked', async () => {
    const user = userEvent.setup();
    renderComponent({ isAdmin: true });

    const button = screen.getByTestId('button');
    await user.click(button);

    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  it('disables logout button when isLoggingOut is true', () => {
    renderComponent({ isAdmin: true, isLoggingOut: true });

    const button = screen.getByTestId('button');
    expect(button).toBeDisabled();
  });

  it('renders the gallery link with correct props', () => {
    renderComponent();

    const link = screen.getByTestId('link');
    expect(link).toHaveAttribute('href', '/gallery');
    expect(link).toHaveClass(
      'group ml-[66px] flex items-center gap-3 px-3 py-3 transition-colors duration-300 hover:bg-accent/40',
    );

    const typography = screen.getByTestId('typography');
    expect(typography).toHaveTextContent('Галерея');
    expect(typography).toHaveAttribute('data-parent', 'span');
    expect(typography).toHaveAttribute('data-size', 'lg');
    expect(typography).toHaveAttribute('data-font', 'secondary');
    expect(typography).toHaveAttribute('data-weight', 'normal');

    const img = screen.getByTestId('gallery-arrow');
    expect(img).toHaveAttribute('src', 'arrow-top-left-mock');
    expect(img).toHaveClass(
      'h-[15px] w-[15px] text-secondary transition-all duration-300 group-hover:rotate-45',
    );
  });

  it('applies correct classes to the nav element', () => {
    renderComponent();
    const nav = screen.getByTestId('desktop-nav');
    expect(nav).toHaveClass('hidden h-full justify-between lg:flex');
  });
});
