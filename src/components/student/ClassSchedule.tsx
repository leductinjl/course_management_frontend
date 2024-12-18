import React, { useEffect, useState } from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Box,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { scheduleService } from '../../services/schedule.service';
import { WeekSchedule, WeekDay, WeekOption } from '../../types/schedule.types';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.locale('vi');

const ClassSchedule: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weekSchedule, setWeekSchedule] = useState<WeekSchedule | null>(null);
  const [weekOptions, setWeekOptions] = useState<WeekOption[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<string>('');

  const dayHeaders: { key: WeekDay; label: string }[] = [
    { key: 'MON', label: 'Thứ 2' },
    { key: 'TUE', label: 'Thứ 3' },
    { key: 'WED', label: 'Thứ 4' },
    { key: 'THU', label: 'Thứ 5' },
    { key: 'FRI', label: 'Thứ 6' },
    { key: 'SAT', label: 'Thứ 7' }
  ];

  // Tạo danh sách các tuần từ ngày bắt đầu đến ngày kết thúc
  const generateWeekOptions = (enrolledClasses: any[]) => {
    const weeks = new Set<string>();
    const options: WeekOption[] = [];

    enrolledClasses.forEach(classItem => {
      const startDate = dayjs(classItem.start_date);
      const endDate = dayjs(classItem.end_date);
      let currentDate = startDate;

      while (currentDate.isSameOrBefore(endDate, 'week')) {
        const weekStart = currentDate.startOf('week').add(1, 'day'); // Thứ 2
        const weekEnd = weekStart.add(5, 'day'); // Thứ 7
        const weekKey = weekStart.format('YYYY-MM-DD');

        if (!weeks.has(weekKey)) {
          weeks.add(weekKey);
          options.push({
            startDate: weekStart.format('YYYY-MM-DD'),
            endDate: weekEnd.format('YYYY-MM-DD'),
            label: `Tuần ${weekStart.format('DD/MM')} - ${weekEnd.format('DD/MM/YYYY')}`,
            value: weekKey
          });
        }
        currentDate = currentDate.add(1, 'week');
      }
    });

    return options.sort((a, b) => a.startDate.localeCompare(b.startDate));
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const enrolledClasses = await scheduleService.getEnrolledClasses();
        const options = generateWeekOptions(enrolledClasses);
        setWeekOptions(options);
        
        // Chọn tuần hiện tại hoặc tuần gần nhất
        const currentDate = dayjs();
        const currentWeekStart = currentDate.startOf('week').add(1, 'day');
        const currentWeekKey = currentWeekStart.format('YYYY-MM-DD');
        
        // Tìm tuần mặc định - nên là tuần gần nhất có lớp học
        const defaultWeek = options.find(w => {
          const weekStart = dayjs(w.startDate);
          return weekStart.isSameOrAfter(currentWeekStart) || 
                 weekStart.isSame(currentWeekStart, 'day');
        }) || options[0];

        if (defaultWeek) {
          setSelectedWeek(defaultWeek.value);
          const filteredSchedule = scheduleService.generateWeekSchedule(
            enrolledClasses.filter(cls => {
              const classStart = dayjs(cls.start_date);
              const classEnd = dayjs(cls.end_date);
              const weekStart = dayjs(defaultWeek.startDate);
              const weekEnd = dayjs(defaultWeek.endDate);
              return classStart.isSameOrBefore(weekEnd) && classEnd.isSameOrAfter(weekStart);
            })
          );
          setWeekSchedule(filteredSchedule);
        }
        
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Có lỗi xảy ra khi tải lịch học');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const handleWeekChange = async (event: SelectChangeEvent<string>) => {
    const weekKey = event.target.value;
    setSelectedWeek(weekKey);
    
    try {
      setLoading(true);
      const enrolledClasses = await scheduleService.getEnrolledClasses();
      const selectedWeekData = weekOptions.find(w => w.value === weekKey);
      
      if (selectedWeekData) {
        const filteredSchedule = scheduleService.generateWeekSchedule(
          enrolledClasses.filter(cls => {
            const classStart = dayjs(cls.start_date);
            const classEnd = dayjs(cls.end_date);
            const weekStart = dayjs(selectedWeekData.startDate);
            const weekEnd = dayjs(selectedWeekData.endDate);
            return classStart.isSameOrBefore(weekEnd) && classEnd.isSameOrAfter(weekStart);
          })
        );
        setWeekSchedule(filteredSchedule);
      }
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi tải lịch học');
    } finally {
      setLoading(false);
    }
  };

  // Lấy tất cả các time slot có lớp học
  const getUniqueTimeSlots = () => {
    if (!weekSchedule) return [];
    
    const timeSlots = new Set<string>();
    dayHeaders.forEach(({ key }) => {
      Object.keys(weekSchedule[key]).forEach(timeSlot => {
        timeSlots.add(timeSlot);
      });
    });
    return Array.from(timeSlots).sort((a, b) => {
      const [aStart] = a.split('-');
      const [bStart] = b.split('-');
      return aStart.localeCompare(bStart);
    });
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Thời Khóa Biểu
        </Typography>
        <FormControl sx={{ minWidth: 300 }}>
          <Select
            value={selectedWeek}
            onChange={handleWeekChange}
            size="small"
          >
            {weekOptions.map((week) => (
              <MenuItem key={week.value} value={week.value}>
                {week.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Thời gian</TableCell>
                {dayHeaders.map(day => (
                  <TableCell key={day.key}>{day.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {getUniqueTimeSlots().map(timeSlot => (
                <TableRow key={timeSlot}>
                  <TableCell>{timeSlot}</TableCell>
                  {dayHeaders.map(day => {
                    const cell = weekSchedule?.[day.key][timeSlot];
                    return (
                      <TableCell key={`${timeSlot}-${day.key}`}>
                        {cell ? (
                          <div>
                            <Typography variant="body2" fontWeight="bold">
                              {cell.courseName}
                            </Typography>
                            <Typography variant="caption" display="block">
                              Phòng: {cell.room}
                            </Typography>
                            <Typography variant="caption" display="block">
                              GV: {cell.instructor}
                            </Typography>
                          </div>
                        ) : '-'}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default ClassSchedule; 