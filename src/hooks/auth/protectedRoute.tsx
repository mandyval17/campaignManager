import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login', { state: { from: location } });
    }
  }, [navigate, user, isLoading, location]);

  if (isLoading) return null;
  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
