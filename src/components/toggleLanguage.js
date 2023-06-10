
import PropTypes from 'prop-types';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';

// ==============================|| ToggleLanguage Buttons ||============================== //
const ToggleLanguage = ({onChange,language}) => {

    return(
    <ToggleButtonGroup variant="outlined" value={language}
                        exclusive
                        onChange={onChange}
                        aria-label="Language">
                        <ToggleButton value='gr'>DEUTSCH</ToggleButton>
                        <ToggleButton value='tr'>TÜRKÇE</ToggleButton>
                        <ToggleButton value='en'>ENGLISH</ToggleButton>
                    </ToggleButtonGroup>)
  };


  ToggleLanguage.propTypes = {
    language: PropTypes.oneOf(['gr', 'tr', 'en']),
    onChange: PropTypes.func.isRequired
  };
  
  ToggleLanguage.defaultProps = {
    language: 'gr'
  };
  
  export default ToggleLanguage;
