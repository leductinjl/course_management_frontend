import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';

const ExamSchedule: React.FC = () => {
  const exams = [
    {
      id: 1,
      courseCode: 'CS101',
      courseName: 'Tin học văn phòng',
      examDate: '2024-03-20',
      examTime: '18:00 - 19:30',
      room: 'A101',
      type: 'Cuối kỳ',
      status: 'Sắp thi',
    },
    {
      id: 2,
      courseCode: 'ENG201',
      courseName: 'Tiếng Anh B1',
      examDate: '2024-03-25',
      examTime: '18:00 - 20:00',
      room: 'B203',
      type: 'Giữa kỳ',
      status: 'Sắp thi',
    },
  ];

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Lịch thi
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã môn</TableCell>
              <TableCell>Tên môn học</TableCell>
              <TableCell>Ngày thi</TableCell>
              <TableCell>Giờ thi</TableCell>
              <TableCell>Phòng thi</TableCell>
              <TableCell>Loại thi</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>{exam.courseCode}</TableCell>
                <TableCell>{exam.courseName}</TableCell>
                <TableCell>{exam.examDate}</TableCell>
                <TableCell>{exam.examTime}</TableCell>
                <TableCell>{exam.room}</TableCell>
                <TableCell>{exam.type}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={exam.status}
                    color="primary"
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ExamSchedule; 