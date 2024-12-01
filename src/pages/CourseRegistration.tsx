import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Typography } from '@mui/material';

const CourseRegistration: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Đăng ký môn học
        </Typography>
        {/* Thêm nội dung trang đăng ký môn học ở đây */}
      </Container>
      <Footer />
    </>
  );
};

export default CourseRegistration; 