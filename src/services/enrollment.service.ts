import { API_ENDPOINTS } from '../config/api.config';
import axiosInstance from '../config/axios.config';

export const enrollmentService = {
  enrollClass: async (class_id: string) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.STUDENT.ENROLLMENTS.ENROLL, {
        class_id
      });
      console.log('Enrollment service response:', response);
      return response.data;
    } catch (error: any) {
      console.error('Enrollment service error:', {
        error,
        response: error.response,
        data: error.response?.data
      });
      
      // Đảm bảo luôn throw error với message
      const errorMessage = error.response?.data?.message || 'Không thể đăng ký lớp học';
      throw new Error(errorMessage);
    }
  },

  getMyEnrollments: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.STUDENT.ENROLLMENTS.MY_ENROLLMENTS);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể tải danh sách đăng ký');
    }
  },

  unenrollClass: async (class_id: string) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.STUDENT.ENROLLMENTS.UNENROLL(class_id)
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể hủy đăng ký lớp học');
    }
  },

  getEnrollmentHistory: async () => {
    try {
      console.log('Fetching enrollment history...');
      const response = await axiosInstance.get(API_ENDPOINTS.STUDENT.ENROLLMENTS.HISTORY);
      console.log('Enrollment history response:', response.data);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Không thể tải lịch sử đăng ký');
      }
      
      return response.data.data;
    } catch (error: any) {
      console.error('Error fetching enrollment history:', error);
      throw new Error(
        error.response?.data?.message || 
        'Không thể tải lịch sử đăng ký'
      );
    }
  }
}; 