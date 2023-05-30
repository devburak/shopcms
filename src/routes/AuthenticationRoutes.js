import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
// project imports
import Loadable from '../layout/loadable';

// login option 3 routing
const Login = Loadable(lazy(() => import('../pages/login')));
const Signup = Loadable(lazy(() => import('../pages/signup')));

const MinimalLayout = () => (
  <>
    <Outlet />
   
  </>
);
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/user/register',
      element: <Signup />
    }
  ]
};

export default AuthenticationRoutes;
