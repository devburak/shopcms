
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
// defaultTheme
import themes from './themes';
import config from './config';
// routing
import Routes from './routes';
//context Providers
import { MenuProvider } from './store/menu/menuContext';
import { UserProvider } from './store/user/userContext';
function App() {

  const initialState = {
    isOpen: [], // for active default menu
    defaultId: 'default',
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true
  };

  return (
    <MenuProvider >
      <UserProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={themes(initialState)}>
            <CssBaseline />
            <Routes />
          </ThemeProvider>
        </StyledEngineProvider>
      </UserProvider>
    </MenuProvider>
  );
}

export default App;
