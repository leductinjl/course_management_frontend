export interface Student {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  address?: string;
  date_of_birth?: string | null;
  created_at: string;
  updated_at: string;
}

export interface UpdateStudentDTO {
  full_name?: string;
  phone?: string;
  address?: string;
  date_of_birth?: string | null;
} 