import { useState, useContext, useEffect } from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Chip,
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
    useMediaQuery,
    TextField,
    Autocomplete
} from '@mui/material';
import { UserContext } from '../store/user/userContext';


// third party
import * as Yup from 'yup';
import { useFormik } from 'formik';

// project imports
import useScriptRef from '../hook/useScriptRef';
import AnimateButton from '../components/animateButton';
import ToggleLanguage from '../components/toggleLanguage';
import FileUploader from '../components/fileUploader';
//multilanguae Support
// import { name, allergens, content, confirm , price} from '../store/multiLanguageConstant'
const Product = ({ ...others }) => {
    const theme = useTheme();

    const formik = useFormik(
        {
            initialValues: {
                name: '',
                content: '',
                allergenWarnings: '',
                salesType: null,
                categories: [

                ],
                price: null,
                submit: null
            },
            onSubmit: values => {
                console.log(values);
            },
        }
    );

    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [inputValue, setInputValue] = useState('')

    const handleChangeName = (event) => {
        formik.setFieldValue(`name`, event.target.value);
    };

    const handleChangeContent = (event) => {
        formik.setFieldValue(`content`, event.target.value);
    };
    const handleChangeAllergenWarnings = (event) => {
        formik.setFieldValue(`allergenWarnings`, event.target.value);
    };

    const handleChangePrice = (event) => {
        formik.setFieldValue(`price`, event.target.value);
    };

    const handleChangeSelectedCategory = (value) => {
        setSelectedCategories(value)
        formik.setFieldValue(`categories`, value);
    }

    useEffect(() => {
        // fill from service it just fakedata 
        setCategories([
            {
                id: "qwer2134",
                name: "test"
            },
            {
                id: "rr21123",
                name: "deneme"
            }
        ])
    }, [])

    return (
        <>
            <Grid container direction="row" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="flex-start">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">{formik.values.name || 'Produkt Form'}</Typography>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FileUploader />
                </Grid>
            </Grid>
            <form noValidate onSubmit={formik.handleSubmit} >
                <Grid container direction="row" justifyContent="center" spacing={2}>
                    <Grid item xs={12} container alignItems="center" justifyContent="flex-start">
                        <TextField
                            fullWidth
                            error={Boolean(formik.touched.name && formik.errors.name) || !formik.values.name} 
                            label="Name"
                            id="adornment-name-register" type="text"
                            value={formik.values.name || ''}
                            name="name"
                            onBlur={formik.handleBlur}
                            onChange={(event) => handleChangeName(event)} />
                    </Grid>
                    <Grid item xs={12} container alignItems="center" justifyContent="flex-start">
                        <TextField
                            fullWidth
                            sx={ theme.typography.multilineText}
                            error={Boolean(formik.touched.content && formik.errors.content) || !formik.values.content} 
                            label="Inhalt"
                            id="adornment-content-register" type="text"
                            value={formik.values.content || ''}
                            multiline={true}
                            rows={3}
                            name="content"
                            onBlur={formik.handleBlur}
                            onChange={(event) => handleChangeContent(event)} />
                    </Grid>
                    <Grid item xs={12} container alignItems="center" justifyContent="flex-start">
                        <TextField
                            fullWidth
                            sx={ theme.typography.multilineText}
                            label="Allergene"
                            id="dornment-allergenWarnings-register" type="text"
                            value={formik.values.allergenWarnings || ''}
                            multiline={true}
                            rows={3}
                            name="allergenWarnings"
                            onBlur={formik.handleBlur}
                            onChange={(event) => handleChangeAllergenWarnings(event)} />
                    </Grid>
                    <Grid item sm={6} xs={12} container alignItems="center" justifyContent="flex-start">
                        <TextField
                            fullWidth
                            label="Preis"
                            id="outlined-adornment-price-register" type="number"
                            value={formik.values.price || ''}
                            name="allergenWarnings"
                            onBlur={formik.handleBlur}
                            onChange={(event) => handleChangePrice(event)} />
                    </Grid>
                    <Grid item sm={6} xs={12} container alignItems="center" justifyContent="flex-start">
                        <Autocomplete
                            fullWidth
                            value={selectedCategories}
                            onChange={(event, newValue) => {
                                console.log(newValue)
                                handleChangeSelectedCategory(newValue)
                            }}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                  <Chip
                                    variant="outlined"
                                    label={option.name}
                                    size="small"
                                    {...getTagProps({ index })}
                                  />
                                ))
                              }
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            // defaultValue={selectedCategories}
                            multiple={true}
                            id="categories"
                            options={categories}
                            // getOptionLabel={(option) => option.name || ''}
                            getOptionLabel={(option) => {
                                // e.g value selected with enter, right from the input
                                if (typeof option === 'string') {
                                    return option;
                                }
                                if (option.inputValue) {
                                    return option.inputValue;
                                }
                                return option.name;
                            }}

                            renderInput={(params) => <TextField {...params} label="Kategorien" />}
                        />

                    </Grid>
                </Grid>
                {formik.errors.submit && (
                    <Box sx={{ mt: 2}}>
                        <FormHelperText error>{formik.errors.submit}</FormHelperText>
                    </Box>
                )}
                <Box sx={{ mt: 2 }}>
                    <AnimateButton>
                        <Button disableElevation disabled={formik.isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                            Bestätigen
                        </Button>
                    </AnimateButton>
                </Box>
            </form>


        </>
    )
};


export default Product;