import { useLocation } from 'react-router-dom';
import { screen } from '@testing-library/react';

import Layout from './';

jest.mock('@/components', () => {
  const { MockScrollToTop } = jest.requireActual('tests/mocks');

  return {
    ScrollToTopButton: MockScrollToTop,
  };
});

jest.mock('../', () => ({
  Header: () => <div data-testid="header" />,
  Footer: () => <div data-testid="footer" />,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  Outlet: () => <div data-testid="outlet">Outlet content</div>,
}));

describe('Layout', () => {
  const mockUseLocation = useLocation as jest.Mock;
  const mockScrollTo = jest.fn();

  beforeAll(() => {
    window.scrollTo = mockScrollTo;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLocation.mockReturnValue({ pathname: '/' });
  });

  const renderComponent = (initialPath = '/') => {
    const { renderWithRouter } = jest.requireActual('tests/test-utils');
    return renderWithRouter(<Layout />, { initialEntries: [initialPath] });
  };

  it('renders Header, Outlet, Footer, and ScrollToTopButton', () => {
    renderComponent();

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('scroll-to-top')).toBeInTheDocument();
  });

  it('calls window.scrollTo on mount', () => {
    renderComponent();

    expect(mockScrollTo).toHaveBeenCalledTimes(1);
    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0 });
  });

  it('calls window.scrollTo when pathname changes', () => {
    const { rerender } = renderComponent('/');

    mockScrollTo.mockClear();
    mockUseLocation.mockReturnValue({ pathname: '/new' });

    rerender(<Layout />);

    expect(mockScrollTo).toHaveBeenCalledTimes(1);
    expect(mockScrollTo).toHaveBeenCalledWith({ top: 0 });
  });
});
