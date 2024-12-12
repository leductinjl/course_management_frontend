export interface TeachingSchedule {
  id: string;
  courseCode: string;
  courseName: string;
  classCode: string;
  schedule: string;
  room: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
} 