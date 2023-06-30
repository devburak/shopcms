import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, IconButton } from '@mui/material';
import { Formik, Form, Field, useFormik } from 'formik';
import * as yup from 'yup';
import ImageIcon from '@mui/icons-material/Image';

import { createSlug } from '../../utils/string';
import FileSelector from '../file/fileSelector';

const validationSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    slug: yup.string().required('Slug is required')
});

const ImagePreview = ({ image, buttonClick }) => {
    return (
        <div>
            {image?.thumbnailUrl ? (
                <img src={image?.thumbnailUrl} alt="Selected Image" onClick={buttonClick} />
            ) : (
                <Button variant="outlined" sx={{ height: 80 }} onClick={buttonClick} startIcon={<ImageIcon />}>
                    Choose Image
                </Button>
            )}
        </div>
    );
};




const CategoryForm = ({ initialValues, onSubmit }) => {


    const formik = useFormik(
        {
            initialValues: initialValues,
            validationSchema,
            onSubmit: values => {
                console.log(values);
                onSubmit(values)
            },
            
        }
    );

    useEffect(() => {
        if (initialValues) {
          formik.setValues(initialValues);
        }
      }, [initialValues]);
      
    const [image, setImage] = useState([initialValues?.image]);
    const [openSelector, setOpenSelector] = useState(false)

    // Resim seçme işlevi
    const handleSelectImage = (file) => {
        setImage((prevSelectedImages) => {
            const imageIndex = prevSelectedImages.findIndex((image) => image._id === file._id);
            if (imageIndex !== -1) {
                // Image exists in the array, remove it
                return prevSelectedImages.filter((image) => image._id !== file._id);
            } else {
                // Image does not exist in the array, add it
                return [file];
            }
        });
    };

    useEffect(()=>{
        console.log('formik Values' , formik.values , formik.initialValues )
        if(image[0]?._id){
            formik.setFieldValue('image', image[0]);
        }else{
            formik.setFieldValue('image', {});
        }
    },[image])

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="title"
                            label="Title"
                            variant="outlined"
                            fullWidth
                            value={formik.values.title}
                            onChange={(event) => {
                                formik.setFieldValue('title', event.target.value);
                                if (!formik.initialValues.slug) {
                                    const slug = createSlug(event.target.value);
                                    formik.setFieldValue('slug', slug);
                                }
                            }}
                            error={formik.touched.title && formik.errors.title}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="description"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            value={formik.values.description}
                            onChange={(event) => formik.setFieldValue('description', event.target.value)}
                            error={formik.touched.description && formik.errors.description}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="slug"
                            label="Slug"
                            variant="outlined"
                            fullWidth
                            value={formik.values.slug}
                            onChange={(event) => formik.setFieldValue('slug', event.target.value)}
                            error={formik.touched.slug && formik.errors.slug}
                            helperText={formik.touched.slug && formik.errors.slug}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ImagePreview image={formik.values.image} buttonClick={() => setOpenSelector(true)} />
                        <FileSelector
                            open={openSelector}
                            handleClose={() => setOpenSelector(false)}
                            selectedImages={image}
                            handleToggleImage={handleSelectImage}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {/* <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
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
                                    <ImagePreview image={image ? image : []} buttonClick={() => setOpenSelector(true)} />
                                    <FileSelector
                                        open={openSelector}
                                        handleClose={() => setOpenSelector(false)}
                                        selectedImages={image}
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
            </Formik> */}
        </>

    );
};

export default CategoryForm;
