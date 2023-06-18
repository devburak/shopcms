import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProductListForm from './ProductListForm';
import { getProductList, deleteProduct } from '../api/productApi';

const ProductListPage = () => {
  const history = useHistory();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Ürün listesini API'den çekme
    fetchProductList();
  }, []);

  const fetchProductList = async () => {
    try {
      const productList = await getProductList(); // Ürün listesini API'den çekme fonksiyonu
      setProducts(productList);
    } catch (error) {
      console.log('Ürün listesi alınamadı', error);
    }
  };

  const handleEditProduct = (productId) => {
    // Seçilen ürünün düzenleme sayfasına yönlendirme
    history.push(`/product/${productId}`);
  };

  const handleDeleteProduct = async (productId) => {
    // Ürünü silme işlemi
    try {
      await deleteProduct(productId); // Ürünü silme API fonksiyonu
      fetchProductList(); // Ürün listesini güncelleme
    } catch (error) {
      console.log('Ürün silinemedi', error);
    }
  };

  return (
    <div>
      <h2>Ürün Listesi</h2>
      <ProductListForm
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

export default ProductListPage;
