import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';

interface RevenueDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  periodData: any;
}

const RevenueDetailsDialog: React.FC<RevenueDetailsDialogProps> = ({
  open,
  onClose,
  periodData,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Chi tiết doanh thu</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Thời gian: {periodData?.period}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Doanh thu học phí
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Lớp học</TableCell>
                      <TableCell>Số học viên</TableCell>
                      <TableCell align="right">Học phí/học viên</TableCell>
                      <TableCell align="right">Tổng thu</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {periodData?.tuitionDetails?.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.className}</TableCell>
                        <TableCell>{item.studentCount}</TableCell>
                        <TableCell align="right">
                          {item.tuitionPerStudent.toLocaleString()}đ
                        </TableCell>
                        <TableCell align="right">
                          {item.totalTuition.toLocaleString()}đ
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Chi phí phát sinh
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Hạng mục</TableCell>
                      <TableCell>Mô tả</TableCell>
                      <TableCell align="right">Số tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {periodData?.expenses?.map((expense: any) => (
                      <TableRow key={expense.id}>
                        <TableCell>{expense.category}</TableCell>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell align="right">
                          {expense.amount.toLocaleString()}đ
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">
                Tổng kết:
              </Typography>
              <Typography>
                Tổng thu: {periodData?.totalRevenue?.toLocaleString()}đ
              </Typography>
              <Typography>
                Tổng chi: {periodData?.totalExpense?.toLocaleString()}đ
              </Typography>
              <Typography>
                Lợi nhuận: {periodData?.profit?.toLocaleString()}đ
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
        <Button variant="contained" color="primary">
          Xuất báo cáo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RevenueDetailsDialog; 