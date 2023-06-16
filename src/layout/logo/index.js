import { useContext } from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import { MenuContext } from '../../store/menu/menuContext';
// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from '../../config';
import Logo from './logo';
// import { MENU_OPEN } from 'store/actions';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
    const {state , dispatch} = useContext(MenuContext)
  return (
    <ButtonBase disableRipple onClick={() => dispatch({ type: 'MENU_OPEN', id: state.defaultId })} component={Link} to={config.defaultPath}>
      <Logo/>
    </ButtonBase>
  );
};

export default LogoSection;