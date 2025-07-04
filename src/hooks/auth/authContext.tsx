import { TUserJwtPayload } from '@/components/types/models/user-jwt-payload.model';
import Cookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/Auth/auth.service';

type AuthContextType = {
  isLoading: boolean;
  user: TUserJwtPayload | null;
  login: (data: { email: string; password: string }) => void;
  logout: () => void;
  loginState: { isPending: boolean };
  logoutState: { isPending: boolean };
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TUserJwtPayload | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const loginMutation = AuthService.useUserLoginMutation();
  const logoutMutation = AuthService.useUserLogoutMutation();

  useEffect(() => {
    const token = Cookie.get('auth_token') ?? '';
    if (token) {
      try {
        const userData = jwtDecode<TUserJwtPayload>(token);
        setUser(userData);
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  const login = async ({ email, password }: { email: string; password: string }) => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (res) => {

          setUser(res.data);
          navigate('/');
        },
      }
    );
  };

  const logout = async () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setUser(null);
        navigate('/login');
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        login,
        logout,
        loginState: { isPending: loginMutation.isPending },
        logoutState: { isPending: logoutMutation.isPending },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

