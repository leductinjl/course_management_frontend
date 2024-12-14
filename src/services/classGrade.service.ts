import { API_ENDPOINTS } from '../config/api.config';
import axiosInstance from '../config/axios.config';
import { StudentGrade, GradeUpdateDTO } from '../types/grade.types';

export const classGradeService = {
  getClassStudents: async (class_id: string): Promise<StudentGrade[]> => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.INSTRUCTOR.GRADES.GET_CLASS_GRADES(class_id)
      );
      
      if (!response.data) {
        console.error('Invalid response:', response);
        return [];
      }

      if (Array.isArray(response.data)) {
        return response.data;
      }

      if (response.data.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }

      console.error('Unexpected response format:', response.data);
      return [];
    } catch (error) {
      console.error('Error fetching class grades:', error);
      throw error;
    }
  },

  updateClassGrades: async (classId: string, grades: GradeUpdateDTO[]) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.INSTRUCTOR.GRADES.BULK_UPDATE(classId),
        { grades }
      );
      return response.data;
    } catch (error) {
      console.error('Error in updateClassGrades:', error);
      throw error;
    }
  }
};
