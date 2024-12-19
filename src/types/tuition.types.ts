export interface Tuition {
  id: string;
  amount: number;
  due_date: string;
  status: 'pending' | 'paid' | 'processing' | 'overdue';
  course: {
    code: string;
    name: string;
  };
}

export interface TuitionPaymentResponse {
  success: boolean;
  data: {
    paymentUrl: string;
  };
}

export interface TuitionResponse {
  success: boolean;
  data: Tuition[];
} 