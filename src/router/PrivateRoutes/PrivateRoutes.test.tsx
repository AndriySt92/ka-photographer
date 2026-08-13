import { Route, Routes } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { renderWithRouter } from 'tests';

import { useCurrentUser } from '@/hooks';

import PrivateRoutes from './';

jest.mock('@/hooks', () => ({
  useCurrentUser: jest.fn(),
}));

jest.mock('@/components', () => {
  const { MockLoader } = jest.requireActual('tests');

  return {
    Loader: MockLoader,
  };
});

jest.mock('@/config', () => ({
  ROUTES: {
    ADMIN_LOGIN: '/admin-login',
    ADMIN_PANEL: '/admin-panel',
  },
}));

const TestComponent = () => <div data-testid="protected-content">Protected</div>;

describe('PrivateRoutes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows Loader when isLoading is true', () => {
    (useCurrentUser as jest.Mock).mockReturnValue({ data: null, isLoading: true });

    renderWithRouter(
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/protected" element={<TestComponent />} />
        </Route>
      </Routes>,
      { initialEntries: ['/protected'] },
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('renders children when user is admin', () => {
    (useCurrentUser as jest.Mock).mockReturnValue({ data: { role: 'admin' }, isLoading: false });

    renderWithRouter(
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/protected" element={<TestComponent />} />
        </Route>
      </Routes>,
      { initialEntries: ['/protected'] },
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });

  it('redirects to admin login when user is not admin', () => {
    (useCurrentUser as jest.Mock).mockReturnValue({ data: { role: 'user' }, isLoading: false });

    renderWithRouter(
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/protected" element={<TestComponent />} />
        </Route>
        <Route path="/admin-login" element={<div data-testid="admin-login-page" />} />
      </Routes>,
      { initialEntries: ['/protected'] },
    );

    expect(screen.getByTestId('admin-login-page')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });
});
