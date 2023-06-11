import React, { useState,useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';
// material-ui
import { useTheme } from '@mui/material/styles';


const FileUploader = () => {
  const theme = useTheme();
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  const [files, setFiles] = useState([]);


  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);


  const thumbs = files.map((file, index) => (
    <Box key={index} position="relative" m={1}>
      <img src={file.preview} alt="Uploaded File" onLoad={() => { URL.revokeObjectURL(file.preview) }} width={80} height={80} />
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
    <Box>
      <Box sx={{
        ...theme.typography.dragZone,
        backgroundColor: theme.palette.grey[200],
        mt: 1
      }}
        {...getRootProps({ className: 'dropzone' })}> 
       <input {...getInputProps()} />
       <p>Dateien hierhin ziehen oder klicken, um Dateien auszuwählen</p>
       </Box>
       <Box mt={2} display="flex" flexWrap="wrap" >
        {thumbs}
      </Box>
    </Box>
  );
};

export default FileUploader;
