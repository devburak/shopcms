import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';

const CategoryList = ({ categories, onEdit, onDelete, pageModel, sortModel, handlePageChange, onSortModelChange, rowCount }) => {

    const handleEditCategory = (id) => {
        // Düzenleme işlemi için gerekli navigasyon veya işlemler burada gerçekleştirilebilir
        onEdit(id);
    };

    const handleDeleteCategory = (id) => {
        // Silme işlemi için gerekli işlemler burada gerçekleştirilebilir
        onDelete(id);
    };

    const handleSortModelChange = React.useCallback((sortModel) => {
        // Here you save the data you need from the sort model
        console.log(sortModel)
        onSortModelChange(sortModel)
    }, []);


    const columns = [
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 1 },
        { field: 'numOfProducts', headerName: 'Products Number', flex: 1 },
        {
            field: 'edit',
            headerName: 'Edit',
            sortable: false,
            renderCell: (params) => (
                <button onClick={() => handleEditCategory(params.id)}>Edit</button>
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            sortable: false,
            renderCell: (params) => (
                <button
                    onClick={() => handleDeleteCategory(params.id, params.row.numOfProducts)}
                    disabled={params.row.numOfProducts > 0}
                >
                    Delete
                </button>
            ),
        }
    ];

    return (
        <div style={{ minHeight: 400, width: '100%' }}>
            {categories ?
                <DataGrid rows={categories}
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

CategoryList.propTypes = {
    categories: PropTypes.array,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    pageModel: PropTypes.object.isRequired,
    rowCount: PropTypes.number.isRequired
};

CategoryList.defaultProps = {
    rowCount: 0,
};

export default CategoryList;
