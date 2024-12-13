import { Dayjs } from "dayjs";

export type ClassStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export const CLASS_STATUS_MAP: Record<ClassStatus, string> = {
  'upcoming': 'Sắp diễn ra',
  'ongoing': 'Đang diễn ra',
  'completed': 'Đã hoàn thành',
  'cancelled': 'Đã hủy'
};

export const CLASS_STATUS_OPTIONS = [
  { value: 'upcoming' as ClassStatus, label: 'Sắp diễn ra' },
  { value: 'ongoing' as ClassStatus, label: 'Đang diễn ra' },
  { value: 'completed' as ClassStatus, label: 'Đã hoàn thành' },
  { value: 'cancelled' as ClassStatus, label: 'Đã hủy' }
];

export interface Class {
  id: string;
  class_code: string;
  schedule: string;
  room: string;
  capacity: number;
  start_date: string;
  end_date: string;
  status: ClassStatus;
  instructor?: {
    id: string;
    full_name: string;
    specialization?: string;
  };
}

export interface ClassWithEnrollment extends Class {
  enrollmentCount: number;
  isEnrolled?: boolean;
  instructor?: {
    id: string;
    full_name: string;
    specialization?: string;
  };
}

export interface FormValues {
  course_id: string;
  instructor_id: string;
  start_date: Dayjs | null;
  end_date: Dayjs | null;
  schedule: string;
  room: string;
  capacity: string;
  status: ClassStatus;
}

export interface CreateClassDTO {
  course_id: string;
  instructor_id: string;
  start_date: string;
  end_date: string;
  schedule: string;
  room: string;
  capacity: number;
  status: ClassStatus;
}

export interface UpdateClassDTO extends Partial<CreateClassDTO> {
  status?: ClassStatus;
} 