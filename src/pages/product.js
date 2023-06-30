import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';

// project imports
import MainCard from '../layout/area/mainCard';
import Product from '../components/forms/product';
import api from '../api';
import GenericAlert from '../components/genericAlert';

const ProductPage = () => {
    const { productId } = useParams();
    const [initialValues, setInitialValues] = useState({
        name: '',
        content: '',
        allergenWarnings: '',
        salesType:'',
        discount:{},
        categories:[],
        stock:0,
        price:0,
        storedFiles: []
    });

    const getProduct = async (id) => {
        try {
            const response = await api.get(`/api/product/byid/${id}`);
            setInitialValues(response.data)
            console.log(initialValues)
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request cancelled');
            } else {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        if (productId) {
            getProduct(productId);
        }
    }, [productId]);

    const onSubmitForm = async (values)=>{
        console.log(values)
        try {
            if (productId) {
              // Kategori güncelleme isteği
              await api.put(`/api/product/${productId}`, {...values});
              GenericAlert.success('Product successfully updated!');
            } else {
              // Yeni kategori oluşturma isteği
              await api.post('/api/product', {...values});
              GenericAlert.success('Product successfully created!');
            }
          } catch (error) {
            GenericAlert.error('An error occurred. Please try again.');
          }
       
    }

    return (
        <MainCard title="Product Card">
            <Product initialValues={initialValues}  onSubmit={onSubmitForm}/>
        </MainCard>
    )
};

export default ProductPage;
