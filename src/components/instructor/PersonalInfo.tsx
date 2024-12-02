import React from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Avatar,
  Chip,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const PersonalInfo: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Thông tin giảng viên
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
          <Avatar
            sx={{ width: 120, height: 120, margin: '0 auto 16px' }}
            alt="Instructor avatar"
            src="/path-to-avatar.jpg"
          />
          <Button variant="contained" size="small">
            Cập nhật ảnh
          </Button>
          <Box sx={{ mt: 2 }}>
            <Chip
              icon={<SchoolIcon />}
              label="Giảng viên chính"
              color="primary"
              sx={{ mt: 1 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Họ và tên"
                defaultValue="TS. Nguyễn Văn A"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mã giảng viên"
                defaultValue="GV001"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Học hàm/Học vị"
                defaultValue="Tiến sĩ"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Chuyên ngành"
                defaultValue="Công nghệ thông tin"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                defaultValue="gv001@hcmue.edu.vn"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                defaultValue="0123456789"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ"
                defaultValue="280 An Dương Vương, Phường 4, Quận 5, TP.HCM"
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Button variant="contained" color="primary">
              Lưu thay đổi
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfo; 