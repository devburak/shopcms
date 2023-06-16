import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Typography,ListItemButton ,ListItemIcon,ListItemText} from '@mui/material';
import { UserContext } from '../store/user/userContext';

import config from '../config';
const Logout = () => {
  const {logout} = useContext(UserContext);
  const navigate = useNavigate()
  const handleLogout = () => {
    //  storage'teki ilgili anahtarları temizle
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');

    // UserContext üzerinde logout işlemini tetikle
    logout({ type: 'LOGOUT' });
     localStorage.setItem('logout', String(Date.now()));
    // Yönlendirme yap (/login sayfasına)
    return navigate("/login" ,{replace:true })

  };

  return (
    <ListItemButton
    sx={{ borderRadius: `${config.borderRadius}px` }}
    onClick={handleLogout}
  >
    <ListItemIcon>
      <LogoutIcon />
    </ListItemIcon>
    <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
  </ListItemButton>
  );
};

export default Logout;
