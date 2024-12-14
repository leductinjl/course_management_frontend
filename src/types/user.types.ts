export interface BaseProfile {
  full_name: string;
  phone?: string;
  address?: string;
}

export interface StudentProfile extends BaseProfile {
  date_of_birth?: string;
}

export interface InstructorProfile extends BaseProfile {
  specialization?: string;
  bio?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'student' | 'instructor';
  status: 'active' | 'inactive';
  studentProfile?: StudentProfile;
  instructorProfile?: InstructorProfile;
  created_at: string;
  updated_at: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  role: 'student' | 'instructor';
  full_name: string;
  status?: 'active' | 'inactive';
  phone?: string;
  address?: string;
  date_of_birth?: string;
  specialization?: string;
  bio?: string;
}

export interface UpdateUserRequest {
  email?: string;
  full_name?: string;
  status?: 'active' | 'inactive';
  phone?: string;
  address?: string;
  date_of_birth?: string;
  specialization?: string;
  bio?: string;
}

export interface ApiErrorResponse {
  message: string;
  code: string;
  details?: any;
}