import { Link } from 'react-router-dom';
import config from '../config';
// material-ui
import { ButtonBase } from '@mui/material';


// ==============================|| MAIN LOGO ||============================== //

const Logo = () => {
  return (
    <ButtonBase disableRipple onClick={() => console.log('menu logo click')} component={Link} to={config.defaultPath}>
        {config.name}
    </ButtonBase>
  );
};
export default Logo;