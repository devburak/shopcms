import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// project imports
import MainCard from '../layout/area/mainCard';
import Product from '../components/forms/product';
import api from '../api';

const ProductPage = () => {
    const { productId } = useParams();
    
    const getProduct = async (id) => {
        try {
            const response = await api.get(`/api/product/byid/${id}`);
            console.log(response.data);
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


    return (
        <MainCard title="Produktkarte">
            <Product />
        </MainCard>
    )
};

export default ProductPage;
