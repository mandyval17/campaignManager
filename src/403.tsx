import { LockOutlined } from '@mui/icons-material';
import { Box, Container, Typography } from '@mui/material';
import { COLORS } from './colorScheme';

export default function NotAccessPage() {
  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 16, textAlign: 'center' }}>
      <Box sx={{ bgcolor: COLORS.BACKGROUND.ACCENT, p: 6, borderRadius: '16px', boxShadow: 3 }}>
        <Box>
          <LockOutlined fontSize='large' />
        </Box>
        <Typography variant="h1" component="h2" gutterBottom sx={{ fontSize: '5rem', fontWeight: 'bold', color: COLORS.TEXT.SECONDARY }}>
          403
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mb: 3, color: COLORS.TEXT.PRIMARY }}>
          Access Forbidden
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mb: 4 }}>
          You don’t have the necessary permissions to access this page. If you believe this is an error, please contact support.
        </Typography>
      </Box>
    </Container>
  );
};

