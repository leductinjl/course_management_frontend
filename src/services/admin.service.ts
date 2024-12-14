import { API_ENDPOINTS } from '../config/api.config';
import { AdminLoginRequest, AdminLoginResponse, Admin } from '../types/admin.types';
import axiosInstance from '../config/axios.config';

export const adminService = {
  login: async (credentials: AdminLoginRequest): Promise<AdminLoginResponse> => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.ADMIN.LOGIN, credentials);
      
      if (response.data.success && response.data.data.token) {
        // Clear any existing tokens
        localStorage.clear();
        
        const { token, admin } = response.data.data;
        
        // Store new token and data
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminData', JSON.stringify(admin));
        
        // Set authorization header
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post(API_ENDPOINTS.ADMIN.LOGOUT);
    } finally {
      // Always clear local storage and headers
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      localStorage.removeItem('tokenExpires');
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  },

  getProfile: async (): Promise<Admin> => {
    const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.PROFILE);
    return response.data;
  },

  updateProfile: async (profileData: Partial<Admin>): Promise<Admin> => {
    const response = await axiosInstance.put(API_ENDPOINTS.ADMIN.PROFILE, profileData);
    return response.data;
  }
}; 