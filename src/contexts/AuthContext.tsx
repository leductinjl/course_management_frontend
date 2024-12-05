import React, { createContext, useContext, useState } from 'react';
import { loginUser } from '../services/userService';

interface AuthContextType {
  isAdminAuthenticated: boolean;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAdminAuthenticated: false,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const login = async (email: string, password: string, role: string) => {
    try {
      const response = await loginUser(email, password, role);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setIsAdminAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAdminAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAdminAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 