import axios from '../config/axios.config';
import { Course } from '../types/course.types';
import { Class } from '../types/class.types';
import { API_ENDPOINTS } from '../config/api.config';
import { Instructor, UpdateInstructorDTO } from '../types/instructor.types';
import { TeachingSchedule } from '../types/teaching.types';

interface CourseWithClasses extends Course {
  classes: Class[];
}

class InstructorService {
  async getCurrentInstructor(): Promise<Instructor> {
    try {
      const response = await axios.get(API_ENDPOINTS.INSTRUCTOR.PROFILE.GET_CURRENT);
      return response.data.data;
    } catch (error) {
      console.error('Error getting current instructor:', error);
      throw error;
    }
  }

  async updateInstructor(id: string, data: UpdateInstructorDTO): Promise<Instructor> {
    try {
      const response = await axios.put(API_ENDPOINTS.INSTRUCTOR.PROFILE.UPDATE(id), data);
      return response.data.data;
    } catch (error) {
      console.error('Error updating instructor:', error);
      throw error;
    }
  }

  // Achievements
  async getAchievements(instructorId: string) {
    try {
      const response = await axios.get(API_ENDPOINTS.INSTRUCTOR.ACHIEVEMENTS.LIST(instructorId));
      return response.data.data;
    } catch (error) {
      console.error('Error getting achievements:', error);
      throw error;
    }
  }

  // Certificates
  async getCertificates(instructorId: string) {
    try {
      const response = await axios.get(API_ENDPOINTS.INSTRUCTOR.CERTIFICATES.LIST(instructorId));
      return response.data.data;
    } catch (error) {
      console.error('Error getting certificates:', error);
      throw error;
    }
  }

  // Work History
  async getWorkHistory(instructorId: string) {
    try {
      const response = await axios.get(API_ENDPOINTS.INSTRUCTOR.WORK_HISTORY.LIST(instructorId));
      return response.data.data;
    } catch (error) {
      console.error('Error getting work history:', error);
      throw error;
    }
  }

  async getTeachingSchedule(week?: string): Promise<TeachingSchedule[]> {
    try {
      const response = await axios.get(API_ENDPOINTS.INSTRUCTOR.TEACHING.SCHEDULE, {
        params: { week }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching teaching schedule:', error);
      throw error;
    }
  }

  async getInstructorCourses(): Promise<CourseWithClasses[]> {
    try {
      const response = await axios.get(API_ENDPOINTS.INSTRUCTOR.TEACHING.GET_COURSES);
      if (response.data) {
        return response.data;
      }
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error in getInstructorCourses:', error);
      throw error;
    }
  }

  updateClassStatus(classId: string, status: string): Promise<void> {
    return axios.patch(
      API_ENDPOINTS.INSTRUCTOR.TEACHING.CLASS_STATUS(classId),
      { status }
    );
  }
}

export const instructorService = new InstructorService(); 