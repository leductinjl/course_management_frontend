export interface EnrollmentHistory {
    id: string;
    enrollment_id: string;
    class_id: string;
    action: 'enrolled' | 'cancelled';
    action_date: string;
    reason?: string;
    note?: string;
    Class: {
      id: string;
      class_code: string;
      Course: {
        code: string;
        name: string;
      }
    }
  }

export interface EnrolledCourse {
  id: string;
  name: string;
  code: string;
  credits: number;
  type: string;
  class_id: string;
  class_code: string;
  instructor: string;
  schedule: string;
  start_date: string;
  end_date: string;
  room: string;
  status: string;
  enrolled_at: string;
}
