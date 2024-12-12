import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { instructorService } from '../../services/instructor.service';
import { CLASS_STATUS_MAP, ClassStatus } from '../../types/class.types';
import { format, addWeeks, startOfWeek, endOfWeek } from 'date-fns';
import { vi } from 'date-fns/locale';

const WEEKDAYS = [
  { id: 'MON', label: 'Thứ 2' },
  { id: 'TUE', label: 'Thứ 3' },
  { id: 'WED', label: 'Thứ 4' },
  { id: 'THU', label: 'Thứ 5' },
  { id: 'FRI', label: 'Thứ 6' },
  { id: 'SAT', label: 'Thứ 7' },
];

interface TeachingSchedule {
  id: string;
  courseName: string;
  classCode: string;
  room: string;
  status: ClassStatus;
  schedule: string; // Format: "MON,WED,FRI|09:30-11:30"
}

interface ScheduleItem {
  id: string;
  courseName: string;
  classCode: string;
  room: string;
  status: ClassStatus;
  dayOfWeek: string;
  timeSlot: string;
}

interface WeekOption {
  value: string;
  label: string;
  startDate: Date;
  endDate: Date;
}

const TeachingSchedule: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<string>('');
  const [weekOptions, setWeekOptions] = useState<WeekOption[]>([]);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSchedule();
  }, [selectedWeek]);

  // Tạo danh sách các tuần dựa trên thời gian của các lớp học
  const generateWeekOptions = (data: TeachingSchedule[]) => {
    const weekSet = new Set<string>();
    const options: WeekOption[] = [];

    // Lấy ngày bắt đầu và kết thúc từ dữ liệu lớp học
    const dates = data.reduce((acc: Date[], schedule) => {
      const [days, time] = schedule.schedule.split('|');
      const daysList = days.split(',');
      
      // Thêm tất cả các ngày trong tuần của lớp học
      daysList.forEach(day => {
        const date = getDateFromDayOfWeek(day);
        if (date) {
          acc.push(date);
        }
      });
      return acc;
    }, []);

    // Sắp xếp ngày tăng dần
    dates.sort((a, b) => a.getTime() - b.getTime());

    if (dates.length > 0) {
      // Lấy ngày đầu tiên của học kỳ (hoặc từ tuần hiện tại nếu đã bắt đầu)
      const today = new Date();
      const firstDate = dates[0].getTime() < today.getTime() ? today : dates[0];
      
      // Lấy ngày cuối cùng của học kỳ
      const lastDate = dates[dates.length - 1];
      
      // Bắt đầu từ tuần hiện tại hoặc tuần đầu học kỳ
      let currentWeekStart = startOfWeek(firstDate, { weekStartsOn: 1 });

      // Tạo danh sách các tuần từ ngày đầu tiên đến ngày cuối cùng
      while (currentWeekStart <= lastDate) {
        const weekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });
        const weekKey = format(currentWeekStart, 'yyyy-MM-dd');
        
        if (!weekSet.has(weekKey)) {
          weekSet.add(weekKey);
          
          // Tính số tuần so với tuần hiện tại
          const currentWeekNumber = Math.ceil(
            (currentWeekStart.getTime() - startOfWeek(today, { weekStartsOn: 1 }).getTime()) 
            / (7 * 24 * 60 * 60 * 1000)
          );

          let weekLabel = '';
          if (currentWeekNumber === 0) {
            weekLabel = 'Tuần này';
          } else if (currentWeekNumber === 1) {
            weekLabel = 'Tuần sau';
          } else {
            weekLabel = `Tuần ${format(currentWeekStart, 'dd/MM')} - ${format(weekEnd, 'dd/MM/yyyy')}`;
          }

          options.push({
            value: weekKey,
            label: weekLabel,
            startDate: currentWeekStart,
            endDate: weekEnd
          });
        }
        
        // Thêm 1 tuần
        currentWeekStart = addWeeks(currentWeekStart, 1);
      }
    }

    setWeekOptions(options);
    // Nếu chưa chọn tuần nào, chọn tuần hiện tại
    if (!selectedWeek && options.length > 0) {
      const currentWeek = options.find(week => 
        new Date() >= week.startDate && new Date() <= week.endDate
      );
      setSelectedWeek(currentWeek?.value || options[0].value);
    }
  };

  const getDateFromDayOfWeek = (dayCode: string): Date | null => {
    const today = new Date();
    const currentDay = today.getDay();
    const targetDay = WEEKDAYS.findIndex(day => day.id === dayCode);
    
    if (targetDay === -1) return null;
    
    const diff = targetDay - currentDay;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);
    
    return targetDate;
  };

  const parseScheduleData = (data: TeachingSchedule[]): ScheduleItem[] => {
    const scheduleItems: ScheduleItem[] = [];
    const uniqueTimeSlots = new Set<string>();
    
    data.forEach(schedule => {
      const [days, time] = schedule.schedule.split('|');
      const daysList = days.split(',');
      const formattedTime = convertTimeFormat(time);
      
      uniqueTimeSlots.add(formattedTime);
      
      daysList.forEach(day => {
        scheduleItems.push({
          ...schedule,
          dayOfWeek: day,
          timeSlot: formattedTime
        });
      });
    });

    // Sắp xếp các mốc thời gian
    setTimeSlots(Array.from(uniqueTimeSlots).sort());
    
    return scheduleItems;
  };

  const convertTimeFormat = (time: string): string => {
    const [start, end] = time.split('-');
    return `${start} - ${end}`;
  };

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      const data = await instructorService.getTeachingSchedule(selectedWeek);
      generateWeekOptions(data);
      const processedData = parseScheduleData(data);
      setSchedules(processedData);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScheduleForSlot = (dayId: string, timeSlot: string) => {
    return schedules.find(
      schedule => schedule.dayOfWeek === dayId && schedule.timeSlot === timeSlot
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Lịch giảng dạy</Typography>
        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel>Tuần</InputLabel>
          <Select
            value={selectedWeek}
            label="Tuần"
            onChange={(e) => setSelectedWeek(e.target.value)}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300
                }
              }
            }}
          >
            {weekOptions.map((week) => (
              <MenuItem key={week.value} value={week.value}>
                {week.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell 
                sx={{ 
                  width: '100px', 
                  fontWeight: 'bold',
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText'
                }}
              >
                Thời gian
              </TableCell>
              {WEEKDAYS.map((day) => (
                <TableCell 
                  key={day.id}
                  align="center"
                  sx={{ 
                    fontWeight: 'bold',
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText'
                  }}
                >
                  {day.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {timeSlots.map((timeSlot) => (
              <TableRow key={timeSlot}>
                <TableCell 
                  sx={{ 
                    fontWeight: 'bold',
                    backgroundColor: 'grey.100'
                  }}
                >
                  {timeSlot}
                </TableCell>
                {WEEKDAYS.map((day) => {
                  const scheduleItem = getScheduleForSlot(day.id, timeSlot);
                  return (
                    <TableCell 
                      key={day.id}
                      align="center"
                      sx={{ 
                        minHeight: '120px',
                        verticalAlign: 'top',
                        p: 2,
                        backgroundColor: scheduleItem ? 'action.hover' : 'inherit'
                      }}
                    >
                      {scheduleItem && (
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {scheduleItem.courseName}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 0.5 }}>
                            Lớp: {scheduleItem.classCode}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            Phòng: {scheduleItem.room}
                          </Typography>
                          <Chip
                            label={CLASS_STATUS_MAP[scheduleItem.status]}
                            color={
                              scheduleItem.status === 'ongoing' 
                                ? 'success' 
                                : scheduleItem.status === 'upcoming' 
                                  ? 'warning' 
                                  : 'default'
                            }
                            size="small"
                          />
                        </Box>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeachingSchedule; 