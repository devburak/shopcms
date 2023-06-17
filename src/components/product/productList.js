import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
const ProductList = ({ products, onEdit, onDelete }) => {
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
          <button onClick={() => onEdit(params.row)}>Edit</button>
          <button onClick={() => onDelete(params.row)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={products} columns={columns} />
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
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};


export default ProductList;
