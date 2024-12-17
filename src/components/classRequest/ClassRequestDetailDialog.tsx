import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Chip,
} from '@mui/material';
import { format } from 'date-fns';
import { ClassRequest } from '../../types/classRequest.types';

interface ClassRequestDetailDialogProps {
  open: boolean;
  onClose: () => void;
  request: ClassRequest;
  onReview: (request: ClassRequest) => void;
  onDelete: (request: ClassRequest) => void;
}

const ClassRequestDetailDialog: React.FC<ClassRequestDetailDialogProps> = ({
  open,
  onClose,
  request,
  onReview,
  onDelete,
}) => {
  const getStatusChip = (status: string) => {
    const statusConfig: Record<string, { label: string; color: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" }> = {
      pending: { label: 'Chờ duyệt', color: 'warning' },
      approved: { label: 'Đã duyệt', color: 'success' },
      rejected: { label: 'Từ chối', color: 'error' },
    };

    const config = statusConfig[status] || { label: status, color: 'default' };
    return <Chip label={config.label} color={config.color} />;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Chi tiết yêu cầu mở lớp</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Trạng thái</Typography>
            {getStatusChip(request.status)}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Môn học</Typography>
            <Typography>
              {request.course.name} ({request.course.code})
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Giảng viên</Typography>
            <Typography>{request.instructor.full_name}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Số lượng học viên dự kiến</Typography>
            <Typography>{request.expected_students}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2">Ngày bắt đầu mong muốn</Typography>
            <Typography>
              {format(new Date(request.desired_start_date), 'dd/MM/yyyy')}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2">Ghi chú lịch học</Typography>
            <Typography>{request.schedule_note}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2">Lý do</Typography>
            <Typography>{request.reason}</Typography>
          </Grid>

          {request.admin_notes && (
            <Grid item xs={12}>
              <Typography variant="subtitle2">Ghi chú của admin</Typography>
              <Typography>{request.admin_notes}</Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
        {request.status === 'pending' && (
          <>
            <Button
              onClick={() => onReview(request)}
              variant="contained"
              color="primary"
            >
              Xem xét
            </Button>
            <Button
              onClick={() => onDelete(request)}
              variant="contained"
              color="error"
            >
              Xóa
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ClassRequestDetailDialog;
