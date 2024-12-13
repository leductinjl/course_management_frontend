import { API_ENDPOINTS } from '../config/api.config';
import axiosInstance from '../config/axios.config';

export const enrollmentService = {
  enrollClass: async (class_id: string) => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.STUDENT.ENROLLMENTS.ENROLL, {
        class_id
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Không thể đăng ký lớp học'
      );
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
      throw new Error(error.response?.data?.message || 'Không thể hủy đăng ký lớp h���c');
    }
  },

  getEnrollmentHistory: async () => {
    try {
      const response = await axiosInstance.get('/api/student/enrollments/history');
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Không thể tải lịch sử đăng ký'
      );
    }
  }
}; 