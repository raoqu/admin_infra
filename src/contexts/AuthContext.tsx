import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchPrivileges } from '../utils/request';
import { message } from 'antd';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  privileges: {
    roles: string[];
    permissions: string[];
  };
  checkAccess: (path: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [privileges, setPrivileges] = useState<{ roles: string[]; permissions: string[] }>({
    roles: [],
    permissions: [],
  });
  const navigate = useNavigate();
  const location = useLocation();

  // Check for existing token and initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          setIsAuthenticated(true);
          await loadPrivileges();
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          logout();
        }
      }
      setIsInitialized(true);
    };

    initializeAuth();
  }, []);

  const loadPrivileges = async () => {
    try {
      const data = await fetchPrivileges();
      setPrivileges(data);
      
      // Only navigate if we're on the login page
      if (location.pathname === '/login') {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('Failed to load privileges:', error);
      throw error; // Let the caller handle the error
    }
  };

  const login = async (token: string) => {
    try {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      await loadPrivileges();
      message.success('Login successful!');
    } catch (error) {
      console.error('Login failed:', error);
      message.error('Failed to complete login process');
      logout();
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setPrivileges({ roles: [], permissions: [] });
    navigate('/login', { replace: true });
  };

  const checkAccess = (path: string): boolean => {
    if (path === '/login') return true;
    return isAuthenticated;
  };

  if (!isInitialized) {
    // You might want to show a loading spinner here
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, privileges, checkAccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
