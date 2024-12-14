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
  Chip,
  CircularProgress,
  Box
} from '@mui/material';
import { format } from 'date-fns';
import { enrollmentService } from '../../services/enrollment.service';
import { EnrollmentHistory } from '../../types/enrollment.types';


const RegistrationHistory: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<EnrollmentHistory[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrollmentHistory = async () => {
      try {
        const response = await enrollmentService.getEnrollmentHistory();
        setHistory(response);
      } catch (err: any) {
        setError(err.message || 'Không thể tải lịch sử đăng ký');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollmentHistory();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  if (!history || history.length === 0) {
    return (
      <Typography align="center" sx={{ my: 3 }}>
        Chưa có lịch sử đăng ký nào
      </Typography>
    );
  }

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
              <TableCell>Mã lớp</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Hành động</TableCell>
              <TableCell>Ghi chú</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.Class?.Course?.code || '-'}</TableCell>
                <TableCell>{row.Class?.Course?.name || '-'}</TableCell>
                <TableCell>{row.Class?.class_code || '-'}</TableCell>
                <TableCell>
                  {format(new Date(row.action_date), 'dd/MM/yyyy HH:mm')}
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.action === 'enrolled' ? 'Đăng ký' : 'Hủy đăng ký'}
                    color={row.action === 'enrolled' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{row.note || row.reason || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RegistrationHistory;