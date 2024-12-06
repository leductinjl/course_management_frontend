import { API_ENDPOINTS } from '../config/api.config';
import { AdminLoginRequest, AdminLoginResponse, Admin } from '../types/admin.types';
import axiosInstance from '../config/axios.config';

export const adminService = {
  login: async (credentials: AdminLoginRequest): Promise<AdminLoginResponse> => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.ADMIN.LOGIN, credentials);
      
      if (response.data.success && response.data.data.token) {
        // Lưu token và thông tin admin
        localStorage.setItem('adminToken', response.data.data.token);
        localStorage.setItem('adminData', JSON.stringify(response.data.data.admin));
        localStorage.setItem('tokenExpires', String(Date.now() + 8 * 60 * 60 * 1000)); // 8 hours
        
        // Cập nhật header cho axios instance
        axiosInstance.defaults.headers.common['Authorization'] = 
          `Bearer ${response.data.data.token}`;
      }
      
      return response.data;
    } catch (error: any) {
      // Xử lý các loại lỗi cụ thể
      if (error.response) {
        switch (error.response.data.code) {
          case 'ACCOUNT_LOCKED':
            throw new Error(`Tài khoản đã bị khóa. Vui lòng thử lại sau ${
              new Date(error.response.data.details.unlockTime).toLocaleTimeString()
            }`);
          case 'INVALID_CREDENTIALS':
            throw new Error(
              `Sai thông tin đăng nhập. Còn ${
                error.response.data.details.remainingAttempts
              } lần thử`
            );
          default:
            throw new Error(error.response.data.message);
        }
      }
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post(API_ENDPOINTS.ADMIN.LOGOUT);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
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