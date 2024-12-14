import { API_ENDPOINTS } from '../config/api.config';
import axiosInstance from '../config/axios.config';

export const gradeService = {
  getClassGrades: async (class_id: string) => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.INSTRUCTOR.GRADES.GET_CLASS_GRADES(class_id)
      );
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Không thể tải điểm của lớp'
      );
    }
  },

  bulkUpdateGrades: async (grades: any[]) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.INSTRUCTOR.GRADES.BULK_UPDATE,
        { grades }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Không thể cập nhật điểm'
      );
    }
  },

  updateGrade: async (id: string, gradeData: any) => {
    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.INSTRUCTOR.GRADES.UPDATE(id),
        gradeData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Không thể cập nhật điểm'
      );
    }
  },

  exportGrades: async (class_id: string) => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.INSTRUCTOR.GRADES.EXPORT(class_id),
        { responseType: 'blob' }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Không thể xuất file điểm'
      );
    }
  }
}; 