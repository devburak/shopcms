import { lazy } from 'react';
import PrivateRoute from './PrivateRoute'
import { Navigate , Routes,Route, BrowserRouter as Router,} from 'react-router-dom';
// project imports
// mainLayout
import MainLayout from '../layout/main';
import Loadable from '../layout/loadable';
// import { useRoutes , Navigate ,Routes , Route} from 'react-router-dom';
// dashboard routing
const Dashboard = Loadable(lazy(() => import('../pages/dasboard')));
// sample page routing
const SamplePage = Loadable(lazy(() => import('../pages/sample')));
const ProductPage = Loadable(lazy(() => import('../pages/product')));
const isAuthenticated = !!sessionStorage.getItem('accessToken');
// ==============================|| MAIN ROUTING ||============================== //

// const MainRoutes = {
//   path: '/',
//   element: <MainLayout />,
  
//   children: [
//     {
//       index: true,
//       element: <PrivateRoute  element={<Dashboard />} />
//     },
//     {
//       path: '/sample-page/*',
//       element: <PrivateRoute element={<SamplePage />} />
//     },
//     {
//       path: '/product/*',
//       element: <PrivateRoute element={<ProductPage />} />
//     }
//   ]
// };


const MainRoutes = () => {
  // return (
  //   <Routes>
  //     <Route path="/" element={<MainLayout />} />
  //     <Route path="/" element={<PrivateRoute> // PrivateRoute component wraps the protected routes
  //       <Route index element={<Dashboard />} />
  //       <Route path="sample-page" element={<SamplePage />} />
  //       <Route path="product" element={<ProductPage />} />
  //     </PrivateRoute>} />
  //   </Routes>
  // );
 
};



export default MainRoutes;
