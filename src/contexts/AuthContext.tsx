import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAdminAuthenticated: boolean;
  loginAdmin: (username: string, password: string) => Promise<void>;
  logoutAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const loginAdmin = async (username: string, password: string) => {
    const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      localStorage.setItem('adminToken', 'some-secure-token');
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('adminToken');
  };

  return (
    <AuthContext.Provider value={{ 
      isAdminAuthenticated, 
      loginAdmin,
      logoutAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 