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

export interface EnrolledClass {
  id: string;
  class_code: string;
  schedule: string;  // format: "MON,WED,FRI|07:30-09:00"
  room: string;
  start_date: string;
  end_date: string;
  Course: {
    code: string;
    name: string;
  };
  Instructor: {
    full_name: string;
  };
}

export interface ParsedSchedule {
  days: string[];
  startTime: string;
  endTime: string;
  room: string;
}

export interface WeekOption {
  startDate: string;
  endDate: string;
  label: string;
  value: string;
} 