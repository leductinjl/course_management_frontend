export interface BaseProfile {
  fullName: string;
  phone?: string;
  address?: string;
}

export interface StudentProfile extends BaseProfile {
  dateOfBirth?: string;
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
}

export interface CreateUserRequest {
  email: string;
  password: string;
  role: 'student' | 'instructor';
  fullName: string;
  status?: 'active' | 'inactive';
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  specialization?: string;
  bio?: string;
}

export interface UpdateUserRequest {
  email?: string;
  fullName?: string;
  status?: 'active' | 'inactive';
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  specialization?: string;
  bio?: string;
}

export interface ApiErrorResponse {
  message: string;
  code: string;
  details?: any;
}