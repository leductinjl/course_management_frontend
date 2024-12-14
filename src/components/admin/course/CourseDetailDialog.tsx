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
  Box,
} from '@mui/material';
import { Course, COURSE_STATUS_MAP } from '../../../types/course.types';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface CourseDetailDialogProps {
  open: boolean;
  onClose: () => void;
  course: Course;
}

const CourseDetailDialog: React.FC<CourseDetailDialogProps> = ({
  open,
  onClose,
  course,
}) => {
  const formatDate = (date: string) => {
    return format(new Date(date), 'HH:mm:ss dd/MM/yyyy', { locale: vi });
  };

  const courseTypes = {
    basic: 'Cơ bản',
    advanced: 'Nâng cao',
    specialized: 'Chuyên ngành'
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Chi tiết môn học: {course.name}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Mã môn học
            </Typography>
            <Typography variant="body1" gutterBottom>
              {course.code}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Số tín chỉ
            </Typography>
            <Typography variant="body1" gutterBottom>
              {course.credits}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Loại môn học
            </Typography>
            <Typography variant="body1" gutterBottom>
              {courseTypes[course.type]}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Trạng thái
            </Typography>
            <Box>
              <Chip 
                label={COURSE_STATUS_MAP[course.status]} 
                color={
                  course.status === 'active' ? 'success' :
                  course.status === 'draft' ? 'default' :
                  course.status === 'suspended' ? 'warning' : 'error'
                }
                size="small"
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Học phí
            </Typography>
            <Typography variant="body1" gutterBottom>
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.fee)}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">
              Mô tả
            </Typography>
            <Typography variant="body1" gutterBottom style={{ whiteSpace: 'pre-wrap' }}>
              {course.description || 'Chưa có mô tả'}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Người tạo
            </Typography>
            <Typography variant="body1" gutterBottom>
              {course.creator?.full_name || 'N/A'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {course.created_at ? formatDate(course.created_at) : 'N/A'}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Cập nhật lần cuối
            </Typography>
            <Typography variant="body1" gutterBottom>
              {course.creator?.full_name || 'N/A'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {course.updated_at ? formatDate(course.updated_at) : 'N/A'}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseDetailDialog; 