// src/types/userTypes.ts

// Basic user information
export interface User {
  id: string;
  email: string;
  role: 'student' | 'instructor';
}

// Student profile information
export interface StudentProfile {
  id: string;
  fullName: string;
  status: string;
}

// Complete user information including profile
export interface UserWithProfile extends User {
  student?: StudentProfile;
}

// Registration form data
export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phoneNumber?: string;
  address?: string;
}
  