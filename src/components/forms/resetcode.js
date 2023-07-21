import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
// third party
import * as yup from 'yup';
import { useFormik } from 'formik';
// project imports
import useScriptRef from '../../hook/useScriptRef';
import AnimateButton from '../animateButton';

import {
    Grid,
    Box,
    Typography,
    TextField,
    Button
} from '@mui/material';

const validationSchema = yup.object().shape({
    email: yup.string().email().required('Email is required')
});

const ResetCodeForm = ({ initialValues, onSubmit }) => {
    const theme = useTheme();
    const [isSubmitting,setIsSubmitting] = useState(false)
    const formik = useFormik(
        {
            initialValues: initialValues,
            validationSchema,
            onSubmit: values => {
                console.log(values);
                setIsSubmitting(true)
                onSubmit(values)
            },
        }
    );
    useEffect(() => {
        if (initialValues) {
            formik.setValues(initialValues);
        }
    }, [initialValues]);

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
                        name="email"
                        label="E-mail"
                        variant="outlined"
                        fullWidth
                        value={formik.values.email}
                        onChange={(event) => {
                            formik.setFieldValue('email', event.target.value);
                        }}
                        error={!!formik.errors.email && formik.touched.email}
                        helperText={formik.touched.email && formik.errors.email}
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

export default ResetCodeForm;