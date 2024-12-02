import React from 'react';
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

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (userData: any) => void;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [userData, setUserData] = React.useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phone: '',
    role: '',
    status: 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(userData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Thêm người dùng mới</DialogTitle>
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
                label="Mật khẩu"
                type="password"
                required
                value={userData.password}
                onChange={(e) => setUserData({...userData, password: e.target.value})}
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="submit" variant="contained">Thêm người dùng</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddUserDialog; 