import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import routesConfig from '../routesConfig';

const router = createBrowserRouter(routesConfig, {
  basename: import.meta.env.BASE_URL,
});

const AppRoutes: React.FC = () => <RouterProvider router={router} />;
export default AppRoutes;
