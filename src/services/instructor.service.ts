import axios from '../config/axios.config';
import { Instructor, CreateInstructorDTO, UpdateInstructorDTO } from '../types/instructor.types';

class InstructorService {
  async listInstructors(): Promise<Instructor[]> {
    try {
      const response = await axios.get('/api/instructors');
      return response.data.data;
    } catch (error) {
      console.error('Error listing instructors:', error);
      throw error;
    }
  }

  async getInstructor(id: string): Promise<Instructor> {
    try {
      const response = await axios.get(`/api/instructors/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error getting instructor:', error);
      throw error;
    }
  }

  async createInstructor(data: CreateInstructorDTO): Promise<Instructor> {
    try {
      const response = await axios.post('/api/instructors', data);
      return response.data.data;
    } catch (error) {
      console.error('Error creating instructor:', error);
      throw error;
    }
  }

  async updateInstructor(id: string, data: UpdateInstructorDTO): Promise<Instructor> {
    try {
      const response = await axios.put(`/api/instructors/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error('Error updating instructor:', error);
      throw error;
    }
  }

  async deleteInstructor(id: string): Promise<void> {
    try {
      await axios.delete(`/api/instructors/${id}`);
    } catch (error) {
      console.error('Error deleting instructor:', error);
      throw error;
    }
  }
}

export const instructorService = new InstructorService(); 