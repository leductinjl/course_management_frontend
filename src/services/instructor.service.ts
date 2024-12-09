import axios from '../config/axios.config';
import { API_ENDPOINTS } from '../config/api.config';
import { Instructor, UpdateInstructorDTO } from '../types/instructor.types';

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
}

export const instructorService = new InstructorService(); 