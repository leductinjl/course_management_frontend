import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { User, UpdateUserRequest } from '../../../types/user.types';

interface EditUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateUserRequest) => void;
  userData: User;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  open,
  onClose,
  onSubmit,
  userData
}) => {
  const [formData, setFormData] = useState<UpdateUserRequest>({
    email: userData.email,
    fullName: userData.role === 'student' 
      ? userData.studentProfile?.fullName || ''
      : userData.instructorProfile?.fullName || '',
    status: userData.status,
    phone: userData.role === 'student'
      ? userData.studentProfile?.phone || ''
      : userData.instructorProfile?.phone || '',
    address: userData.role === 'student'
      ? userData.studentProfile?.address || ''
      : userData.instructorProfile?.address || '',
    ...(userData.role === 'student'
      ? { dateOfBirth: userData.studentProfile?.dateOfBirth || '' }
      : {
          specialization: userData.instructorProfile?.specialization || '',
          bio: userData.instructorProfile?.bio || ''
        }
    )
  });

  // Cập nhật formData khi userData thay đổi
  useEffect(() => {
    setFormData({
      email: userData.email,
      fullName: userData.role === 'student' 
        ? userData.studentProfile?.fullName || ''
        : userData.instructorProfile?.fullName || '',
      status: userData.status,
      phone: userData.role === 'student'
        ? userData.studentProfile?.phone || ''
        : userData.instructorProfile?.phone || '',
      address: userData.role === 'student'
        ? userData.studentProfile?.address || ''
        : userData.instructorProfile?.address || '',
      ...(userData.role === 'student'
        ? { dateOfBirth: userData.studentProfile?.dateOfBirth || '' }
        : {
            specialization: userData.instructorProfile?.specialization || '',
            bio: userData.instructorProfile?.bio || ''
          }
      )
    });
  }, [userData]);

  // Tách riêng handler cho Select
  const handleStatusChange = (event: SelectChangeEvent) => {
    const newStatus = event.target.value as 'active' | 'inactive';
    setFormData(prev => ({
      ...prev,
      status: newStatus
    }));
  };

  // Handler cho các TextField
  const handleChange = (field: keyof UpdateUserRequest) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Đảm bảo gửi đầy đủ dữ liệu và status đúng định dạng
    const updatedData: UpdateUserRequest = {
      ...formData,
      status: formData.status as 'active' | 'inactive'
    };

    onSubmit(updatedData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          Chỉnh sửa thông tin {userData.role === 'student' ? 'học viên' : 'giảng viên'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                value={formData.email || ''}
                onChange={handleChange('email')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Họ tên"
                value={formData.fullName || ''}
                onChange={handleChange('fullName')}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  value={formData.status || 'active'}
                  label="Trạng thái"
                  onChange={handleStatusChange}
                >
                  <MenuItem value="active">Hoạt động</MenuItem>
                  <MenuItem value="inactive">Không hoạt động</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Số điện thoại"
                value={formData.phone || ''}
                onChange={handleChange('phone')}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ"
                multiline
                rows={2}
                value={formData.address || ''}
                onChange={handleChange('address')}
              />
            </Grid>

            {userData.role === 'student' && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Ngày sinh"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formData.dateOfBirth || ''}
                  onChange={handleChange('dateOfBirth')}
                />
              </Grid>
            )}

            {userData.role === 'instructor' && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Chuyên môn"
                    multiline
                    rows={2}
                    value={formData.specialization || ''}
                    onChange={handleChange('specialization')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tiểu sử"
                    multiline
                    rows={3}
                    value={formData.bio || ''}
                    onChange={handleChange('bio')}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="submit" variant="contained">Lưu thay đổi</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditUserDialog; 