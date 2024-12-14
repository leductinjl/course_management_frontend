// frontend/src/types/grade.types.ts
export interface Grade {
    id: string;
    enrollment_id: string;
    attendance_score?: number;
    midterm_score?: number; 
    final_score?: number;
    total_score?: number;
    grade_status: 'pending' | 'graded' | 'verified';
    last_updated_by?: string;
    verified_by?: string;
    verified_at?: string;
  }
  
  export interface StudentGrade {
    enrollment_id: string;
    student_id: string;
    student_name: string;
    attendance_score: number | null;
    midterm_score: number | null;
    final_score: number | null;
    total_score: number | null;
    grade_status: 'pending' | 'graded' | 'verified';
  }
  
  export interface GradeUpdateDTO {
    enrollment_id: string;
    attendance_score: number | null;
    midterm_score: number | null;
    final_score: number | null;
  }
  
  export interface EditedGrades {
    attendance: string;
    midterm_score: string;
    final_score: string;
  }