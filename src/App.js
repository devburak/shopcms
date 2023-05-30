
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
// defaultTheme
import themes from './themes';
import config from './config';
import Login from "./pages/login";
// routing
import Routes from './routes';
function App() {

  const initialState = {
    isOpen: [], // for active default menu
    defaultId: 'default',
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(initialState)}>
        <CssBaseline />

        <Routes />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
