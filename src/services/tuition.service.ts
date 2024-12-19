import { API_ENDPOINTS } from '../config/api.config';
import axiosInstance from '../config/axios.config';
import { Tuition, TuitionResponse, TuitionPaymentResponse } from '../types/tuition.types';

export const tuitionService = {
  getMyTuitions: async (): Promise<Tuition[]> => {
    try {
      const response = await axiosInstance.get<TuitionResponse>(
        API_ENDPOINTS.STUDENT.TUITION.MY_TUITIONS
      );
      
      if (!response.data.success) {
        throw new Error('Failed to fetch tuitions');
      }
      
      return response.data.data;
    } catch (error: any) {
      console.error('Error fetching tuitions:', error);
      throw new Error(
        error.response?.data?.message || 
        'Không thể tải thông tin học phí'
      );
    }
  },

  createVNPayPayment: async (tuitionId: string): Promise<{ paymentUrl: string }> => {
    try {
      console.log('Calling VNPay create endpoint with tuitionId:', tuitionId);
      
      const response = await axiosInstance.post(API_ENDPOINTS.STUDENT.TUITION.VNPAY_CREATE, {
        tuition_id: tuitionId
      });

      console.log('VNPay create response:', response.data);

      if (!response.data.success) {
        throw new Error('Failed to create VNPay payment');
      }

      if (!response.data.data?.paymentUrl) {
        throw new Error('No payment URL received');
      }

      return response.data.data;
    } catch (error: any) {
      console.error('Error creating VNPay payment:', error);
      throw new Error(
        error.response?.data?.message || 
        'Không thể tạo thanh toán VNPay'
      );
    }
  },

  // Phương thức xử lý kết quả thanh toán từ VNPay
  handleVNPayReturn: async (params: any): Promise<TuitionPaymentResponse> => {
    try {
      const response = await axiosInstance.get<TuitionPaymentResponse>(
        `${API_ENDPOINTS.STUDENT.TUITION.VNPAY_RETURN}?${new URLSearchParams(params)}`
      );

      if (!response.data.success) {
        throw new Error('Payment verification failed');
      }

      return response.data;
    } catch (error: any) {
      console.error('Error handling VNPay return:', error);
      throw new Error(
        error.response?.data?.message || 
        'Không thể xác nhận thanh toán'
      );
    }
  }
}; 