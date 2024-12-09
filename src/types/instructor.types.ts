export interface Instructor {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  specialization?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateInstructorDTO {
  fullName: string;
  email: string;
  phone?: string;
  department?: string;
  title?: string;
  specialization?: string;
}

export interface UpdateInstructorDTO {
  fullName?: string;
  phone?: string;
  address?: string;
  specialization?: string;
  bio?: string;
} 