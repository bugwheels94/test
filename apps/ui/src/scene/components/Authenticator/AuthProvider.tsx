import { useQuery } from '@tanstack/react-query';
import { checkSession } from '../../../services/auth';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const query = useQuery({
    queryKey: ['auth'],
    queryFn: () => {
      return checkSession();
    },
    retry: false,
  });
  useEffect(() => {
    if (query.data) {
      setIsAuthenticated(true);
    } else if (query.isError) {
      setIsAuthenticated(false);
    }
  }, [query.data, query.isError]);
  const login = () => {
    // Mock login function
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Mock logout function
    setIsAuthenticated(false);
  };

  if (query.isLoading) {
    return null;
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
