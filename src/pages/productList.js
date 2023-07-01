import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import ProductListForm from '../components/product/productList';


const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [info,setInfo] = useState({})
  const [rowCount , setRowCount] = useState(0)
  const navigate = useNavigate();


  const [sortModel, setSortModel] = useState([
    {
      field: 'title',
      sort: 'asc'
    }
  ]);
  const [pageModel, setPageModel] = useState({
    page: 1,
    pageSize: 25
  });

  const handleEditProduct = (id) => {
    // Yönlendirme işlemi
    navigate('/product/' + id);

  };

  const handleDeleteProduct = (id) => {
    // Silme işlemi için gerekli işlemler burada gerçekleştirilebilir
    console.log('Delete category with id:', id);
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get(`/api/product`, {
        params: {
          page: pageModel.page,
          limit: pageModel.pageSize,
          sort: sortModel.map((item) => `${item.field}:${item.sort}`).join(","),
        },
      });
      const { docs, ...info } = response.data;
      console.log(info)
      setProducts(docs);
      setInfo(info)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSortModelChange = (model) => {
    setSortModel(model);

  };

  const handlePageChange = (params) => {
    setPageModel(params);

  };

  useEffect(() => {
    fetchProducts();
  }, [pageModel, sortModel]);

  useEffect(() => {
    setRowCount((prevRowCount) =>
      info?.totalDocs !== undefined
        ? info?.totalDocs
        : prevRowCount,
    );
  }, [info])

  

  return (
    <div>
      <h2>Ürün Listesi</h2>
      <ProductListForm
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        pageModel={pageModel}
        sortModel={sortModel}
        handlePageChange={handlePageChange}
        onSortModelChange={handleSortModelChange}
        rowCount={rowCount}
      />
    </div>
  );
};

export default ProductListPage;
