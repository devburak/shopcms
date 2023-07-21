import { useState, useEffect } from 'react';
import AnimateButton from '../animateButton';
// material-ui
import { useTheme } from '@mui/material/styles';
// third party
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
    Grid,
    Box,
    Typography,
    TextField,
    Button,IconButton,InputAdornment
} from '@mui/material';
import { strengthColor, strengthIndicator } from '../../utils/password-strength';

// assets
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const validationSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    code: yup.string().required('Code is required'),
    password: yup.string().max(255).required('Password is required'),
    repassword: yup.string()
        .test('passwords-match', 'Passwords must match', function (value) {
            return this.parent.password === value
        })
});

const ResetPassword = ({ initialValues, onSubmit }) => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();
    const [isSubmitting,setIsSubmitting] = useState(false)

    const formik = useFormik(
        {
            initialValues: initialValues ,
            validationSchema,
            onSubmit: values => {
                console.log(values);
                setIsSubmitting(true)
                onSubmit(values)
            },
        }
    );

    const changePassword = (value) => {
        formik.setFieldValue('password', value);
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    // useEffect(() => {
    //     changePassword('');
    // }, []);

    useEffect(() => {
        if (initialValues) {
            formik.setValues(initialValues);
        }
    }, [initialValues])

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Get code for password reset</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="code"
                        label="Reset Code"
                        variant="outlined"
                        fullWidth
                        value={formik.values.code || ''}
                        onChange={(event) => {
                            formik.setFieldValue('code', event.target.value);
                        }}
                        error={!!formik.errors.code && formik.touched.code}
                        helperText={formik.touched.code && formik.errors.code}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="email"
                        label="E-mail"
                        variant="outlined"
                        fullWidth
                        value={formik.values.email || ''}
                        onChange={(event) => {
                            formik.setFieldValue('email', event.target.value);
                        }}
                        error={!!formik.errors.email && formik.touched.email}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        value={formik.values.password || ''}
                        onChange={(event) => {
                            changePassword(event.target.value)
                        }}
                        error={!!formik.errors.password && formik.touched.password}
                        helperText={formik.touched.password && formik.errors.password}
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                {strength !== 0 && (
                    <Grid item xs={12}>
                        <Box sx={{ mb: 2 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1" fontSize="0.75rem">
                                        {level?.label}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                )}
               
                <Grid item xs={12}>
                    <TextField
                        name="repassword"
                        label="Re-Password"
                        variant="outlined"
                        fullWidth
                        value={formik.values.repassword || ''}
                        type={showPassword ? 'text' : 'password'}
                        onChange={(event) => {
                            formik.setFieldValue('repassword', event.target.value);
                        }}
                        error={!!formik.errors.repassword && formik.touched.repassword}
                        helperText={formik.touched.repassword && formik.errors.repassword}
                    />
                </Grid>
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                            Submit
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>
        </form>

    )
}

export default ResetPassword