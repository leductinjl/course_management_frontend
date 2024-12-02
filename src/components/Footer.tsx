import React from 'react';
import { Container, Grid, Typography, Link, Box } from '@mui/material';
import '../styles/components/footer.css';

// ... existing imports ...
import { Facebook, Phone, Fax, Email, Home } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      className="footer"
      sx={{ 
        bgcolor: '#1a237e',
        color: 'white',
        '& .MuiTypography-root': { color: 'white' },
        '& .MuiLink-root': { color: 'white' },
        '& .contact-item': { color: 'white' },
        '& .MuiSvgIcon-root': { color: 'white' }
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              ĐỊA CHỈ
            </Typography>
            <Box className="contact-item">
              <Home /> 
              <Typography variant="body2">
                Trụ sở chính: 280 An Dương Vương, Phường 4, Quận 5, Thành Phố Hồ Chí Minh
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ ml: 4 }}>
              Các cơ sở đào tạo khác:
            </Typography>
            <Typography variant="body2" sx={{ ml: 4 }}>
              • Cơ sở 2: 222 Lê Văn Sỹ, Phường 14, Quận 3, Thành phố Hồ Chí Minh
            </Typography>
            <Typography variant="body2" sx={{ ml: 4 }}>
              • Phân hiệu Long An: Số 934 Quốc lộ 1 phường Khánh Hậu, Tp. Tân An, tỉnh Long An
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              LIÊN HỆ
            </Typography>
            <Box className="contact-item">
              <Email />
              <Typography variant="body2">
                Email: phongctct@hcmue.edu.vn
              </Typography>
            </Box>
            <Box className="contact-item">
              <Phone />
              <Typography variant="body2">
                Hotline: 028 - 38352020
              </Typography>
            </Box>
            <Box className="contact-item">
              <Fax />
              <Typography variant="body2">
                Fax: 028 - 38398946
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box className="social-links">
              <Typography variant="h6" gutterBottom>
                FANPAGE FB
              </Typography>
              <Link href="https://facebook.com" className="facebook-link">
                <Facebook /> Fanpage Facebook
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Box mt={3} pb={2} className="copyright">
          <Typography variant="body2" align="center">
            Copyright © 2024 Ho Chi Minh City University of Education
          </Typography>
          <Typography variant="body2" align="center">
            All Rights Reserved Developed by PSC
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 