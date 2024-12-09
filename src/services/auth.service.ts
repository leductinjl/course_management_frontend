import axiosInstance from '../config/axios.config';
import { API_ENDPOINTS } from '../config/api.config';

interface LoginResponse {
  token: string;
  user: any;
}

interface RegisterResponse {
  message: string;
}

export const authService = {
  studentLogin: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.STUDENT.LOGIN, {
      email,
      password
    });
    return response.data.data;
  },

  instructorLogin: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.INSTRUCTOR.LOGIN, {
      email,
      password
    });
    if (response.data.success) {
      localStorage.setItem('instructorToken', response.data.token);
      localStorage.setItem('instructorData', JSON.stringify(response.data.instructor));
    }
    return response.data;
  },

  studentRegister: async (data: {
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    address: string;
  }): Promise<RegisterResponse> => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.STUDENT.REGISTER, data);
    return response.data;
  }
}; 