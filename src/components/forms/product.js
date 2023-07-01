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
import ImageIcon from '@mui/icons-material/Image';

import { UserContext } from '../../store/user/userContext';
// third party
import * as yup from 'yup';
import { useFormik } from 'formik';

// project imports
import useScriptRef from '../../hook/useScriptRef';
import AnimateButton from '../animateButton';
import FileUploader from '../file/fileUploader';
import api from '../../api';
import FileSelector from '../file/fileSelector';


const validationSchema = yup.object().shape({
    name: yup.string().required('Title is required'),
    content: yup.string().required('Description is required'),
    allergenWarnings: yup.string().required('Slug is required')
});

const Product = ({ initialValues, onSubmit }) => {
    const theme = useTheme();

    const formik = useFormik(
        {
            initialValues: {...initialValues,storedFiles: []} ,
            validationSchema,
            onSubmit: values => {
                onSubmit(values)
                console.log(values);
            },
        }
    );

    const [categories, setCategories] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [openSelector, setOpenSelector] = useState(false);
    const [images, setImages] = useState([]);

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
        formik.setFieldValue(`categories`, value);
    }

    useEffect(() => {
        // Kategorilerin alınması
        api.get("/api/category/all")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    useEffect(() => {
        console.log(initialValues)
        if (initialValues) {
          formik.setValues(initialValues);
        }
      }, [initialValues]);

      useEffect(() => {
        console.log('Stored Files:', formik.values.storedFiles);
        // diğer işlemler...
      }, [formik.values.storedFiles]);

       // Resim seçme işlevi
    const handleSelectImages = (file) => {
        console.log('Selected File:', file);
        console.log('storedFiles:', formik.values.storedFiles);
        const storedFiles = formik.values.storedFiles || [];

        const imageIndex = storedFiles.findIndex((image) => image._id === file._id);
        if (imageIndex !== -1) {
          // Image exists in the array, remove it
          const updatedStoredFiles = storedFiles.filter((image) => image._id !== file._id);
          formik.setFieldValue('storedFiles', updatedStoredFiles);
        } else {
          // Image does not exist in the array, add it
          const updatedStoredFiles = [...storedFiles, file];
          formik.setFieldValue('storedFiles', updatedStoredFiles);
        }
        // setImages((prevSelectedImages) => {
        //     const imageIndex = prevSelectedImages.findIndex((image) => image._id === file._id);
        //     if (imageIndex !== -1) {
        //         // Image exists in the array, remove it
        //         return prevSelectedImages.filter((image) => image._id !== file._id);
        //     } else {
        //         // Image does not exist in the array, add it
        //         return [...prevSelectedImages, file];
        //     }
        // });
    };

    useEffect(()=>{
        formik.setFieldValue('storedFiles', images);
        // console.log('formik Values' ,  formik.values.storedFiles )
        // if(images?.length){
        //     formik.setFieldValue('storedFiles', images);
        // }else{
        //     formik.setFieldValue('storedFiles', []);
        // }

        console.log('formik Values' ,  formik.values.storedFiles )
        console.log(images)
    },[images])
    
    return (
        <>
            <Grid container direction="row" justifyContent="center" spacing={2}>
                <Grid item xs={6} container alignItems="center" justifyContent="flex-start">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">{formik.values.name || 'Product Form'}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={6} container alignItems="center" justifyContent="flex-end">
                    <Button variant="outlined"  onClick={()=>setOpenSelector(true)} startIcon={<ImageIcon />}>
                        Choose Image
                    </Button>
                    <FileSelector
                        open={openSelector}
                        handleClose={() => setOpenSelector(false)}
                        selectedFiles={formik.values.storedFiles}
                        handleToggleFiles={handleSelectImages}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ overflowX: 'auto', display:'flex' }}>
                  {
                    formik.values.storedFiles.map((file, index) => (
                        <Box key={index} sx={{ m: 2}}>  
                          <img src={file?.thumbnailUrl} alt={file?.filename} onClick={()=>handleSelectImages(file)} />
                        </Box>
                        ))
                  }
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
                            label="Content"
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
                            label="Allergens"
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
                            label="Price"
                            id="outlined-adornment-price-register" type="number"
                            value={formik.values.price || ''}
                            name="allergenWarnings"
                            onBlur={formik.handleBlur}
                            onChange={(event) => handleChangePrice(event)} />
                    </Grid>
                    <Grid item sm={6} xs={12} container alignItems="center" justifyContent="flex-start">
                        <Autocomplete
                            fullWidth
                            value={formik.values.categories}
                            isOptionEqualToValue={(option, value) => option._id === value._id}
                            onChange={(event, newValue) => {
                                console.log(newValue)
                                handleChangeSelectedCategory(newValue)
                            }}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                  <Chip
                                    variant="outlined"
                                    label={option.title}
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
                                return option.title;
                            }}

                            renderInput={(params) => <TextField {...params} label="Categories" />}
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
                        <Button   fullWidth size="large" type="submit" variant="contained" color="secondary">
                            Submit
                        </Button>
                    </AnimateButton>
                </Box>
            </form>


        </>
    )
};


export default Product;