import { Box, Typography } from '@mui/material';
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

function fallbackRender({ error, resetErrorBoundary }: FallbackProps) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <Box height="100vh" width="100vw" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Typography variant='h5'>Something went wrong:</Typography>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <pre style={{ color: "red" }}>{error.stack}</pre>
    </Box>
  );
}

export default function MyErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallbackRender={fallbackRender}
      onReset={(details) => {
        // Reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
