import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (paymentData: any) => void;
  instructorData: any;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({
  open,
  onClose,
  onSubmit,
  instructorData,
}) => {
  const [paymentData, setPaymentData] = React.useState({
    amount: instructorData?.totalSalary || 0,
    note: '',
    paymentMethod: 'bank',
    bankAccount: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(paymentData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Thanh toán lương giảng viên</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Thông tin giảng viên: {instructorData?.name}
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Lớp học</TableCell>
                      <TableCell>Số giờ dạy</TableCell>
                      <TableCell align="right">Thành tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {instructorData?.classes?.map((cls: any) => (
                      <TableRow key={cls.id}>
                        <TableCell>{cls.name}</TableCell>
                        <TableCell>{cls.hours}</TableCell>
                        <TableCell align="right">{cls.amount.toLocaleString()}đ</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={2}><strong>Tổng cộng</strong></TableCell>
                      <TableCell align="right">
                        <strong>{instructorData?.totalSalary?.toLocaleString()}đ</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Số tài khoản"
                required
                value={paymentData.bankAccount}
                onChange={(e) => setPaymentData({...paymentData, bankAccount: e.target.value})}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ghi chú"
                multiline
                rows={2}
                value={paymentData.note}
                onChange={(e) => setPaymentData({...paymentData, note: e.target.value})}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="submit" variant="contained" color="primary">
            Xác nhận thanh toán
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PaymentDialog; 