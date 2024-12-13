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
import { User } from '../../../types/user.types';
import { formatDateTime } from '../../../utils/dateUtils';

interface UserDetailDialogProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

const UserDetailDialog: React.FC<UserDetailDialogProps> = ({
  open,
  onClose,
  user,
}) => {
  const profile = user.role === 'student' ? user.studentProfile : user.instructorProfile;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Chi tiết {user.role === 'student' ? 'học viên' : 'giảng viên'}: {profile?.full_name}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Email
            </Typography>
            <Typography variant="body1" gutterBottom>
              {user.email}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Trạng thái
            </Typography>
            <Box>
              <Chip 
                label={user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'} 
                color={user.status === 'active' ? 'success' : 'error'}
                size="small"
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Số điện thoại
            </Typography>
            <Typography variant="body1" gutterBottom>
              {profile?.phone || 'Chưa cập nhật'}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Địa chỉ
            </Typography>
            <Typography variant="body1" gutterBottom>
              {profile?.address || 'Chưa cập nhật'}
            </Typography>
          </Grid>

          {user.role === 'student' && (
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Ngày sinh
              </Typography>
              <Typography variant="body1" gutterBottom>
                {user.studentProfile?.date_of_birth || 'Chưa cập nhật'}
              </Typography>
            </Grid>
          )}

          {user.role === 'instructor' && (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">
                  Chuyên môn
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {user.instructorProfile?.specialization || 'Chưa cập nhật'}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="textSecondary">
                  Tiểu sử
                </Typography>
                <Typography variant="body1" gutterBottom style={{ whiteSpace: 'pre-wrap' }}>
                  {user.instructorProfile?.bio || 'Chưa cập nhật'}
                </Typography>
              </Grid>
            </>
          )}

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Ngày tạo
            </Typography>
            <Typography variant="body1" gutterBottom>
              {formatDateTime(user.created_at)}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="textSecondary">
              Cập nhật lần cuối
            </Typography>
            <Typography variant="body1" gutterBottom>
              {formatDateTime(user.updated_at)}
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

export default UserDetailDialog; 