import { fireEvent, screen } from '@testing-library/react';
import { motion } from 'framer-motion';

import { useMobileNav } from '@/hooks';

import MobileNav from './';

jest.mock('@/hooks', () => ({
  useMobileNav: jest.fn(),
}));

jest.mock('@/components', () => {
  const { MockButton, MockIcon, MockContactInfo } = jest.requireActual('tests/mocks');

  return {
    Button: MockButton,
    Icon: MockIcon,
    ContactInfo: MockContactInfo,
  };
});

jest.mock('framer-motion', () => {
  const { createMotionComponent, MockAnimatePresence } = jest.requireActual('tests/mocks');
  const actual = jest.requireActual('framer-motion');

  return {
    ...actual,
    motion: {
      div: createMotionComponent('div'),
      aside: createMotionComponent('aside'),
    },
    AnimatePresence: MockAnimatePresence,
  };
});

jest.mock('../MobileNavItem', () => ({
  __esModule: true,
  default: jest.fn(({ item, isActive, toggleSubmenu, closeMenu }) => (
    <div data-testid="mobile-nav-item" data-label={item.label} data-active={isActive}>
      <button onClick={toggleSubmenu} data-testid={`toggle-${item.label}`} />
      <button onClick={closeMenu} data-testid={`close-${item.label}`} />
    </div>
  )),
}));

jest.mock('../Logo', () => {
  const { MockLogo } = jest.requireActual('tests/mocks');
  return {
    __esModule: true,
    default: MockLogo,
  };
});

jest.mock('@/config', () => {
  const { mockContactInfo } = jest.requireActual('tests/mocks');

  return {
    contactInfo: mockContactInfo,
  };
});

jest.mock('@/assets', () => ({
  burgerMenu: 'burger-mock',
  close: 'close-mock',
  logout: 'logout-mock',
}));

jest.mock('@/lib', () => {
  const { createMockVariants } = jest.requireActual('tests/mocks');

  return {
    fadeIn: createMockVariants(),
    overlayVariants: createMockVariants({ includeExit: true }),
  };
});

jest.mock('react-router-dom', () => {
  const { mockLink } = jest.requireActual('tests/mocks');
  const actual = jest.requireActual('react-router-dom');

  return {
    ...actual,
    Link: mockLink,
  };
});

describe('MobileNav', () => {
  const { mockNavigation } = jest.requireActual('tests/mocks');
  const mockOnLogout = jest.fn();
  const defaultProps = {
    navigation: mockNavigation,
    onLogout: mockOnLogout,
    isLoggingOut: false,
    isAdmin: false,
  };

  const mockUseMobileNav = useMobileNav as jest.Mock;
  const mockCloseMenu = jest.fn();
  const mockOpenMenu = jest.fn();
  const mockToggleSubmenu = jest.fn();

  const defaultHookState = {
    isOpen: false,
    activeSubmenu: null,
    openMenu: mockOpenMenu,
    closeMenu: mockCloseMenu,
    toggleSubmenu: mockToggleSubmenu,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMobileNav.mockReturnValue(defaultHookState);
    document.body.style.overflow = '';
  });

  const renderComponent = (props = {}) => {
    const mergedProps = { ...defaultProps, ...props };
    const { renderWithRouter } = jest.requireActual('tests/test-utils');
    return renderWithRouter(<MobileNav {...mergedProps} />);
  };

  it('renders open menu button', () => {
    renderComponent();

    expect(screen.getByTestId('open-menu-button')).toBeInTheDocument();
    expect(screen.getByTestId('icon-burgerMenu')).toBeInTheDocument();
  });

  it('calls openMenu when open button is clicked', () => {
    renderComponent();

    fireEvent.click(screen.getByTestId('open-menu-button'));
    expect(mockOpenMenu).toHaveBeenCalledTimes(1);
  });

  describe('when menu is open', () => {
    beforeEach(() => {
      mockUseMobileNav.mockReturnValue({
        ...defaultHookState,
        isOpen: true,
        activeSubmenu: 'Послуги',
      });
    });

    it('renders overlay and panel', () => {
      renderComponent();

      expect(screen.getByTestId('menu-overlay')).toBeInTheDocument();
      expect(screen.getByTestId('menu-panel')).toBeInTheDocument();
      expect(screen.getByTestId('logo')).toBeInTheDocument();
      expect(screen.getByTestId('close-menu-button')).toBeInTheDocument();
    });

    it('calls closeMenu when close button is clicked', () => {
      renderComponent();

      fireEvent.click(screen.getByTestId('close-menu-button'));
      expect(mockCloseMenu).toHaveBeenCalledTimes(1);
    });

    it('calls closeMenu when overlay is clicked', () => {
      renderComponent();

      fireEvent.click(screen.getByTestId('menu-overlay'));
      expect(mockCloseMenu).toHaveBeenCalledTimes(1);
    });

    it('renders MobileNavItem for each navigation item', () => {
      renderComponent();

      const items = screen.getAllByTestId('mobile-nav-item');
      expect(items).toHaveLength(4);
      expect(items[0]).toHaveAttribute('data-label', 'Головна');
      expect(items[0]).toHaveAttribute('data-active', 'false');
      expect(items[1]).toHaveAttribute('data-label', 'Послуги');
      expect(items[1]).toHaveAttribute('data-active', 'true');
      expect(items[2]).toHaveAttribute('data-label', 'Галерея');
      expect(items[2]).toHaveAttribute('data-active', 'false');
      expect(items[3]).toHaveAttribute('data-label', 'Контакти');
      expect(items[3]).toHaveAttribute('data-active', 'false');
    });

    it('passes toggleSubmenu and closeMenu to MobileNavItem', () => {
      renderComponent();

      fireEvent.click(screen.getByTestId('toggle-Послуги'));
      expect(mockToggleSubmenu).toHaveBeenCalledWith('Послуги');

      fireEvent.click(screen.getByTestId('close-Послуги'));
      expect(mockCloseMenu).toHaveBeenCalledTimes(1);
    });

    it('does not render logout button when isAdmin is false', () => {
      renderComponent();
      expect(screen.queryByTestId('logout-button')).not.toBeInTheDocument();
    });

    it('renders logout button when isAdmin is true and handles click', () => {
      renderComponent({ isAdmin: true });

      const logoutButton = screen.getByTestId('logout-button');
      expect(logoutButton).toBeInTheDocument();
      expect(screen.getByTestId('icon-logout')).toBeInTheDocument();

      fireEvent.click(logoutButton);
      expect(mockOnLogout).toHaveBeenCalledTimes(1);
    });

    it('disables logout button when isLoggingOut is true', () => {
      renderComponent({ isAdmin: true, isLoggingOut: true });
      expect(screen.getByTestId('logout-button')).toBeDisabled();
    });

    it('renders ContactInfo with role="menu"', () => {
      renderComponent();

      const contactInfo = screen.getByTestId('contact-info-container');
      expect(contactInfo).toHaveAttribute('data-role', 'menu');
    });

    it('sets body overflow hidden when open', () => {
      renderComponent();
      expect(document.body).toHaveStyle({ overflow: 'hidden' });
    });
  });

  describe('when menu is closed', () => {
    it('does not render overlay and panel', () => {
      renderComponent();

      expect(screen.queryByTestId('menu-overlay')).not.toBeInTheDocument();
      expect(screen.queryByTestId('menu-panel')).not.toBeInTheDocument();
    });

    it('resets body overflow on unmount', () => {
      const { unmount } = renderComponent();

      unmount();
      expect(document.body).toHaveStyle({ overflow: '' });
    });
  });

  describe('animation props', () => {
    it('passes overlayVariants to overlay motion.div', () => {
      mockUseMobileNav.mockReturnValue({ ...defaultHookState, isOpen: true });
      renderComponent();

      const motionDivMock = motion.div as unknown as jest.Mock;
      const overlayCall = motionDivMock.mock.calls.find(
        (call) => call[0]?.['data-testid'] === 'menu-overlay',
      )?.[0];
      expect(overlayCall).toMatchObject({
        initial: 'hidden',
        animate: 'visible',
        exit: 'hidden',
        variants: expect.any(Object),
      });
    });

    it('passes panelVariants and fadeIn to panel motion.aside', () => {
      mockUseMobileNav.mockReturnValue({ ...defaultHookState, isOpen: true });
      renderComponent();

      const motionAsideMock = motion.aside as unknown as jest.Mock;
      const panelCall = motionAsideMock.mock.calls.find(
        (call) => call[0]?.['data-testid'] === 'menu-panel',
      )?.[0];
      expect(panelCall).toMatchObject({
        initial: 'hidden',
        animate: 'visible',
        exit: 'hidden',
        variants: expect.any(Object),
        transition: { type: 'tween', duration: 0.3 },
      });

      const motionDivMock = motion.div as unknown as jest.Mock;
      const innerDivCall = motionDivMock.mock.calls.find(
        (call) => call[0]?.['data-testid'] === 'menu-panel-content',
      );
      expect(innerDivCall).toBeDefined();
      expect(innerDivCall[0].variants).toBeDefined();
    });
  });
});
