import api from './apiService';
import { RegisterFormData } from '../types/userTypes';
import { LoginResponse, RegisterResponse } from '../types/apiResponseTypes';

export const login = async (email: string, password: string, role: string): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', { email, password, role });
  return response.data;
};

export const register = async (formData: RegisterFormData): Promise<RegisterResponse> => {
  const response = await api.post('/auth/register', formData);
  return response.data;
}; 