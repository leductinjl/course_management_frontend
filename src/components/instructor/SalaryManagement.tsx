import React, { useState } from 'react';
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Chip,
  TextField,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

interface TeachingHours {
  classId: string;
  className: string;
  totalHours: number;
  confirmedHours: number;
  status: 'pending' | 'confirmed';
  period: string;
}

interface SalaryDetail {
  period: string;
  basicSalary: number;
  bonuses: number;
  deductions: number;
  totalSalary: number;
  status: 'pending' | 'confirmed' | 'paid';
  paymentDate?: string;
}

const SalaryManagement: React.FC = () => {
  const [teachingHours, setTeachingHours] = useState<TeachingHours[]>([
    {
      classId: 'CS101',
      className: 'Lập trình cơ bản A1',
      totalHours: 45,
      confirmedHours: 45,
      status: 'confirmed',
      period: '03/2024'
    },
    {
      classId: 'CS102',
      className: 'Lập trình nâng cao B2',
      totalHours: 30,
      confirmedHours: 0,
      status: 'pending',
      period: '03/2024'
    },
  ]);

  const [salaryDetails, setSalaryDetails] = useState<SalaryDetail[]>([
    {
      period: '03/2024',
      basicSalary: 15000000,
      bonuses: 1000000,
      deductions: 500000,
      totalSalary: 15500000,
      status: 'pending'
    },
    {
      period: '02/2024',
      basicSalary: 14000000,
      bonuses: 1000000,
      deductions: 500000,
      totalSalary: 14500000,
      status: 'paid',
      paymentDate: '05/03/2024'
    },
  ]);

  const [openConfirmHoursDialog, setOpenConfirmHoursDialog] = useState(false);
  const [openConfirmSalaryDialog, setOpenConfirmSalaryDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [adjustedHours, setAdjustedHours] = useState<number | null>(null);

  const handleConfirmHours = (hours: TeachingHours) => {
    setSelectedItem(hours);
    setAdjustedHours(hours.confirmedHours);
    setOpenConfirmHoursDialog(true);
  };

  const handleConfirmSalary = (salary: SalaryDetail) => {
    setSelectedItem(salary);
    setOpenConfirmSalaryDialog(true);
  };

  const submitHoursConfirmation = () => {
    if (adjustedHours !== null) {
      setTeachingHours(hours =>
        hours.map(h =>
          h.classId === selectedItem.classId
            ? { ...h, status: 'confirmed', confirmedHours: adjustedHours }
            : h
        )
      );
      setOpenConfirmHoursDialog(false);
      setSnackbarMessage('Đã xác nhận số tiết giảng dạy thành công');
      setOpenSnackbar(true);
    }
  };

  const submitSalaryConfirmation = () => {
    setSalaryDetails(details =>
      details.map(d =>
        d.period === selectedItem.period
          ? { ...d, status: 'confirmed' }
          : d
      )
    );
    setOpenConfirmSalaryDialog(false);
    setSnackbarMessage('Đã xác nhận thông tin lương thành công');
    setOpenSnackbar(true);
  };

  return (
    <Box>
      {/* Xác nhận số tiết giảng dạy */}
      <Typography variant="h6" gutterBottom>
        Xác nhận số tiết giảng dạy
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã lớp</TableCell>
              <TableCell>Tên lớp</TableCell>
              <TableCell align="center">Kỳ</TableCell>
              <TableCell align="center">Số tiết</TableCell>
              <TableCell align="center">Đã xác nhận</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachingHours.map((hour) => (
              <TableRow key={hour.classId}>
                <TableCell>{hour.classId}</TableCell>
                <TableCell>{hour.className}</TableCell>
                <TableCell align="center">{hour.period}</TableCell>
                <TableCell align="center">{hour.totalHours}</TableCell>
                <TableCell align="center">{hour.confirmedHours}</TableCell>
                <TableCell align="center">
                  <Chip
                    icon={hour.status === 'confirmed' ? <CheckCircleIcon /> : <PendingIcon />}
                    label={hour.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                    color={hour.status === 'confirmed' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    disabled={hour.status === 'confirmed'}
                    onClick={() => handleConfirmHours(hour)}
                  >
                    Xác nhận
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Thông tin lương */}
      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Thông tin lương
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Kỳ</TableCell>
              <TableCell align="right">Lương cơ bản</TableCell>
              <TableCell align="right">Phụ cấp</TableCell>
              <TableCell align="right">Khấu trừ</TableCell>
              <TableCell align="right">Tổng lương</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Ngày thanh toán</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salaryDetails.map((detail) => (
              <TableRow key={detail.period}>
                <TableCell>{detail.period}</TableCell>
                <TableCell align="right">
                  {detail.basicSalary.toLocaleString('vi-VN')} đ
                </TableCell>
                <TableCell align="right">
                  {detail.bonuses.toLocaleString('vi-VN')} đ
                </TableCell>
                <TableCell align="right">
                  {detail.deductions.toLocaleString('vi-VN')} đ
                </TableCell>
                <TableCell align="right">
                  {detail.totalSalary.toLocaleString('vi-VN')} đ
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={
                      detail.status === 'paid' 
                        ? 'Đã thanh toán' 
                        : detail.status === 'confirmed'
                          ? 'Đã xác nhận'
                          : 'Chờ xác nhận'
                    }
                    color={
                      detail.status === 'paid' 
                        ? 'success' 
                        : detail.status === 'confirmed'
                          ? 'info'
                          : 'warning'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">{detail.paymentDate || '-'}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    disabled={detail.status !== 'pending'}
                    onClick={() => handleConfirmSalary(detail)}
                  >
                    Xác nhận
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog xác nhận số tiết */}
      <Dialog open={openConfirmHoursDialog} onClose={() => setOpenConfirmHoursDialog(false)}>
        <DialogTitle>Xác nhận số tiết giảng dạy</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn xác nhận đã hoàn thành số tiết giảng dạy cho lớp {selectedItem?.className}?
          </Typography>
          <TextField
            label="Số tiết đã dạy"
            type="number"
            fullWidth
            value={adjustedHours}
            onChange={(e) => setAdjustedHours(Number(e.target.value))}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmHoursDialog(false)}>Hủy</Button>
          <Button onClick={submitHoursConfirmation} variant="contained">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog xác nhận lương */}
      <Dialog open={openConfirmSalaryDialog} onClose={() => setOpenConfirmSalaryDialog(false)}>
        <DialogTitle>Xác nhận thông tin lương</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn xác nhận thông tin lương kỳ {selectedItem?.period} với tổng lương 
            là {selectedItem?.totalSalary?.toLocaleString('vi-VN')} đ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmSalaryDialog(false)}>Hủy</Button>
          <Button onClick={submitSalaryConfirmation} variant="contained">
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar thông báo */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SalaryManagement; 