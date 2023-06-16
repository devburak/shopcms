import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { UserContext } from '../store/user/userContext';

const usePrivateRoute = () => {
  const { state } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isLoggedIn) {
      navigate('/login');
    }
  }, [state.isLoggedIn, navigate]);

  return state.isLoggedIn;
};

export default usePrivateRoute;

