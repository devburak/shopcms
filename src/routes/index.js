
import { lazy } from 'react';
// project imports
import Loadable from '../layout/loadable';
import { useRoutes, Navigate, Routes, Route, Outlet, BrowserRouter as Router, } from 'react-router-dom';
// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import MainLayout from '../layout/main';
import usePrivateRoute from './PrivateRoute';
// dashboard routing
const Dashboard = Loadable(lazy(() => import('../pages/dasboard')));
// sample page routing
const SamplePage = Loadable(lazy(() => import('../pages/sample')));
const ProductPage = Loadable(lazy(() => import('../pages/product')));
const CategoryListPage = Loadable(lazy(() => import('../pages/categoryList')));
const CategoryPage = Loadable(lazy(() => import('../pages/category')));
// login option 3 routing
const Login = Loadable(lazy(() => import('../pages/login')));
const Signup = Loadable(lazy(() => import('../pages/signup')));

const MinimalLayout = () => (
  <>
    <Outlet />
  </>
);

// ==============================|| ROUTING RENDER ||============================== //

// export default function ThemeRoutes() {
//   return useRoutes([MainRoutes, AuthenticationRoutes ]);
// }

export default function ThemeRoutes() {
  const isLoggedIn = usePrivateRoute();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<MainLayout />}>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/sample-page" element={<SamplePage />} />
              <Route path="/product/:productId?" element={<ProductPage />} />
              <Route path="/categories" element={<CategoryListPage />} />
              <Route path="/category/:categoryId?" element={<CategoryPage />} />
            </>
          ) : (
            <Route path="/login" element={<Login />} />
          )}
        </Route>
    </Routes>
  );
}