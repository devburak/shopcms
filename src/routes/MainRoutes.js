import { lazy } from 'react';

// project imports
// mainLayout
import MainLayout from '../layout/main';
import Loadable from '../layout/loadable';

// dashboard routing


// sample page routing
const SamplePage = Loadable(lazy(() => import('../pages/sample')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    
    {
      path: 'sample-page',
      element: <SamplePage />
    }
  ]
};

export default MainRoutes;
