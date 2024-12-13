export interface TeachingSchedule {
  id: string;
  courseCode: string;
  courseName: string;
  class_code: string;
  schedule: string;
  room: string;
  start_date: string;
  end_date: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
} 