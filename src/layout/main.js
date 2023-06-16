import { Outlet } from 'react-router-dom';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
import { drawerWidth } from '../store/constant';
import Sidebar from './sidebar/sidebar'
import { useContext } from 'react';
import { MenuContext } from '../store/menu/menuContext';
import Header from './header';
// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    ...theme.typography.mainContent,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create(
        'margin',
        open
            ? {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }
            : {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }
    ),
    [theme.breakpoints.up('md')]: {
        marginLeft: open ? 0 : -(drawerWidth - 20),
        width: `calc(100% - ${drawerWidth}px)`
    },
    [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px'
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
        marginRight: '10px'
    }
}));

const MainLayout = () => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const { state, dispatch } = useContext(MenuContext)
    // Handle left drawer
    const leftDrawerOpened = state.opened;

    const handleLeftDrawerToggle = () => {
        dispatch({ type: 'SET_MENU', opened: !leftDrawerOpened });
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* header */}
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}
            >
                <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
            </AppBar>
            <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />
            <Main theme={theme} open={leftDrawerOpened}>
                <Outlet />
            </Main>
        </Box>
    )
}

export default MainLayout;