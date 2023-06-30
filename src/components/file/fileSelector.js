import React, { useState, useRef, useEffect, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Modal, Box, IconButton, Checkbox, TextField, Button, CircularProgress } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import api from '../../api';
import GenericAlert from '../genericAlert';
import config from '../../config';
import { UserContext } from '../../store/user/userContext';

const defaultFiles = [{
  _id: "6484a11c65555515a498072a",
  fileName: "2023_1.jpeg",
  size: 135259,
  mimeType: "image/jpeg",
  fileUrl: "https://xfs2.ikon-x.com.tr/lemonbistro/2023_1.jpeg",
  thumbnailUrl: "https://xfs2.ikon-x.com.tr/lemonbistro/thumbnails/th_2023_1.webp",
  uploadedBy: "64733699b76cf2a894853020",
  uploadedAt: "2023-06-10T16:13:16.493Z"
}];


const Thumbnail = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  position: 'relative',
  '& img': {
    width: 80,
    height: 80,
    borderRadius: theme.shape.borderRadius,
  },
  '& .delete-icon': {
    position: 'absolute',
    top: -10,
    right: -10,
    color: theme.palette.error.main,
    //   backgroundColor: theme.palette.common.white,
  },
  '& .check-button': {
    position: 'absolute',
    bottom: -10,
    left: -10,
    zIndex: 1
  }
}));

const FileSelector = ({ open, handleClose, selectedFiles, handleToggleFiles,acceptedFiles="image/*" }) => {
  const theme = useTheme();
  const { state } = useContext(UserContext);

  const [searchText, setSearchText] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([])
  const searchTimerRef = useRef(null);
  const thumbnailBoxRef = useRef(null);

  const handleDeleteImage = (image) => {
    if (state.role === 'admin' || (state.role !== 'admin' && image.uploadedBy === state.userId)) {
      api.delete('/api/file/delete/' + image._id).then(response=>{
        fetchFiles(searchText);
      }).catch(error=>{
        console.log(error)

      })
    } else {
      // Silme yetkisi yok, uyarı mesajı göster veya başka bir işlem yap
      console.log('You do not have permission to delete this image.');
    }
  };


  const handleSearchTextChange = (event) => {
    const searchText = event.target.value;
    setSearchText(searchText);

    clearTimeout(searchTimerRef.current);

    searchTimerRef.current = setTimeout(() => {
      fetchFiles(searchText);
    }, 200);
  };

  const handleDrop = (acceptedFiles) => {
    // Handle dropped files logic here
    console.log('Dropped files:', acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: handleDrop, noClick: true });
  const fileInputRef = useRef(null);
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    if (event.target.files.length > config.maxFileNumber)
      GenericAlert.warning(`Max seçebileceğiniz dosya ${config.maxFileNumber} olarak sınırlandırılmıştır.`);
    const selectedFiles = Array.from(files).slice(0, config.maxFileNumber);
    const oversizedFiles = selectedFiles.filter(file => file.size > config.maxFileSize);
    console.log(config.maxFileSize)
    if (oversizedFiles.length > 0) {
      GenericAlert.error(`Seçtiğiniz dosyalardan bazıları ${config.maxFileSize / (1024 * 1024)} MB'den büyük. Lütfen daha küçük dosyalar seçin.`);
      return;
    }

    handleFileSelection(selectedFiles);
  };

  const handleFileSelection = async (files) => {
    setUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          transformRequest: formData => formData,
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            setUploadProgress(progress);
          },
        };

        const response = await api.post('/api/file/upload', formData, config);
        // Yeni dosyalar yüklendikten sonra sunucudan dosyaları yeniden almak için API isteği yapılabilir
        fetchFiles(searchText);
      }


    } catch (error) {
      console.error('File upload failed:', error);
    }

    setUploading(false);
    setUploadProgress(0);
  };


  const fetchFiles = (searchText, pageNumber) => {
    setIsLoading(true);

    api.get(`/api/file/list?s=${searchText}&page=${pageNumber}`)
      .then((response) => {
        const { totalCount = 0, totalPages = 0, files = [] } = response.data;

        // Update the total pages
        setTotalPages(totalPages);
        // Process the files data
        setImages(files);
        setIsLoading(false);
      })
      .catch((error) => {
        // Handle error
        setIsLoading(false);
        console.error('Error fetching files:', error);
      });
  };



  useEffect(() => {
    fetchFiles('',);
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 20) { // Adjust the threshold as needed
        loadMoreFiles();
      }
    };

    const thumbnailBox = thumbnailBoxRef.current;
    if (thumbnailBox) {
      thumbnailBox.addEventListener('scroll', handleScroll);
    }


    return () => {
      if (thumbnailBox) {
        thumbnailBox.removeEventListener('scroll', handleScroll);
      }
    };

  }, [])

  const loadMoreFiles = () => {
    if (pageNumber < totalPages && !isLoading) {
      const nextPage = pageNumber + 1;
      fetchFiles(searchText, nextPage);
      setPageNumber(nextPage);
    }
  };

  const shouldShowDeleteButton = (image) => {
    if (state.role === 'admin' || (state.role !== 'admin' && image.uploadedBy === state.userId)) {
      return true;
    }
    return false;
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        {...getRootProps()}
        sx={{
          backgroundColor: isDragActive ? '#f9f9f9' : theme.palette.background.paper,
          border: '1px dashed #ccc',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2),
          maxWidth: 600,
          width: '90%',
          minHeight: 400,
          overflow: 'auto',
          position: 'relative',
        }
        }>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop files here</p>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing(1) }}>
              <Box sx={{ width: '70%' }}>
                <TextField
                  label="Search"
                  variant="outlined"
                  value={searchText}
                  fullWidth
                  onChange={handleSearchTextChange}
                  size="small"
                  sx={{ marginRight: theme.spacing(2) }}
                /></Box>
              <Box sx={{ width: '30%', marginLeft: theme.spacing(1) }}>
                <Button fullWidth variant="contained" color="primary" onClick={handleFileInputClick}>
                  From Computer
                </Button>
                <input type="file" accept={acceptedFiles} multiple style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileInputChange} />
              </Box>
            </Box>
            <Box
              ref={thumbnailBoxRef}
              sx={{
                maxHeight: '400px', // Adjust the height as needed
                overflow: 'auto',
              }}
            >
              {uploading && (
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing(1) }}>
                  <CircularProgress variant="determinate" value={uploadProgress} sx={{ marginRight: theme.spacing(2) }} />
                  <span>{`${uploadProgress}% Uploaded`}</span>
                </Box>
              )}
              {images.map((image, index) => (
                <Thumbnail key={index}>
                  <Checkbox
                    size='small'
                    className='check-button'
                    checked={selectedFiles.some((selectedImage) => selectedImage._id === image._id)}
                    onChange={() => handleToggleFiles(image)}
                  />
                  <img src={image.thumbnailUrl} alt={image.fileName} onClick={() => handleToggleFiles(image)} />

                  {shouldShowDeleteButton(image) && (
                    <IconButton
                      size='small'
                      className="delete-icon"
                      onClick={() => handleDeleteImage(image)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  )}


                </Thumbnail>
              ))}
            </Box>
          </>)}
      </Box>
    </Modal>
  );
};
FileSelector.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  images: PropTypes.array,
  selectedImages: PropTypes.array,
  handleToggleImage: PropTypes.func,

};

FileSelector.defaultProps = {
  open: false,
  images: defaultFiles
};

export default FileSelector;
