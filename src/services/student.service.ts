import { API_ENDPOINTS } from '../config/api.config';
import axiosInstance from '../config/axios.config';
import { Student, UpdateStudentDTO } from '../types/student.types';

export const studentService = {
  getCurrentStudent: async (): Promise<Student> => {
    try {
      console.log('Calling getCurrentStudent API...');
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.STUDENT.PROFILE.GET_CURRENT}?t=${new Date().getTime()}`
      );
      console.log('API Response:', response);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Không thể tải thông tin học viên');
      }
      
      const studentData = response.data.data;
      console.log('Parsed student data:', studentData);
      
      return studentData;
    } catch (error: any) {
      console.error('Error in getCurrentStudent:', error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Không thể tải thông tin học viên'
      );
    }
  },

  updateStudent: async (id: string, studentData: UpdateStudentDTO): Promise<Student> => {
    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.STUDENT.PROFILE.UPDATE(id),
        studentData
      );
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Không thể cập nhật thông tin học viên');
      }
      
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Không thể cập nhật thông tin học viên'
      );
    }
  },

  getEnrolledCourses: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.STUDENT.COURSES.ENROLLED);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Không thể tải danh sách môn học');
      }
      
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        'Không thể tải danh sách môn học'
      );
    }
  }
}; 