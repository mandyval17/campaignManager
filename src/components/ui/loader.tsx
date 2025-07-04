import Box, { BoxProps } from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export const Loader = ({ sx }: { sx?: BoxProps['sx'] }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'inherit',
        width: 'inherit',
        ...sx
      }}
    >
      <CircularProgress />
    </Box>
  );
};

