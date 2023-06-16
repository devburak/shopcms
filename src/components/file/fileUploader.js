import React, { useState,useEffect } from 'react';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';
// material-ui
import { useTheme } from '@mui/material/styles';
import FileSelector from './fileSelector';

const FileUploader = ({defaultFiles}) => {
  const theme = useTheme();
  const handleDrop = acceptedFiles => {
    const updatedFiles = acceptedFiles.slice(0, 5 - files.length).map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    setFiles(prevFiles => [...prevFiles, ...updatedFiles]);
  };

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    maxFiles:5,
    accept: {
      'image/*': []
    },
    onDrop: handleDrop,
  });
  const [files, setFiles] = useState(defaultFiles || []);
  const [openFileSelector, setOpenFileSelector] = useState(false)

  useEffect(() => {
    setFiles(defaultFiles || []);
  }, [defaultFiles]);

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleCloseFileSelector =()=>{
    setOpenFileSelector(false)
  }
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  const [selectedImages, setSelectedImages] = useState([]);

  const handleToggleImage = (index) => {
    // Toggle image selection
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(index)) {
        return prevSelectedImages.filter((item) => item !== index);
      } else {
        return [...prevSelectedImages, index];
      }
    });
  };


  const thumbs = files.map((file, index) => (
    <Box key={index} position="relative" m={1}>
      <img src={file.preview || file.thumbnailUrl} alt="Uploaded File" onLoad={() => { URL.revokeObjectURL(file.preview || file.thumbnailUrl) }} width={80} height={80} />
      <IconButton
        onClick={() => handleRemoveFile(index)}
        size="small"
        style={{
          position: 'absolute',
          top: 2,
          right: 2,
          backgroundColor: '#ffffff',
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  ));


  return (
    <Grid container >
      <Grid item sm={4} xs={12}  display={'flex'}>
        <Button  fullWidth onClick={()=>setOpenFileSelector(true)} > vom Server</Button>
        <FileSelector open={openFileSelector} handleClose={handleCloseFileSelector} selectedImages={selectedImages} handleToggleImage={handleToggleImage} />
      </Grid>
     
      <Grid item xs={12} sm={8}>
        <Box sx={{
          ...theme.typography.dragZone,
          backgroundColor: theme.palette.grey[200],
          mt: 1
        }}
          {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Dateien hierhin ziehen oder klicken, um Dateien auszuwählen</p>
        </Box>
      </Grid>
      <Grid item xs={12} >
        <Box mt={2} display="flex" flexWrap="wrap" >
          {thumbs}
        </Box>
      </Grid>
    </Grid>
  );
};

export default FileUploader;
