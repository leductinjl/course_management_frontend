import { API_ENDPOINTS } from '../config/api.config';
import axiosInstance from '../config/axios.config';
import { EnrolledClass, WeekSchedule } from '../types/schedule.types';
import { scheduleUtils } from '../utils/schedule.utils';

export const scheduleService = {
  getEnrolledClasses: async (): Promise<EnrolledClass[]> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.STUDENT.SCHEDULE);
      
      console.log('Schedule API response:', response.data);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Không thể tải danh sách lớp học');
      }
      
      return response.data.data;
    } catch (error: any) {
      console.error('Error fetching schedule:', error);
      throw new Error(
        error.response?.data?.message || 
        'Không thể tải danh sách lớp học'
      );
    }
  },

  generateWeekSchedule: (enrolledClasses: EnrolledClass[]): WeekSchedule => {
    return scheduleUtils.generateWeekSchedule(enrolledClasses);
  }
}; 