import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// project imports
import MainCard from '../layout/area/mainCard';
import CategoryForm from '../components/forms/category';
import api from '../api';
import GenericAlert from '../components/genericAlert';

const Category = () => {
    const { categoryId } = useParams();
    const [initialValues, setInitialValues] = useState({
        title: '',
        description: '',
        slug: '',
        image: {},
    });

    const handleSubmit = async (values) => {
        try {
          if (categoryId) {
            // Kategori güncelleme isteği
            await api.put(`/api/category/${categoryId}`, {...values,image:values?.image?._id ||null});
            GenericAlert.success('Category successfully updated!');
          } else {
            // Yeni kategori oluşturma isteği
            await api.post('/api/category', {...values,image:values?.image?._id ||null});
            GenericAlert.success('Category successfully created!');
          }
        } catch (error) {
          GenericAlert.error('An error occurred. Please try again.');
        }
      };

    const getCategory = async (id) => {
        try {
            const response = await api.get(`/api/category/byid/${id}`);
            console.log(response.data);
            setInitialValues(response.data)
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request cancelled');
            } else {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        console.log('categoryId')
        if (categoryId) {
            getCategory(categoryId);
        }
    }, [categoryId]);


    return (
        <MainCard title="Category">
            <CategoryForm initialValues={initialValues} onSubmit={handleSubmit} />
        </MainCard>
    )
};

export default Category;
