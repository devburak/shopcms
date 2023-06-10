import { lazy } from 'react';

// project imports
// mainLayout
import MainLayout from '../layout/main';
import Loadable from '../layout/loadable';

// dashboard routing
const Dashboard = Loadable(lazy(() => import('../pages/dasboard')));
// sample page routing
const SamplePage = Loadable(lazy(() => import('../pages/sample')));
const ProductPage = Loadable(lazy(() => import('../pages/product')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'product',
      element: <ProductPage />
    }
  ]
};

export default MainRoutes;
