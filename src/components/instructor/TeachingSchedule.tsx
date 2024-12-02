import React, { useState } from 'react';
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

interface Schedule {
  id: number;
  courseCode: string;
  courseName: string;
  class: string;
  dayOfWeek: string;
  time: string;
  room: string;
  status: 'Đang diễn ra' | 'Sắp diễn ra' | 'Đã kết thúc';
  startDate: string;
  endDate: string;
}

const TeachingSchedule: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');
  
  const schedules: Schedule[] = [
    {
      id: 1,
      courseCode: 'CS101',
      courseName: 'Tin học văn phòng',
      class: 'A1',
      dayOfWeek: 'Thứ 2, 4, 6',
      time: '18:00 - 20:00',
      room: 'A101',
      status: 'Đang diễn ra',
      startDate: '01/03/2024',
      endDate: '30/04/2024'
    },
    // Thêm dữ liệu mẫu khác
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Lịch giảng dạy</Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Tuần</InputLabel>
          <Select
            value={selectedWeek}
            label="Tuần"
            onChange={(e) => setSelectedWeek(e.target.value)}
          >
            <MenuItem value="current">Tuần hiện tại</MenuItem>
            <MenuItem value="next">Tuần sau</MenuItem>
            <MenuItem value="all">Tất cả</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã môn</TableCell>
              <TableCell>Tên môn học</TableCell>
              <TableCell>Lớp</TableCell>
              <TableCell>Thứ</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Phòng</TableCell>
              <TableCell>Thời gian học</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell>{schedule.courseCode}</TableCell>
                <TableCell>{schedule.courseName}</TableCell>
                <TableCell>{schedule.class}</TableCell>
                <TableCell>{schedule.dayOfWeek}</TableCell>
                <TableCell>{schedule.time}</TableCell>
                <TableCell>{schedule.room}</TableCell>
                <TableCell>
                  {schedule.startDate} - {schedule.endDate}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={schedule.status}
                    color={
                      schedule.status === 'Đang diễn ra' 
                        ? 'success' 
                        : schedule.status === 'Sắp diễn ra' 
                          ? 'warning' 
                          : 'default'
                    }
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeachingSchedule; 