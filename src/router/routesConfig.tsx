import { lazy, Suspense } from 'react';

import { Layout, Loader } from '@/components';
import { ROUTES } from '@/config';
import { Gallery, Home, ServiceDetails, Services } from '@/pages';

import PrivateRoutes from './PrivateRoutes';

const Contacts = lazy(() => import('@/pages/Contacts'));
const Terms = lazy(() => import('@/pages/Terms'));
const AdminLogin = lazy(() => import('@/pages/AdminLogin'));
const AdminPanel = lazy(() => import('@/pages/AdminPanel'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const routesConfig = [
  {
    path: ROUTES.HOME,
    element: <Layout />,
    errorElement: (
      <Suspense fallback={<Loader fullScreen />}>
        <NotFound />
      </Suspense>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES.SERVICE_DETAILS, element: <ServiceDetails /> },
      { path: ROUTES.SERVICES, element: <Services /> },
      {
        path: ROUTES.CONTACTS,
        element: (
          <Suspense fallback={<Loader fullScreen />}>
            <Contacts />
          </Suspense>
        ),
      },
      {
        path: ROUTES.TERMS,
        element: (
          <Suspense fallback={<Loader fullScreen />}>
            <Terms />
          </Suspense>
        ),
      },
      { path: ROUTES.GALLERY, element: <Gallery /> },
      {
        path: ROUTES.ADMIN_LOGIN,
        element: (
          <Suspense fallback={<Loader fullScreen />}>
            <AdminLogin />
          </Suspense>
        ),
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: ROUTES.ADMIN_PANEL,
            element: (
              <Suspense fallback={<Loader fullScreen />}>
                <AdminPanel />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<Loader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
];

export default routesConfig;
