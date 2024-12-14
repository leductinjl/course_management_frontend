import { API_ENDPOINTS } from '../config/api.config';
import axiosInstance from '../config/axios.config';

export const adminGradeService = {
  getPendingGrades: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.GRADES.PENDING);
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Không thể tải danh sách điểm cần xác thực'
      );
    }
  },

  verifyGrade: async (id: string, note?: string) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.ADMIN.GRADES.VERIFY(id),
        { note }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Không thể xác thực điểm'
      );
    }
  },

  verifyBulkGrades: async (grade_ids: string[], note?: string) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.ADMIN.GRADES.VERIFY_BULK,
        { grade_ids, note }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Không thể xác thực điểm hàng loạt'
      );
    }
  },

  getClassGrades: async (class_id: string) => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.ADMIN.GRADES.GET_CLASS_GRADES(class_id)
      );
      return response.data.data.map((grade: any) => ({
        ...grade,
        enrollment_status: grade.Enrollment?.status || 'pending',
        student_code: grade.Enrollment?.Student?.student_code,
        student_name: grade.Enrollment?.Student?.full_name
      }));
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Không thể tải điểm của lớp'
      );
    }
  }
}; 