import { Navigate, Outlet } from 'react-router-dom';

import { Loader } from '@/components';
import { ROUTES } from '@/config';
import { useCurrentUser } from '@/hooks';

const PrivateRoutes = () => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loader fullScreen />;
  }

  if (user?.role === 'admin') {
    return <Outlet />;
  }

  return <Navigate to={ROUTES.ADMIN_PANEL} replace />;
};

export default PrivateRoutes;
