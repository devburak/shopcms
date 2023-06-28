import { useEffect, useState } from 'react';
import CategoryList from '../components/category/categoryList';
import api from '../api';
import { useNavigate } from 'react-router-dom';
const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);
  const [info,setInfo] = useState({})
  const [rowCount , setRowCount] = useState(0)
  const navigate = useNavigate();


  const [sortModel, setSortModel] = useState([
    {
      field:'title',
      sort:'asc'
    }
  ]);
  const [pageModel, setPageModel] = useState({
    page:1,
    pageSize:25
  });

  const handleEditCategory = (id) => {
    // Yönlendirme işlemi
    navigate('/category/' + id);

  };

  const handleDeleteCategory = (id) => {
    // Silme işlemi için gerekli işlemler burada gerçekleştirilebilir
    console.log('Delete category with id:', id);
  };

 const fetchCategories = async () => {
  try {
    const response = await api.get(`/api/category/withnop`, {
      params: {
        page: pageModel.page,
        limit: pageModel.pageSize,
        sort: sortModel.map((item) => `${item.field}:${item.sort}`).join(","),
      },
    });
    const {categories , ...info} = response.data;
    console.log(info)
    setCategories(categories);
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
    fetchCategories();
  }, [pageModel,sortModel]);

  useEffect(()=>{
    setRowCount((prevRowCount) =>
      info?.totalDocs !== undefined
        ? info?.totalDocs
        : prevRowCount,
    );
  },[info])

  return (
    <div>
      <h1>Category Page</h1>
      <CategoryList
        categories={categories}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
        pageModel={pageModel}
        sortModel={sortModel}
        handlePageChange={handlePageChange}
        onSortModelChange={handleSortModelChange}
        rowCount={rowCount}
      />
    </div>
  );
};

export default CategoryListPage;
