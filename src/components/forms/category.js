import React ,{useEffect, useState} from 'react';
import { Button, Grid, TextField, IconButton } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import ImageIcon from '@mui/icons-material/Image';

import { createSlug } from '../../utils/string';
import FileSelector from '../file/fileSelector';

const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    slug: yup.string().required('Slug is required'),
    imageUrl: yup.string(),
});

const ImagePreview = ({ imageUrl ,buttonClick}) => {
    return (
        <div>
            {imageUrl ? (
                <img src={imageUrl} alt="Selected Image" />
            ) : (
                <Button variant="outlined" sx={{height:80}} onClick={buttonClick} startIcon={<ImageIcon />}>
                    Choose Image
                </Button>
            )}
        </div>
    );
};


const CategoryForm = ({ initialValues, onSubmit }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [openSelector,setOpenSelector] = useState(false)
    // Resim seçme işlevi
    const handleSelectImage = (selectedImageUrl) => {
        setImageUrl(selectedImageUrl);
    };


    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
            {({ values, setFieldValue }) => (
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="title"
                                label="Title"
                                variant="outlined"
                                fullWidth
                                value={values.title}
                                onChange={(event) => {
                                    setFieldValue('title', event.target.value);
                                    if (!initialValues.slug) {
                                      const slug = createSlug(event.target.value);
                                      setFieldValue('slug', slug);
                                    }
                                  }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="description"
                                label="Description"
                                variant="outlined"
                                fullWidth
                                value={values.description}
                                onChange={(event) => setFieldValue('description', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="slug"
                                label="Slug"
                                variant="outlined"
                                fullWidth
                                value={values.slug}
                                onChange={(event) => setFieldValue('slug', event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid item xs={12}>
                                <ImagePreview imageUrl={imageUrl}  buttonClick ={()=>setOpenSelector(true)}/>
                                <FileSelector
                                    open={openSelector}
                                    handleClose={() => setOpenSelector(false)}
                                    images={initialValues?.imageUrl|| []}
                                    selectedImages={imageUrl ? [imageUrl] : []}
                                    handleToggleImage={handleSelectImage}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>

    );
};

export default CategoryForm;
