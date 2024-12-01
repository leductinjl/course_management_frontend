import React from 'react';
import {
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Avatar,
} from '@mui/material';

const PersonalInfo: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Thông tin cá nhân
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
          <Avatar
            sx={{ width: 120, height: 120, margin: '0 auto 16px' }}
            alt="Student avatar"
            src="/path-to-avatar.jpg"
          />
          <Button variant="contained" size="small">
            Cập nhật ảnh
          </Button>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Họ và tên"
                defaultValue="Nguyễn Văn A"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mã số học viên"
                defaultValue="HV001"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                defaultValue="example@email.com"
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
                defaultValue="123 Đường ABC, Quận XYZ, TP.HCM"
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