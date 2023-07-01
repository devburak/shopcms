import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
const ProductListForm = ({ products, onEdit, onDelete,pageModel, sortModel,handlePageChange ,onSortModelChange,rowCount  }) => {

  const handleEditProduct = (id) => {
    // Düzenleme işlemi için gerekli navigasyon veya işlemler burada gerçekleştirilebilir
    onEdit(id);
  };

  const handleDeleteProduct = (id) => {
    // Silme işlemi için gerekli işlemler burada gerçekleştirilebilir
    onDelete(id);
  };

  const handleSortModelChange = React.useCallback((sortModel) => {
    // Here you save the data you need from the sort model
   console.log(sortModel)
   onSortModelChange(sortModel)
  }, []);

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    {
      field: 'content',
      headerName: 'Content',
      width: 200,
      valueGetter: (params) => {
        const { value } = params;
        if (value.length > 40) {
          return value.substr(0, 40) + '...';
        }
        return value;
      },
    },
    { field: 'price', headerName: 'Price', width: 120 },
    { field: 'stok', headerName: 'Stock', width: 120 },
    {
      field: 'categories',
      headerName: 'Categories',
      width: 200,
      valueGetter: (params) => {
        const { value } = params;
        if (value.length > 2) {
          const firstTwoCategories = value.slice(0, 2);
          return firstTwoCategories.map((category) => category.title).join(', ') + ' +';
        }
        return value.map((category) => category.title).join(', ');
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <>
          <button onClick={() => handleEditProduct(params.id)}>Edit</button>
          <button onClick={() => handleDeleteProduct(params.id)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div style={{ minHeight: 400, width: '100%' }}>
      {products ?
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row._id}
          disableColumnMenu={true}
          sortingMode="server"
          onSortModelChange={handleSortModelChange}
          onPageSizeChange={handlePageChange}
          onPageChange={handlePageChange}
          disableColumnSelector={true}
          disableRowSelectionOnClick={true}
          onPaginationModelChange={handlePageChange}
          paginationMode='server'
          paginationModel={pageModel}
          sortModel={sortModel}
          rowCount={rowCount}
          sx={{ minHeight: 400 }}
        /> :
        " ...loading"}
    </div>
  );
};
ProductListForm.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      stok: PropTypes.number.isRequired,
      categories: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};


export default ProductListForm;
