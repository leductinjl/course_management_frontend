import axios from '../config/axios.config';
import { Course } from '../types/course.types';
import { Class } from '../types/class.types';
import { API_ENDPOINTS } from '../config/api.config';
import { Instructor, UpdateInstructorDTO, CreateAchievementDTO, CreateCertificateDTO, CreateWorkHistoryDTO, InstructorAchievement, InstructorCertificate, InstructorWorkHistory } from '../types/instructor.types';
import { TeachingSchedule } from '../types/teaching.types';
import axiosInstance from '../config/axios.config';

interface CourseWithClasses extends Course {
  classes: Class[];
}

class InstructorService {
  async getCurrentInstructor(): Promise<Instructor> {
    try {
      const instructorToken = localStorage.getItem('instructorToken');
      console.log('Instructor token:', instructorToken);
      
      const response = await axiosInstance.get(API_ENDPOINTS.INSTRUCTOR.PROFILE.GET_CURRENT);
      console.log('Response from getCurrentInstructor:', response);
      
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      
      return response.data.data;
    } catch (error: any) {
      console.error('Error in getCurrentInstructor:', error.response?.data || error);
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
  async getAchievements(instructor_id: string): Promise<InstructorAchievement[]> {
    const response = await axios.get(
      API_ENDPOINTS.INSTRUCTOR.ACHIEVEMENTS.LIST(instructor_id)
    );
    return response.data.data;
  }

  async createAchievement(instructor_id: string, data: CreateAchievementDTO) {
    const response = await axios.post(
      API_ENDPOINTS.INSTRUCTOR.ACHIEVEMENTS.CREATE(instructor_id),
      data
    );
    return response.data.data;
  }

  async updateAchievement(instructor_id: string, achievementId: string, data: CreateAchievementDTO) {
    const response = await axios.put(
      API_ENDPOINTS.INSTRUCTOR.ACHIEVEMENTS.UPDATE(instructor_id, achievementId),
      data
    );
    return response.data.data;
  }

  async deleteAchievement(instructor_id: string, achievementId: string) {
    await axios.delete(
      API_ENDPOINTS.INSTRUCTOR.ACHIEVEMENTS.DELETE(instructor_id, achievementId)
    );
  }

  // Certificates
  async getCertificates(instructor_id: string): Promise<InstructorCertificate[]> {
    const response = await axios.get(
      API_ENDPOINTS.INSTRUCTOR.CERTIFICATES.LIST(instructor_id)
    );
    return response.data.data;
  }

  async createCertificate(instructor_id: string, data: CreateCertificateDTO) {
    const response = await axios.post(
      API_ENDPOINTS.INSTRUCTOR.CERTIFICATES.CREATE(instructor_id),
      data
    );
    return response.data.data;
  }

  async updateCertificate(instructor_id: string, certificateId: string, data: CreateCertificateDTO) {
    const response = await axios.put(
      API_ENDPOINTS.INSTRUCTOR.CERTIFICATES.UPDATE(instructor_id, certificateId),
      data
    );
    return response.data.data;
  }

  async deleteCertificate(instructor_id: string, certificateId: string) {
    await axios.delete(
      API_ENDPOINTS.INSTRUCTOR.CERTIFICATES.DELETE(instructor_id, certificateId)
    );
  }

  // Work History
  async getWorkHistory(instructor_id: string): Promise<InstructorWorkHistory[]> {
    const response = await axios.get(
      API_ENDPOINTS.INSTRUCTOR.WORK_HISTORY.LIST(instructor_id)
    );
    return response.data.data;
  }

  async createWorkHistory(instructor_id: string, data: CreateWorkHistoryDTO) {
    const response = await axios.post(
      API_ENDPOINTS.INSTRUCTOR.WORK_HISTORY.CREATE(instructor_id),
      data
    );
    return response.data.data;
  }

  async updateWorkHistory(instructor_id: string, historyId: string, data: CreateWorkHistoryDTO) {
    const response = await axios.put(
      API_ENDPOINTS.INSTRUCTOR.WORK_HISTORY.UPDATE(instructor_id, historyId),
      data
    );
    return response.data.data;
  }

  async deleteWorkHistory(instructor_id: string, historyId: string) {
    await axios.delete(
      API_ENDPOINTS.INSTRUCTOR.WORK_HISTORY.DELETE(instructor_id, historyId)
    );
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

  updateClassStatus(class_id: string, status: string): Promise<void> {
    return axios.patch(
      API_ENDPOINTS.INSTRUCTOR.TEACHING.CLASS_STATUS(class_id),
      { status }
    );
  }
}

export const instructorService = new InstructorService();
