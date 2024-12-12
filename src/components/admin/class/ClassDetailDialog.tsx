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
  Divider,
  IconButton,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { 
  Class, 
  CLASS_STATUS_MAP, 
  CLASS_STATUS_OPTIONS,
  ClassStatus 
} from '../../../types/class.types';
import { formatDate } from '../../../utils/dateUtils';

interface ClassDetailDialogProps {
  open: boolean;
  onClose: () => void;
  classData: Class;
  onEdit?: (classData: Class) => void;
  onDelete?: (classData: Class) => void;
}

const ClassDetailDialog: React.FC<ClassDetailDialogProps> = ({
  open,
  onClose,
  classData,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = (status: ClassStatus): "info" | "success" | "secondary" | "error" | "default" => {
    switch (status) {
      case 'upcoming':
        return 'info';
      case 'ongoing':
        return 'success';
      case 'completed':
        return 'secondary';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleStatusChange = (newStatus: ClassStatus) => {
    if (onEdit) {
      onEdit({
        ...classData,
        status: newStatus
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6">
          Chi tiết lớp học: {classData.classCode}
        </Typography>
        <Box>
          {onEdit && (
            <Tooltip title="Chỉnh sửa">
              <IconButton onClick={() => onEdit(classData)} size="small" sx={{ mr: 1 }}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          {onDelete && (
            <Tooltip title="Xóa">
              <IconButton onClick={() => onDelete(classData)} size="small" color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Mã lớp
            </Typography>
            <Typography variant="body1" gutterBottom>
              {classData.classCode}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Môn học
            </Typography>
            <Typography variant="body1" gutterBottom>
              {classData.Course?.name} ({classData.Course?.code})
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Giảng viên
            </Typography>
            <Typography variant="body1" gutterBottom>
              {classData.Instructor?.fullName}
            </Typography>
            {classData.Instructor?.specialization && (
              <Typography variant="caption" color="textSecondary">
                Chuyên môn: {classData.Instructor.specialization}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Trạng thái
            </Typography>
            {onEdit ? (
              <FormControl size="small" fullWidth>
                <Select
                  value={classData.status}
                  onChange={(e) => handleStatusChange(e.target.value as ClassStatus)}
                  size="small"
                >
                  {CLASS_STATUS_OPTIONS.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      <Chip 
                        label={option.label}
                        size="small"
                        color={getStatusColor(option.value)}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Box>
                <Chip 
                  label={CLASS_STATUS_MAP[classData.status]} 
                  color={getStatusColor(classData.status)}
                  size="small"
                />
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Ngày bắt đầu
            </Typography>
            <Typography variant="body1" gutterBottom>
              {formatDate(classData.startDate)}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Ngày kết thúc
            </Typography>
            <Typography variant="body1" gutterBottom>
              {formatDate(classData.endDate)}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Phòng học
            </Typography>
            <Typography variant="body1" gutterBottom>
              {classData.room}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Sĩ số tối đa
            </Typography>
            <Typography variant="body1" gutterBottom>
              {classData.capacity} học viên
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">
              Lịch học
            </Typography>
            <Typography variant="body1" gutterBottom style={{ whiteSpace: 'pre-wrap' }}>
              {classData.schedule}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Người tạo
            </Typography>
            <Typography variant="body1" gutterBottom>
              {classData.creator?.fullName}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {formatDate(classData.created_at)}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Cập nhật lần cuối
            </Typography>
            <Typography variant="body1" gutterBottom>
              {formatDate(classData.updated_at)}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
              Thống kê lớp học
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ 
              p: 2, 
              bgcolor: '#f5f5f5', 
              borderRadius: 1,
              textAlign: 'center'
            }}>
              <PeopleIcon color="primary" />
              <Typography variant="h6">
                {classData.stats?.enrollmentCount || 0}/{classData.capacity}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Học viên đã đăng ký
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ 
              p: 2, 
              bgcolor: '#f5f5f5', 
              borderRadius: 1,
              textAlign: 'center'
            }}>
              <AssignmentIcon color="primary" />
              <Typography variant="h6">
                {classData.stats?.completedLessons || 0}/{classData.stats?.totalLessons || '?'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Buổi học đã hoàn thành
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ 
              p: 2, 
              bgcolor: '#f5f5f5', 
              borderRadius: 1,
              textAlign: 'center'
            }}>
              <EmailIcon color="primary" />
              <Typography variant="h6">
                {classData.stats?.announcementCount || 0}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Thông báo đã gửi
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
              Thông tin khóa học
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Học phí
            </Typography>
            <Typography variant="body1" gutterBottom>
              {classData.Course?.fee ? new Intl.NumberFormat('vi-VN', { 
                style: 'currency', 
                currency: 'VND' 
              }).format(classData.Course.fee) : 'Chưa cập nhật'}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Số tín chỉ
            </Typography>
            <Typography variant="body1" gutterBottom>
              {classData.Course?.credits || 'Chưa cập nhật'}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button 
          variant="outlined" 
          onClick={() => window.open(`/classes/${classData.id}/students`, '_blank')}
        >
          Xem danh sách học viên
        </Button>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassDetailDialog; 