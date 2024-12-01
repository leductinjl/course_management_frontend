import React from 'react';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const ClassSchedule: React.FC = () => {
  const schedule = [
    {
      id: 1,
      time: '18:00 - 20:00',
      monday: 'Tin học văn phòng (A101)',
      tuesday: '-',
      wednesday: 'Tin học văn phòng (A101)',
      thursday: '-',
      friday: 'Tin học văn phòng (A101)',
      saturday: '-',
      sunday: '-',
    },
    {
      id: 2,
      time: '20:00 - 21:30',
      monday: '-',
      tuesday: 'Tiếng Anh B1 (B203)',
      wednesday: '-',
      thursday: 'Tiếng Anh B1 (B203)',
      friday: '-',
      saturday: '-',
      sunday: '-',
    },
  ];

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Lịch học
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Thời gian</TableCell>
              <TableCell>Thứ 2</TableCell>
              <TableCell>Thứ 3</TableCell>
              <TableCell>Thứ 4</TableCell>
              <TableCell>Thứ 5</TableCell>
              <TableCell>Thứ 6</TableCell>
              <TableCell>Thứ 7</TableCell>
              <TableCell>Chủ nhật</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.monday}</TableCell>
                <TableCell>{row.tuesday}</TableCell>
                <TableCell>{row.wednesday}</TableCell>
                <TableCell>{row.thursday}</TableCell>
                <TableCell>{row.friday}</TableCell>
                <TableCell>{row.saturday}</TableCell>
                <TableCell>{row.sunday}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ClassSchedule; 