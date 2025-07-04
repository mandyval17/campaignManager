import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from './404';
import AppProvider from './hooks/app-provider';
import ProtectedRoute from './hooks/auth/protectedRoute';
import MainLayout from './layout';
import Login from './pages/(auth)/login';
import DashboardPage from './pages/dashboard/main';

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppProvider>
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      </AppProvider>
    ),
    children: [
      {
        path: "",
        element: <DashboardPage />
      }
    ]
  },
  {
    path: "/login",
    element: (
      <AppProvider>
        <Login />
      </AppProvider>
    ),
    children: []
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);