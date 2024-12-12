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
  classCode: string;
  courseId: string;
  instructorId: string;
  startDate: string;
  endDate: string;
  schedule: string;
  room: string;
  capacity: number;
  status: ClassStatus;
  Course?: {
    id: string;
    name: string;
    code: string;
    credits: number;
    fee: number;
  };
  Instructor?: {
    id: string;
    fullName: string;
    specialization?: string;
  };
  creator?: {
    id: string;
    fullName: string;
  };
  created_at: string;
  updated_at: string;
  stats?: {
    enrollmentCount: number;
    completedLessons: number;
    totalLessons: number;
    announcementCount: number;
  };
}

export interface FormValues {
  courseId: string;
  instructorId: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  schedule: string;
  room: string;
  capacity: string;
  status: ClassStatus;
}

export interface CreateClassDTO {
  courseId: string;
  instructorId: string;
  startDate: string;
  endDate: string;
  schedule: string;
  room: string;
  capacity: number;
  status: ClassStatus;
}

export interface UpdateClassDTO extends Partial<CreateClassDTO> {
  status?: ClassStatus;
} 