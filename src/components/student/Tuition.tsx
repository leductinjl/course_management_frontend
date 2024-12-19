import React, { useEffect, useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
  Alert
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { tuitionService } from '../../services/tuition.service';
import { Tuition as TuitionType } from '../../types/tuition.types';
import VNPayButton from '../payment/VNPayButton';

const statusColors = {
  pending: 'warning',
  paid: 'success',
  processing: 'info',
  overdue: 'error',
} as const;

const statusLabels = {
  pending: 'Chưa thanh toán',
  paid: 'Đã thanh toán',
  processing: 'Đang xử lý',
  overdue: 'Quá hạn',
} as const;

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

const Tuition: React.FC = () => {
  const [tuitions, setTuitions] = useState<TuitionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchTuitions();
  }, []);

  const fetchTuitions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tuitionService.getMyTuitions();
      setTuitions(data);
    } catch (err: any) {
      setError(err.message || 'Không thể tải thông tin học phí');
      enqueueSnackbar('Không thể tải thông tin học phí', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Typography>Đang tải...</Typography>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

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
                <TableCell>{tuition.course.code}</TableCell>
                <TableCell>{tuition.course.name}</TableCell>
                <TableCell align="right">
                  {formatCurrency(tuition.amount)}
                </TableCell>
                <TableCell>{tuition.due_date}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={statusLabels[tuition.status]}
                    color={statusColors[tuition.status]}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  {tuition.status === 'pending' && (
                    <VNPayButton
                      tuitionId={tuition.id}
                      amount={tuition.amount}
                      onSuccess={() => fetchTuitions()}
                    />
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