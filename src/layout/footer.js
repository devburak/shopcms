// material-ui
import { Link, Typography, Stack } from '@mui/material';
import config from '../config'
// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //
const currentYear = new Date().getFullYear();
const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://lemonbistroshop.ch" target="_blank" underline="hover">
      {currentYear} - {'version : ' +config.version}
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://lemonbistroshop.ch" target="_blank" underline="hover">
      &copy; lemonbistroshop.ch
    </Typography>
  </Stack>
);

export default AuthFooter;