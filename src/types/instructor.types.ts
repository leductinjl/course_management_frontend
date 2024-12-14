export interface Instructor {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  address?: string;
  specialization?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateInstructorDTO {
  full_name: string;
  email: string;
  phone?: string;
  department?: string;
  title?: string;
  specialization?: string;
}

export interface UpdateInstructorDTO {
  full_name?: string;
  phone?: string;
  address?: string;
  specialization?: string;
  bio?: string;
} 

// Thêm các interface mới
export interface InstructorAchievement {
  id: string;
  title: string;
  description?: string;
  achievementDate: string;
}

export interface InstructorCertificate {
  id: string;
  name: string;
  issuer: string;
  issue_year: number;
}

export interface InstructorWorkHistory {
  id: string;
  position: string;
  department: string;
  start_date: string;
  end_date?: string;
  responsibilities: string[];
}

// DTOs for creating/updating
export interface CreateAchievementDTO {
  title: string;
  description?: string;
  achievementDate: string;
}

export interface CreateCertificateDTO {
  name: string;
  issuer: string;
  issue_year: number;
}

export interface CreateWorkHistoryDTO {
  position: string;
  department: string;
  start_date: string;
  end_date?: string;
  responsibilities: string[];
}