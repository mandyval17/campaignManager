import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NotAccessPage from './403';
import MyErrorBoundary from './components/common/error-boundary';
import { useAuth } from './hooks/auth/useAuth';
import LoadingScreen from './loadingScreen';

export default function MainLayout() {
  const { isLoading, user } = useAuth();
  return (
    <MyErrorBoundary>
      {isLoading ?
        <LoadingScreen />
        :
        <>
          <Grid container>
            <Grid
              item
              style={{
                overflow: "auto",
                height: "100vh",
                width: "100%",
              }}
            >
              {user && isLoading ? <NotAccessPage /> : <Outlet />}
            </Grid>
          </Grid>
        </>
      }
    </MyErrorBoundary>
  )
}
