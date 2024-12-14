import axiosInstance from '../config/axios.config';
import { API_ENDPOINTS } from '../config/api.config';

interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      role: string;
      profile: any;
    }
  }
}

interface RegisterResponse {
  success: boolean;
  message: string;
}

export const authService = {
  studentLogin: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.STUDENT.LOGIN, {
      email,
      password
    });
    return response.data;
  },

  instructorLogin: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.INSTRUCTOR.LOGIN, {
      email,
      password
    });
    return response.data;
  },

  studentRegister: async (data: {
    email: string;
    password: string;
    full_name: string;
    phoneNumber: string;
    address: string;
  }): Promise<RegisterResponse> => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.STUDENT.REGISTER, data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}; 