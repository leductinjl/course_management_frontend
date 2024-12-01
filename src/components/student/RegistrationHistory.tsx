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

const RegistrationHistory: React.FC = () => {
  const registrations = [
    {
      id: 1,
      courseCode: 'CS101',
      courseName: 'Tin học văn phòng',
      registrationDate: '2024-01-15',
      status: 'Đã xác nhận',
    },
    {
      id: 2,
      courseCode: 'ENG201',
      courseName: 'Tiếng Anh B1',
      registrationDate: '2024-02-01',
      status: 'Chờ xác nhận',
    },
  ];

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Lịch sử đăng ký khóa học
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã khóa học</TableCell>
              <TableCell>Tên khóa học</TableCell>
              <TableCell>Ngày đăng ký</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registrations.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.courseCode}</TableCell>
                <TableCell>{row.courseName}</TableCell>
                <TableCell>{row.registrationDate}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    color={row.status === 'Đã xác nhận' ? 'success' : 'warning'}
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

export default RegistrationHistory; 