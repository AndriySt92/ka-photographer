import { Navigate, Outlet } from 'react-router-dom';

import { useCurrentUser } from '@/hooks';

import { Loader } from '../';

const PrivateRoutes = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (user?.role === 'admin') {
    return <Outlet />;
  }

  return <Navigate to="/admin-login" replace />;
};

export default PrivateRoutes;
