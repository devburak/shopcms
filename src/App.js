
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
// defaultTheme
import themes from './themes';
import config from './config';
// routing
import Routes from './routes';
//context Providers
import { MenuProvider } from './store/menu/menuContext';

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
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(initialState)}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </StyledEngineProvider>
    </MenuProvider>
  );
}

export default App;
