import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #f0f4f8 0%, #e0e7ef 100%)',
      }}
    >
      <CircularProgress size={64} thickness={4} sx={{ color: '#2563eb', mb: 3, animation: 'spin 1.2s linear infinite' }} />
      <Typography variant="h5" sx={{ color: '#2563eb', fontWeight: 600, letterSpacing: 1 }}>
        Loading...
      </Typography>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
}