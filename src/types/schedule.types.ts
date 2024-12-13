import { Class } from './class.types';
import { Course } from './course.types';
import { Instructor } from './instructor.types';

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface ScheduleCell {
  courseCode: string;
  courseName: string;
  room: string;
  instructor: string;
  classCode: string;
}

export interface DaySchedule {
  [key: string]: ScheduleCell | null; // key là thời gian slot, value là thông tin môn học
}

export type WeekDay = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';

export interface WeekSchedule {
  MON: DaySchedule;
  TUE: DaySchedule;
  WED: DaySchedule;
  THU: DaySchedule;
  FRI: DaySchedule;
  SAT: DaySchedule;
}

export interface EnrolledClass extends Class {
  Course: Course;
  Instructor: Instructor;
}

export interface ParsedSchedule {
  days: string[];
  startTime: string;
  endTime: string;
  room: string;
} 