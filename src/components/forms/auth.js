import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from '../../hook/useScriptRef';
import AnimateButton from '../animateButton';
import { UserContext } from '../../store/user/userContext';
// assets
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import api from '../../api';
// ============================|| FIREBASE - LOGIN ||============================ //

const LoginForm = ({ ...others }) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();
  // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [checked, setChecked] = useState(true);
  const {state,dispatch} = useContext(UserContext)

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const getUserProfile = async () => {
    try {
      const response = await api.get('/api/profile');
      const { username, role , userId,name,email,phone } = response.data?.user;
      if (username && role && userId && !state.isLoggedIn) {
        
        dispatch({ type: 'LOGIN', payload:{isLoggedIn: true, username, role, userId, name:'aaa', email, phone} });
      }
    } catch (error) {
      // Hata durumunda gerekli işlemler
      console.log('profile alınamadı')
    }
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
       
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign in with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          identifier: '',
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          identifier: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
         
            try {
              const response = await api.post('/api/user/login', values);
              const { accessToken, refreshToken } = response.data;
        
              sessionStorage.setItem('accessToken', accessToken);
              sessionStorage.setItem('refreshToken', refreshToken);
               await  getUserProfile();
              if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
              }
               navigate("/" ,{replace:true })
           
            } catch (error) {
              if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: error.message });
              setSubmitting(false);
              }
            }
          
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.identifier && errors.identifier)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.identifier}
                name="identifier"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.identifier && errors.identifier && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {errors.identifier}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)} name="checked" color="primary" />
                }
                label="Remember me"
              />
              <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Forgot Password?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
