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
  Button,
  Box,
  Chip,
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';

const Tuition: React.FC = () => {
  const tuitions = [
    {
      id: 1,
      courseCode: 'CS101',
      courseName: 'Tin học văn phòng',
      amount: 2500000,
      dueDate: '2024-03-15',
      status: 'Chưa thanh toán',
    },
    {
      id: 2,
      courseCode: 'ENG201',
      courseName: 'Tiếng Anh B1',
      amount: 3000000,
      dueDate: '2024-03-20',
      status: 'Đã thanh toán',
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Học phí
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã môn</TableCell>
              <TableCell>Tên môn học</TableCell>
              <TableCell align="right">Số tiền</TableCell>
              <TableCell>Hạn nộp</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tuitions.map((tuition) => (
              <TableRow key={tuition.id}>
                <TableCell>{tuition.courseCode}</TableCell>
                <TableCell>{tuition.courseName}</TableCell>
                <TableCell align="right">
                  {formatCurrency(tuition.amount)}
                </TableCell>
                <TableCell>{tuition.dueDate}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={tuition.status}
                    color={tuition.status === 'Đã thanh toán' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  {tuition.status === 'Chưa thanh toán' && (
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<PaymentIcon />}
                      onClick={() => {
                        // Xử lý thanh toán
                        console.log('Thanh toán cho khóa học:', tuition.courseCode);
                      }}
                    >
                      Thanh toán
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Tuition; 