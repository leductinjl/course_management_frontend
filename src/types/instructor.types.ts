export interface Instructor {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  department?: string;
  title?: string;
  specialization?: string;
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

export interface UpdateInstructorDTO extends Partial<CreateInstructorDTO> {} 