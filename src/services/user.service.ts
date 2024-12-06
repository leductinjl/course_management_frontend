import { AxiosError } from 'axios';
import axiosInstance from '../config/axios.config';
import { API_ENDPOINTS } from '../config/api.config';
import { User, CreateUserRequest, UpdateUserRequest } from '../types/user.types';

export class ApiError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const userService = {
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ADMIN.USERS.LIST);
      return response.data.data;
    } catch (error) {
      const err = error as AxiosError<any>;
      throw new ApiError(
        err.response?.data?.message || 'Không thể tải danh sách người dùng',
        err.response?.data?.code
      );
    }
  },

  createUser: async (userData: CreateUserRequest): Promise<User> => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.ADMIN.USERS.CREATE, 
        userData
      );
      return response.data.data;
    } catch (error) {
      const err = error as AxiosError<any>;
      throw new ApiError(
        err.response?.data?.message || 'Không thể tạo người dùng',
        err.response?.data?.code
      );
    }
  },

  updateUser: async (id: string, userData: UpdateUserRequest): Promise<User> => {
    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.ADMIN.USERS.UPDATE(id),
        userData
      );
      return response.data.data;
    } catch (error) {
      const err = error as AxiosError<any>;
      throw new ApiError(
        err.response?.data?.message || 'Không thể cập nhật người dùng',
        err.response?.data?.code
      );
    }
  },

  deleteUser: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(API_ENDPOINTS.ADMIN.USERS.DELETE(id));
    } catch (error) {
      const err = error as AxiosError<any>;
      throw new ApiError(
        err.response?.data?.message || 'Không thể xóa người dùng',
        err.response?.data?.code
      );
    }
  }
}; 