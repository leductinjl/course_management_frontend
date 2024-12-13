import { EnrolledClass, ParsedSchedule, WeekSchedule, WeekDay, DaySchedule } from '../types/schedule.types';

export const scheduleUtils = {
  parseScheduleString: (scheduleStr: string | undefined | null): ParsedSchedule => {
    if (!scheduleStr) {
      return {
        days: [],
        startTime: '',
        endTime: '',
        room: ''
      };
    }

    try {
      // Format: "MON|09:30-12:00" hoặc "TUE,WED,FRI|07:30-09:00"
      const [daysStr, timeStr] = scheduleStr.split('|');
      
      if (!daysStr || !timeStr) {
        throw new Error('Invalid schedule format');
      }

      const days = daysStr.trim().split(',').filter(isWeekDay);
      const [startTime, endTime] = timeStr.trim().split('-');

      if (!startTime || !endTime) {
        throw new Error('Invalid time format');
      }

      return {
        days,
        startTime,
        endTime,
        room: ''
      };
    } catch (error) {
      console.error('Error parsing schedule:', error);
      return {
        days: [],
        startTime: '',
        endTime: '',
        room: ''
      };
    }
  },

  generateWeekSchedule: (enrolledClasses: EnrolledClass[]): WeekSchedule => {
    const emptySchedule = (): DaySchedule => ({});
    const weekDays: WeekDay[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const weekSchedule: WeekSchedule = {
      MON: emptySchedule(),
      TUE: emptySchedule(),
      WED: emptySchedule(),
      THU: emptySchedule(),
      FRI: emptySchedule(),
      SAT: emptySchedule()
    };

    const now = new Date();
    const timeSlots = new Set<string>();
    
    // Đầu tiên, thu thập tất cả các khung giờ
    enrolledClasses.forEach(classItem => {
      const startDate = new Date(classItem.start_date);
      const endDate = new Date(classItem.end_date);
      
      if (endDate < now || startDate > now) return;
      if (!classItem?.schedule) return;
      
      const schedule = scheduleUtils.parseScheduleString(classItem.schedule);
      if (schedule.days.length === 0) return;

      const timeSlot = `${schedule.startTime}-${schedule.endTime}`;
      timeSlots.add(timeSlot);
    });

    // Sắp xếp các khung giờ theo thứ tự tăng dần
    const sortedTimeSlots = Array.from(timeSlots).sort((a, b) => {
      const [aStart] = a.split('-');
      const [bStart] = b.split('-');
      return aStart.localeCompare(bStart);
    });

    // Sau đó, điền lớp học vào các khung giờ tương ứng
    enrolledClasses.forEach(classItem => {
      const startDate = new Date(classItem.start_date);
      const endDate = new Date(classItem.end_date);
      
      if (endDate < now || startDate > now) return;
      if (!classItem?.schedule) return;
      
      const schedule = scheduleUtils.parseScheduleString(classItem.schedule);
      if (schedule.days.length === 0) return;

      const timeSlot = `${schedule.startTime}-${schedule.endTime}`;
      
      schedule.days.forEach(day => {
        if (!isWeekDay(day)) return;

        const newCell = {
          courseCode: classItem.Course.code,
          courseName: classItem.Course.name,
          room: classItem.room,
          instructor: classItem.Instructor.full_name,
          classCode: classItem.class_code
        };

        weekSchedule[day][timeSlot] = newCell;
      });
    });

    // Đảm bảo mỗi ngày đều có đủ các khung giờ (kể cả null)
    weekDays.forEach(day => {
      sortedTimeSlots.forEach(timeSlot => {
        if (!weekSchedule[day][timeSlot]) {
          weekSchedule[day][timeSlot] = null;
        }
      });
    });

    return weekSchedule;
  },

  isTimeSlotOverlap: (slot1: string, slot2: string): boolean => {
    const [start1, end1] = slot1.split('-').map(time => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    });
    
    const [start2, end2] = slot2.split('-').map(time => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    });

    return !(end1 <= start2 || end2 <= start1);
  }
};

function isWeekDay(day: string): day is WeekDay {
  return ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].includes(day);
} 