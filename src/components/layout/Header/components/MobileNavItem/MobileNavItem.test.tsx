import { fireEvent, render, screen } from '@testing-library/react';

import MobileNavItem from './';

jest.mock('@/components', () => {
  const { MockButton, MockIcon, MockNavLink } = jest.requireActual('tests/mocks');

  return {
    Button: MockButton,
    Icon: MockIcon,
    NavLink: MockNavLink,
  };
});

jest.mock('@/lib', () => {
  const { mockCn } = jest.requireActual('tests/mocks');

  return {
    cn: mockCn,
  };
});

jest.mock('@/assets', () => ({
  dropdownArrow: 'dropdown-arrow-mock',
}));

describe('MobileNavItem', () => {
  const mockToggleSubmenu = jest.fn();
  const mockCloseMenu = jest.fn();
  const { mockNavigation } = jest.requireActual('tests/mocks');

  const baseItem = mockNavigation[0]; // { label: 'Головна', path: '/' }
  const itemWithChildren = mockNavigation[1]; // { label: 'Послуги', path: '/services', children: [...] }

  const defaultProps = {
    item: baseItem,
    isActive: false,
    toggleSubmenu: mockToggleSubmenu,
    closeMenu: mockCloseMenu,
  };

  const renderComponent = (props = {}) => render(<MobileNavItem {...defaultProps} {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the main NavLink with correct props', () => {
    renderComponent();

    const link = screen.getByTestId('nav-link');
    expect(link).toHaveAttribute('href', '/');
    expect(link).toHaveTextContent('Головна');
  });

  it('calls closeMenu when main link is clicked', () => {
    renderComponent();

    const link = screen.getByTestId('nav-link');
    fireEvent.click(link);
    expect(mockCloseMenu).toHaveBeenCalledTimes(1);
  });

  describe('when item has no children', () => {
    it('does not render expand button', () => {
      renderComponent();
      expect(screen.queryByTestId('button')).not.toBeInTheDocument();
    });
  });

  describe('when item has children', () => {
    const propsWithChildren = {
      item: itemWithChildren,
      isActive: false,
    };

    it('renders expand button', () => {
      renderComponent(propsWithChildren);
      expect(screen.getByTestId('button')).toBeInTheDocument();
    });

    it('calls toggleSubmenu when expand button is clicked', () => {
      renderComponent(propsWithChildren);

      fireEvent.click(screen.getByTestId('button'));
      expect(mockToggleSubmenu).toHaveBeenCalledTimes(1);
    });

    it('has correct aria-label based on isActive', () => {
      const { rerender } = renderComponent(propsWithChildren);
      expect(screen.getByTestId('button')).toHaveAttribute('aria-label', 'Expand Послуги submenu');

      rerender(<MobileNavItem {...defaultProps} {...propsWithChildren} isActive={true} />);
      expect(screen.getByTestId('button')).toHaveAttribute(
        'aria-label',
        'Collapse Послуги submenu',
      );
    });

    it('rotates icon when isActive is true', () => {
      const activeProps = { ...propsWithChildren, isActive: true };
      renderComponent(activeProps);

      const icon = screen.getByTestId('icon-dropdownArrow');
      expect(icon).toHaveClass('rotate-180');
    });

    it('does not rotate icon when isActive is false', () => {
      renderComponent(propsWithChildren);

      const icon = screen.getByTestId('icon-dropdownArrow');
      expect(icon).not.toHaveClass('rotate-180');
    });

    it('applies correct classes to submenu when isActive is true', () => {
      const activeProps = { ...propsWithChildren, isActive: true };
      renderComponent(activeProps);

      const submenu = screen.getByTestId('submenu');
      expect(submenu).toHaveClass('max-h-[300px]');
      expect(submenu).toHaveClass('opacity-100');
      expect(submenu).not.toHaveClass('max-h-0');
      expect(submenu).not.toHaveClass('opacity-0');
    });

    it('applies correct classes to submenu when isActive is false', () => {
      renderComponent(propsWithChildren);

      const submenu = screen.getByTestId('submenu');
      expect(submenu).toHaveClass('max-h-0');
      expect(submenu).toHaveClass('opacity-0');
      expect(submenu).not.toHaveClass('max-h-[300px]');
      expect(submenu).not.toHaveClass('opacity-100');
    });

    it('renders child links for each submenu item', () => {
      const activeProps = { ...propsWithChildren, isActive: true };
      renderComponent(activeProps);

      const childLinks = screen.getAllByTestId('submenu-link');
      expect(childLinks).toHaveLength(1);
      expect(childLinks[0]).toHaveTextContent('Love Story');
      expect(childLinks[0]).toHaveAttribute('href', '/services/love');
    });

    it('calls closeMenu when a submenu link is clicked', () => {
      const activeProps = { ...propsWithChildren, isActive: true };
      renderComponent(activeProps);

      const subLink = screen.getAllByTestId('submenu-link')[0];
      fireEvent.click(subLink);
      expect(mockCloseMenu).toHaveBeenCalledTimes(1);
    });
  });
});
