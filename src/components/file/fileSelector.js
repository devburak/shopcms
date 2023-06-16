import React,{useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Modal, Box, IconButton,Checkbox ,TextField , Button} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PropTypes from 'prop-types';

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


const Thumbnail = styled(Box)(({ theme }) =>  ({
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

const FileSelector = ({ open, handleClose, images,selectedImages,handleToggleImage }) => {
  const theme = useTheme();
  const handleDeleteImage = (index) => {
    // Handle image deletion logic here
    console.log('Deleting image at index', index);
  };
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
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
      <Box sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2),
        maxWidth: 600,
        width: '90%',
        maxHeight: 400,
        overflow: 'auto',
        position: 'relative',
      }
      }>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing(1) }}>
          <TextField
            label="Suchen"
            variant="outlined"
            value={searchText}
            fullWidth
            onChange={handleSearchTextChange}
            size="small"
            sx={{ marginRight: theme.spacing(2) }}
          />
           <p>{selectedImages.length} ausgewählt</p>
        </Box>
    
        {images.map((image, index) => (
          <Thumbnail key={index}>
                <Checkbox
                size='small'
                    className='check-button'
                    checked={selectedImages.includes(index)}
                    onChange={() => handleToggleImage(index)}
                />
            <img src={image.thumbnailUrl} alt={image.fileName} onClick={() => handleToggleImage(index)} />
           
              <IconButton
              size='small'
                className="delete-icon"
                onClick={() => handleDeleteImage(index)}
              >
                <DeleteForeverIcon />
              </IconButton>
            
          </Thumbnail>
        ))}
      </Box>
    </Modal>
  );
};
FileSelector.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    images: PropTypes.array,
    selectedImages:PropTypes.array,
    handleToggleImage:PropTypes.func,
   
  };
  
  FileSelector.defaultProps = {
    open: false,
    images:defaultFiles
  };

export default FileSelector;
