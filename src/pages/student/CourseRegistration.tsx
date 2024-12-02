import React from 'react';
import Header from '../../components/student/StudentHeader';
import Footer from '../../components/Footer';
import CourseList from '../../components/course/CourseList';
import { Container, Typography, Box } from '@mui/material';

const CourseRegistration: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Đăng ký môn học
        </Typography>
        <Box sx={{ mt: 3 }}>
          <CourseList />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default CourseRegistration; 