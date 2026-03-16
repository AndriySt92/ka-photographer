import { fireEvent, screen } from '@testing-library/react';
import { motion, useReducedMotion } from 'framer-motion';

import DesktopNavItem from './';

jest.mock('framer-motion', () => {
  const { createMotionComponent, MockAnimatePresence } = jest.requireActual('tests/mocks');
  const actual = jest.requireActual('framer-motion');

  return {
    ...actual,
    useReducedMotion: jest.fn(),
    motion: {
      div: createMotionComponent('div'),
    },
    AnimatePresence: MockAnimatePresence,
  };
});

jest.mock('@/components', () => {
  const { MockNavLink } = jest.requireActual('tests/mocks');

  return {
    NavLink: MockNavLink,
  };
});

describe('DesktopNavItem', () => {
  const mockUseReducedMotion = useReducedMotion as jest.Mock;
  const { renderWithRouter } = jest.requireActual('tests/test-utils');
  const { mockNavigation } = jest.requireActual('tests/mocks');

  const itemWithoutChildren = mockNavigation[0]; // { label: 'Головна', path: '/' }
  const itemWithChildren = mockNavigation[1]; // { label: 'Послуги', path: '/services', children: [...] }

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseReducedMotion.mockReturnValue(false);
  });

  const renderComponent = (props: any) => renderWithRouter(<DesktopNavItem {...props} />);

  it('renders the main NavLink with correct props', () => {
    renderComponent({ item: itemWithoutChildren });

    const mainLink = screen.getByTestId('nav-link-main');
    expect(mainLink).toHaveAttribute('href', '/');
    expect(mainLink).toHaveTextContent('Головна');
    expect(mainLink).toHaveClass('flex h-full items-center px-3 py-3');
  });

  it('does not render dropdown when item has no children', () => {
    renderComponent({ item: itemWithoutChildren });
    expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
  });

  it('shows dropdown on mouse enter and hides on mouse leave', () => {
    renderComponent({ item: itemWithChildren });

    const container = screen.getByTestId('desktop-nav-item');
    expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();

    fireEvent.mouseEnter(container);
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();

    fireEvent.mouseLeave(container);
    expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
  });

  it('renders child links when dropdown is open', () => {
    renderComponent({ item: itemWithChildren });

    fireEvent.mouseEnter(screen.getByTestId('desktop-nav-item'));

    // mockNavigation[1] has one child (Love Story)
    expect(screen.getByTestId('dropdown-link-0')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown-link-0')).toHaveTextContent('Love Story');
  });

  it('closes dropdown when a child link is clicked', () => {
    renderComponent({ item: itemWithChildren });

    fireEvent.mouseEnter(screen.getByTestId('desktop-nav-item'));
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('dropdown-link-0'));
    expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
  });

  describe('animation variants', () => {
    it('passes dropdownVariants to motion.div when dropdown is open', () => {
      renderComponent({ item: itemWithChildren });

      fireEvent.mouseEnter(screen.getByTestId('desktop-nav-item'));

      const motionDivMock = motion.div as unknown as jest.Mock;
      const dropdownCall = motionDivMock.mock.calls.find(
        (call) => call[0]?.['data-testid'] === 'dropdown',
      )?.[0];
      expect(dropdownCall).toMatchObject({
        initial: 'hidden',
        animate: 'visible',
        exit: 'exit',
        variants: expect.any(Object),
      });
    });

    it('passes listItemVariants and custom index to each child motion.div', () => {
      renderComponent({ item: itemWithChildren });

      fireEvent.mouseEnter(screen.getByTestId('desktop-nav-item'));

      const motionDivMock = motion.div as unknown as jest.Mock;
      const childCalls = motionDivMock.mock.calls.filter((call) =>
        call[0]?.['data-testid']?.startsWith('dropdown-item-'),
      );
      expect(childCalls).toHaveLength(1); // only one child

      const [firstChildProps] = childCalls.map((call) => call[0]);
      expect(firstChildProps).toMatchObject({
        initial: 'hidden',
        animate: 'visible',
        variants: expect.any(Object),
        custom: 0,
      });
    });

    it('uses visible initial when reduced motion is enabled', () => {
      mockUseReducedMotion.mockReturnValue(true);
      renderComponent({ item: itemWithChildren });

      fireEvent.mouseEnter(screen.getByTestId('desktop-nav-item'));

      const motionDivMock = motion.div as unknown as jest.Mock;

      const dropdownCall = motionDivMock.mock.calls.find(
        (call) => call[0]?.['data-testid'] === 'dropdown',
      )?.[0];
      expect(dropdownCall.initial).toBe('visible');
    });
  });
});
