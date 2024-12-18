import { API_ENDPOINTS } from '../config/api.config';
import axiosInstance from '../config/axios.config';

interface StudentGradeResult {
  id: string;
  courseCode: string;
  courseName: string;
  semester: string;
  attendance_score: number | null;
  midterm_score: number | null;
  final_score: number | null;
  total_score: number | null;
  status: 'pending' | 'graded' | 'verified';
}

export const studentGradeService = {
  getMyGrades: async (): Promise<StudentGradeResult[]> => {
    try {
      console.log('Fetching grades...'); // Debug log
      const response = await axiosInstance.get(API_ENDPOINTS.STUDENT.GRADES.MY_GRADES);
      console.log('Received response:', response.data); // Debug log
      return response.data.data;
    } catch (error: any) {
      console.error('Error fetching grades:', error);
      throw new Error(
        error.response?.data?.message || 
        'Không thể tải kết quả học tập'
      );
    }
  }
}; 