export type CourseStatus = 'draft' | 'active' | 'suspended' | 'discontinued';

export interface Course {
  id: string;
  code: string;
  name: string;
  description?: string;
  credits: number;
  type: 'basic' | 'advanced' | 'specialized';
  status: CourseStatus;
  fee: number;
  createdBy: string;
  updatedBy: string;
  created_at: string;
  updated_at: string;
  creator?: {
    id: string;
    fullName: string;
  };
}

export const COURSE_STATUS_MAP: Record<CourseStatus, string> = {
  draft: 'Nháp',
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