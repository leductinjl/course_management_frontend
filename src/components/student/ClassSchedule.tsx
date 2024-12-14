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
} from '@mui/material';
import { scheduleService } from '../../services/schedule.service';
import { WeekSchedule, WeekDay } from '../../types/schedule.types';

const ClassSchedule: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weekSchedule, setWeekSchedule] = useState<WeekSchedule | null>(null);

  const dayHeaders: { key: WeekDay; label: string }[] = [
    { key: 'MON', label: 'Thứ 2' },
    { key: 'TUE', label: 'Thứ 3' },
    { key: 'WED', label: 'Thứ 4' },
    { key: 'THU', label: 'Thứ 5' },
    { key: 'FRI', label: 'Thứ 6' },
    { key: 'SAT', label: 'Thứ 7' }
  ];

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const enrolledClasses = await scheduleService.getEnrolledClasses();
        const schedule = scheduleService.generateWeekSchedule(enrolledClasses);
        setWeekSchedule(schedule);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Có lỗi xảy ra khi tải lịch học');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

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
      <Typography variant="h6" gutterBottom>
        Thời Khóa Biểu
      </Typography>
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
    </>
  );
};

export default ClassSchedule; 