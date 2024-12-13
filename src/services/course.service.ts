import { API_ENDPOINTS } from '../config/api.config';
import axiosInstance from '../config/axios.config';
import { Course, CreateCourseDTO, UpdateCourseDTO } from '../types/course.types';

export const courseService = {
  listCourses: async (): Promise<Course[]> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.COURSES.LIST);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể tải danh sách khóa học');
    }
  },

  getCourse: async (id: string): Promise<Course> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.COURSES.GET_BY_ID(id));
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể tải thông tin khóa học');
    }
  },

  createCourse: async (courseData: CreateCourseDTO): Promise<Course> => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.ADMIN.COURSES.CREATE, courseData);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể tạo khóa học');
    }
  },

  updateCourse: async (id: string, courseData: UpdateCourseDTO): Promise<Course> => {
    try {
      const response = await axiosInstance.put(API_ENDPOINTS.ADMIN.COURSES.UPDATE(id), courseData);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể cập nhật khóa học');
    }
  },

  deleteCourse: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(API_ENDPOINTS.ADMIN.COURSES.DELETE(id));
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể xóa khóa học');
    }
  },

  getAvailableCoursesForStudent: async (): Promise<Course[]> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.STUDENT.COURSES.AVAILABLE);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể tải danh sách khóa học');
    }
  }
};