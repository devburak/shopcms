import PropTypes from 'prop-types';

// material-ui
import { Box } from '@mui/material';
// project import
import MainCard from '../cards/mainCard';
import { styled } from '@mui/material/styles';
// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapper = ({ children, ...other }) => (
  <MainCard
    sx={{
      maxWidth: { xs: 400, lg: 475 },
      margin: { xs: 2, md: 2.5 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%'
      }
    }}
    content={false}
    {...other}
  >
    <Box sx={{ p: { xs: 1, sm: 2, xl: 3 } }}>{children}</Box>
  </MainCard>
);

AuthCardWrapper.propTypes = {
  children: PropTypes.node
};

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

export const AuthWrapper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    minHeight: '100vh'
  }));

export default AuthCardWrapper;
