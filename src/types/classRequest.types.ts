import { Course } from './course.types';
import { Instructor } from './instructor.types';
import { Admin } from './admin.types';

export interface ClassRequest {
  id: string;
  course_id: string;
  instructor_id: string;
  expected_students: number;
  desired_start_date: string;
  schedule_note: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
  updated_at: string;
  
  // Relations
  course: Course;
  instructor: Instructor;
  reviewer?: Admin;
}

export interface CreateClassRequestDTO {
  course_id: string;
  expected_students: number;
  desired_start_date: string;
  schedule_note: string;
  reason: string;
}

export interface ReviewClassRequestDTO {
  status: 'approved' | 'rejected';
  admin_notes: string;
}

export const CLASS_REQUEST_STATUS_MAP = {
  pending: 'Chờ duyệt',
  approved: 'Đã duyệt',
  rejected: 'Từ chối'
} as const; 