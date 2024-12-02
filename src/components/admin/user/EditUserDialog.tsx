import React, { useEffect } from 'react';
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
} from '@mui/material';

interface EditUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (userData: any) => void;
  userData: any;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  open,
  onClose,
  onSubmit,
  userData: initialUserData,
}) => {
  const [userData, setUserData] = React.useState(initialUserData);

  useEffect(() => {
    setUserData(initialUserData);
  }, [initialUserData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(userData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tên đăng nhập"
                required
                value={userData.username}
                onChange={(e) => setUserData({...userData, username: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Họ và tên"
                required
                value={userData.fullName}
                onChange={(e) => setUserData({...userData, fullName: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                required
                value={userData.email}
                onChange={(e) => setUserData({...userData, email: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                value={userData.phone}
                onChange={(e) => setUserData({...userData, phone: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Vai trò</InputLabel>
                <Select
                  value={userData.role}
                  label="Vai trò"
                  onChange={(e) => setUserData({...userData, role: e.target.value})}
                >
                  <MenuItem value="student">Học viên</MenuItem>
                  <MenuItem value="instructor">Giảng viên</MenuItem>
                  <MenuItem value="admin">Quản trị viên</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  value={userData.status}
                  label="Trạng thái"
                  onChange={(e) => setUserData({...userData, status: e.target.value})}
                >
                  <MenuItem value="active">Hoạt động</MenuItem>
                  <MenuItem value="inactive">Không hoạt động</MenuItem>
                </Select>
              </FormControl>
            </Grid>
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