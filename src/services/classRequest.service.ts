import { API_ENDPOINTS } from '../config/api.config';
import axiosInstance from '../config/axios.config';

export interface CreateClassRequestDTO {
  course_id: string;
  expected_students: number;
  desired_start_date: string;
  schedule_note: string;
  reason: string;
}

export interface ClassRequest {
  id: string;
  course: {
    id: string;
    name: string;
    code: string;
  };
  expected_students: number;
  desired_start_date: string;
  schedule_note: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  reviewed_at?: string;
  admin_notes?: string;
}

export const classRequestService = {
  createRequest: async (data: CreateClassRequestDTO): Promise<ClassRequest> => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.INSTRUCTOR.CLASS_REQUESTS.CREATE, data);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể tạo yêu cầu mở lớp');
    }
  },

  getMyRequests: async (): Promise<ClassRequest[]> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.INSTRUCTOR.CLASS_REQUESTS.MY_REQUESTS);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể lấy danh sách yêu cầu');
    }
  },

  updateRequest: async (id: string, data: CreateClassRequestDTO): Promise<ClassRequest> => {
    try {
      console.log('Updating request:', { id, data }); // Debug log
      const response = await axiosInstance.put(
        API_ENDPOINTS.INSTRUCTOR.CLASS_REQUESTS.UPDATE(id),
        data
      );
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Không thể cập nhật yêu cầu');
      }
      
      return response.data.data;
    } catch (error: any) {
      console.error('Error updating request:', error);
      throw new Error(error.response?.data?.message || 'Không thể cập nhật yêu cầu');
    }
  },

  deleteRequest: async (id: string): Promise<void> => {
    try {
      const response = await axiosInstance.delete(
        API_ENDPOINTS.INSTRUCTOR.CLASS_REQUESTS.DELETE(id)
      );
      if (!response.data.success) {
        throw new Error(response.data.message || 'Không thể xóa yêu cầu');
      }
    } catch (error: any) {
      console.error('Error deleting request:', error);
      throw new Error(error.response?.data?.message || 'Không thể xóa yêu cầu');
    }
  },

  getAllRequests: async (): Promise<ClassRequest[]> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.CLASS_REQUESTS.LIST);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể tải danh sách yêu cầu');
    }
  },

  reviewRequest: async (id: string, data: { status: 'approved' | 'rejected', admin_notes: string }): Promise<ClassRequest> => {
    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.ADMIN.CLASS_REQUESTS.REVIEW(id),
        data
      );
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Không thể cập nhật trạng thái yêu cầu');
    }
  },
};
