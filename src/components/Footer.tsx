import React from 'react';
import { Container, Grid, Typography, Link, Box } from '@mui/material';
import '../styles/components/footer.css';

const Footer: React.FC = () => {
  return (
    <Box component="footer" className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Về chúng tôi
            </Typography>
            <Typography variant="body2">
              Trung tâm Tin học Ngoại ngữ ĐHSP TPHCM là đơn vị đào tạo uy tín về công nghệ thông tin và ngoại ngữ.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Liên hệ
            </Typography>
            <Typography variant="body2">
              Địa chỉ: 280 An Dương Vương, Phường 4, Quận 5, TPHCM
            </Typography>
            <Typography variant="body2">
              Email: ttth@hcmue.edu.vn
            </Typography>
            <Typography variant="body2">
              Điện thoại: (028) 38.350.941
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Liên kết nhanh
            </Typography>
            <Link href="/about" color="inherit">Giới thiệu</Link><br />
            <Link href="/course-registration" color="inherit">Đăng ký khóa học</Link><br />
            <Link href="/contact" color="inherit">Liên hệ</Link>
          </Grid>
        </Grid>

        <Box mt={3} pb={2}>
          <Typography variant="body2" align="center" color="textSecondary">
            © {new Date().getFullYear()} Tr
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 