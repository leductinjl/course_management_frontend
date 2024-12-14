import { API_ENDPOINTS } from '../config/api.config';
import axiosInstance from '../config/axios.config';
import { Class, CreateClassDTO, UpdateClassDTO, ClassWithEnrollment } from '../types/class.types';
import { Instructor } from '../types/instructor.types';
import { Course } from '../types/course.types';

class ClassService {
  async listClasses(): Promise<Class[]> {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.CLASSES.LIST);
      console.log('Response from server:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error listing classes:', error);
      throw error;
    }
  }

  async getClass(id: string): Promise<Class> {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.CLASSES.GET_BY_ID(id));
      return response.data.data;
    } catch (error) {
      console.error('Error getting class:', error);
      throw error;
    }
  }

  async createClass(data: CreateClassDTO): Promise<Class> {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.ADMIN.CLASSES.CREATE, data);
      return response.data.data;
    } catch (error) {
      console.error('Error creating class:', error);
      throw error;
    }
  }

  async updateClass(id: string, data: UpdateClassDTO): Promise<Class> {
    try {
      const response = await axiosInstance.put(API_ENDPOINTS.ADMIN.CLASSES.UPDATE(id), data);
      return response.data.data;
    } catch (error) {
      console.error('Error updating class:', error);
      throw error;
    }
  }

  async deleteClass(id: string): Promise<void> {
    try {
      await axiosInstance.delete(API_ENDPOINTS.ADMIN.CLASSES.DELETE(id));
    } catch (error) {
      console.error('Error deleting class:', error);
      throw error;
    }
  }

  async getInstructors(): Promise<Instructor[]> {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.CLASSES.GET_INSTRUCTORS);
      return response.data.data;
    } catch (error) {
      console.error('Error getting instructors:', error);
      throw error;
    }
  }

  async getAvailableCourses(): Promise<Course[]> {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.CLASSES.GET_AVAILABLE_COURSES);
      return response.data.data;
    } catch (error) {
      console.error('Error getting available courses:', error);
      throw error;
    }
  }

  async getClassStats(id: string) {
    try {
      const [enrollmentCount, lessonProgress, announcementCount] = await Promise.all([
        axiosInstance.get(API_ENDPOINTS.ADMIN.CLASSES.STATS.ENROLLMENT_COUNT(id)),
        axiosInstance.get(API_ENDPOINTS.ADMIN.CLASSES.STATS.LESSON_PROGRESS(id)),
        axiosInstance.get(API_ENDPOINTS.ADMIN.CLASSES.STATS.ANNOUNCEMENT_COUNT(id))
      ]);

      return {
        enrollmentCount: enrollmentCount.data.data,
        lessonProgress: lessonProgress.data.data,
        announcementCount: announcementCount.data.data
      };
    } catch (error) {
      console.error('Error getting class stats:', error);
      throw error;
    }
  }

  async getClassSummary() {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.CLASSES.STATS.SUMMARY);
      return response.data.data;
    } catch (error) {
      console.error('Error getting class summary:', error);
      throw error;
    }
  }

  async getAvailableClasses(course_id: string): Promise<ClassWithEnrollment[]> {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.STUDENT.CLASSES.AVAILABLE(course_id)
      );
      return response.data.data;
    } catch (error: any) {
      console.error('Error getting available classes:', error);
      throw new Error(
        error.response?.data?.message || 
        'Không thể tải danh sách lớp học'
      );
    }
  }
}

export const classService = new ClassService();