export type ClassStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface Class {
  id: string;
  courseId: string;
  instructorId: string;
  classCode: string;
  startDate: string;
  endDate: string;
  schedule: string;
  room: string;
  capacity: number;
  status: ClassStatus;
  createdBy: string;
  updatedBy: string;
  created_at: string;
  updated_at: string;
  
  // Thêm các trường thống kê
  enrollmentCount?: number;
  totalLessons?: number;
  completedLessons?: number;
  announcements?: any[];

  // Mở rộng thông tin course
  course?: {
    id: string;
    name: string;
    code: string;
    credits: number;
    fee: number;
  };
  
  // Giữ nguyên các trường khác
  instructor?: {
    id: string;
    fullName: string;
  };
  creator?: {
    id: string;
    fullName: string;
  };
}

export const CLASS_STATUS_MAP: Record<ClassStatus, string> = {
  upcoming: 'Sắp diễn ra',
  ongoing: 'Đang diễn ra',
  completed: 'Đã kết thúc',
  cancelled: 'Đã hủy'
};

export interface CreateClassDTO {
  courseId: string;
  instructorId: string;
  startDate: string;
  endDate: string;
  schedule: string;
  room: string;
  capacity: number;
  classCode?: string;
}

export interface UpdateClassDTO extends Partial<CreateClassDTO> {
  status?: ClassStatus;
} 