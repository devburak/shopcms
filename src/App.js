import React, { useEffect,useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
// defaultTheme
import themes from './themes';
import config from './config';
// routing
import Routes from './routes';
import { UserContext } from './store/user/userContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import api from './api';
function App() {
  const navigate = useNavigate();
  const {state} = useContext(UserContext)
  api.setNavigate(navigate);
  const initialState = {
    isOpen: [], // for active default menu
    defaultId: 'default',
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true
  };

  useEffect(() => {
    if (!sessionStorage.length) {
      // Diğer sekmelere sessionStorage verilerini talep et
      localStorage.setItem("getSessionStorage", String(Date.now()));
    }

    const handleStorageEvent = (event) => {
      if (event.key === "getSessionStorage") {
        // Bir sekme sessionStorage verilerini talep etti -> gönder
        localStorage.setItem("sessionStorage", JSON.stringify(sessionStorage));
        localStorage.removeItem("sessionStorage");
      } else if (event.key === "sessionStorage" && !sessionStorage.length) {
        // sessionStorage boş -> doldur
        const data = JSON.parse(event.newValue);
        for (let key in data) {
          sessionStorage.setItem(key, data[key]);
        }
      }
    };

    window.addEventListener("storage", handleStorageEvent);

    return () => {
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, []);

  useEffect(() => {
    const syncLogout = (event) => {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        // localStorage.removeItem("sessionStorage");
        // sessionStorage.removeItem('accessToken');
        // sessionStorage.removeItem('refreshToken');
        navigate('/login');
      }
    };

    window.addEventListener('storage', syncLogout);
    console.log('app' , state)
    return () => {
      window.removeEventListener('storage', syncLogout);
    };
   
  }, [navigate]);


  return (
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={themes(initialState)}>
          <ToastContainer />
            <CssBaseline />
            <Routes />
          </ThemeProvider>
        </StyledEngineProvider>
  );
}

export default App;
