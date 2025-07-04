import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { toast } from 'react-hot-toast';

interface CustomToastProps {
  id: string;
  message: string;
  icon: React.ReactNode;
}

export const CustomToastMessage: React.FC<CustomToastProps> = ({ id, message, icon }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        color: 'black',
        p: 2,
        borderRadius: 1,
        boxShadow: 1,
        margin: 2,
        width: '400px',
      }}
    >
      <Box sx={{ mr: 2 }}>{icon}</Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body1">{message}</Typography>
      </Box>
      <IconButton
        sx={{ ml: 'auto', color: 'black' }}
        onClick={() => {
          toast.dismiss(id);
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};
