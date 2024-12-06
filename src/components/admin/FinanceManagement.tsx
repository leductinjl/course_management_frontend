import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@mui/material';
import PaymentDialog from './finance/PaymentDialog';
import RevenueDetailsDialog from './finance/RevenueDetailsDialog';

const FinanceManagement = () => {
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openRevenueDialog, setOpenRevenueDialog] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<any>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<any>(null);

  const instructors = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      classes: [
        { id: 1, name: 'CS101-A', hours: 30, amount: 3000000 },
        { id: 2, name: 'CS102-B', hours: 40, amount: 4000000 },
      ],
      totalSalary: 7000000,
    },
    // ... more instructors
  ];

  const revenuePeriods = [
    {
      period: 'Tháng 1/2024',
      tuitionDetails: [
        { id: 1, className: 'CS101-A', studentCount: 25, tuitionPerStudent: 1000000, totalTuition: 25000000 },
        // ... more classes
      ],
      expenses: [
        { id: 1, category: 'Điện nước', description: 'Chi phí điện nước tháng 1', amount: 2000000 },
        // ... more expenses
      ],
      totalRevenue: 50000000,
      totalExpense: 10000000,
      profit: 40000000,
    },
    // ... more periods
  ];

  const handleOpenPaymentDialog = (instructor: any) => {
    setSelectedInstructor(instructor);
    setOpenPaymentDialog(true);
  };

  const handleOpenRevenueDialog = (period: any) => {
    setSelectedPeriod(period);
    setOpenRevenueDialog(true);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>Quản lý tài chính</Typography>
      
      {/* Thống kê tổng quan */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Tổng doanh thu
              </Typography>
              <Typography variant="h4">
                150.000.000 ₫
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Tổng chi phí
              </Typography>
              <Typography variant="h4">
                80.000.000 ₫
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Lợi nhuận
              </Typography>
              <Typography variant="h4">
                70.000.000 ₫
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bảng thanh toán lương */}
      <Typography variant="h6" sx={{ mb: 2 }}>Thanh toán lương giảng viên</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Giảng viên</TableCell>
              <TableCell>Số lớp</TableCell>
              <TableCell>Số giờ dạy</TableCell>
              <TableCell>Tổng lương</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instructors.map((instructor) => (
              <TableRow key={instructor.id}>
                <TableCell>{instructor.name}</TableCell>
                <TableCell>{instructor.classes.length}</TableCell>
                <TableCell>{instructor.classes.reduce((sum, cls) => sum + cls.hours, 0)}</TableCell>
                <TableCell>{instructor.totalSalary.toLocaleString()} ₫</TableCell>
                <TableCell>Chưa thanh toán</TableCell>
                <TableCell align="right">
                  <Button variant="contained" onClick={() => handleOpenPaymentDialog(instructor)}>
                    Thanh toán
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Bảng chi tiết doanh thu */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Chi tiết doanh thu</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Thời gian</TableCell>
              <TableCell>Tổng thu</TableCell>
              <TableCell>Tổng chi</TableCell>
              <TableCell>Lợi nhuận</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {revenuePeriods.map((period) => (
              <TableRow key={period.period}>
                <TableCell>{period.period}</TableCell>
                <TableCell>{period.totalRevenue.toLocaleString()} ₫</TableCell>
                <TableCell>{period.totalExpense.toLocaleString()} ₫</TableCell>
                <TableCell>{period.profit.toLocaleString()} ₫</TableCell>
                <TableCell align="right">
                  <Button variant="contained" onClick={() => handleOpenRevenueDialog(period)}>
                    Xem chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PaymentDialog
        open={openPaymentDialog}
        onClose={() => setOpenPaymentDialog(false)}
        onSubmit={(paymentData) => console.log('Payment submitted:', paymentData)}
        instructorData={selectedInstructor}
      />

      <RevenueDetailsDialog
        open={openRevenueDialog}
        onClose={() => setOpenRevenueDialog(false)}
        periodData={selectedPeriod}
      />
    </Box>
  );
};

export default FinanceManagement; 