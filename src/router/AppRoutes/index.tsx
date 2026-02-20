import { createHashRouter, RouterProvider } from 'react-router-dom';

import routesConfig from '../routesConfig';

const router = createHashRouter(routesConfig);

const AppRoutes: React.FC = () => <RouterProvider router={router} />;
export default AppRoutes;
