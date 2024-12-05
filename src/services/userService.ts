import api from './apiService';
import { RegisterFormData } from '../types/userTypes';

export const registerUser = async (data: RegisterFormData) => {
  try {
    const response = await api.post('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Registration failed';
    const errorDetails = error.response?.data?.details || {};
    throw { message: errorMessage, details: errorDetails };
  }
};

export const loginUser = async (email: string, password: string, role: string) => {
  return api.post('/auth/login', { email, password, role });
};
