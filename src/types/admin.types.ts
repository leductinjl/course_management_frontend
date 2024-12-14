export interface Admin {
  id: string;
  email: string;
  full_name: string;
  admin_type: 'super_admin' | 'course_admin' | 'user_admin' | 'finance_admin';
}

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  data: {
    token: string;
    admin: Admin;
  };
}

export interface ApiError {
  message: string;
  code: string;
}