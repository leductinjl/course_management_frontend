export type CourseStatus = 'draft' | 'active' | 'suspended' | 'discontinued';
export type CourseType = 'basic' | 'advanced' | 'specialized';

export const COURSE_TYPE_MAP: Record<CourseType, string> = {
  basic: 'Cơ bản',
  advanced: 'Nâng cao',
  specialized: 'Chuyên ngành'
};

export const COURSE_STATUS_MAP: Record<CourseStatus, string> = {
  draft: 'Sắp mở',
  active: 'Đang mở',
  suspended: 'Đang tạm ngưng',
  discontinued: 'Ngưng hoàn toàn'
};

export const COURSE_STATUS_COLORS: Record<CourseStatus, 'default' | 'success' | 'warning' | 'error'> = {
  draft: 'default',
  active: 'success',
  suspended: 'warning',
  discontinued: 'error'
};

export interface Course {
  id: string;
  code: string;
  name: string;
  description?: string;
  credits: number;
  type: CourseType;
  status: CourseStatus;
  fee: number;
  created_at: string;
  updated_at: string;
  creator?: {
    id: string;
    full_name: string;
  };
  updater?: {
    id: string;
    full_name: string;
  };
  instructors?: {
    id: string;
    full_name: string;
    specialization?: string;
  }[];
}

export interface CreateCourseDTO {
  code: string;
  name: string;
  description?: string;
  credits: number;
  type: string;
  fee: number;
  status?: CourseStatus;
}

export interface UpdateCourseDTO extends Partial<CreateCourseDTO> {}

export interface CourseFilter {
  status?: CourseStatus;
  type?: string;
  search?: string;
} 