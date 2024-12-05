import React from 'react';
import InstructorHeader from '../../components/instructor/InstructorHeader';
import SalaryManagement from '../../components/instructor/SalaryManagement';
import Footer from '../../components/Footer';
import { Container, Paper } from '@mui/material';

const InstructorSalary: React.FC = () => {
  return (
    <>
      <InstructorHeader />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <SalaryManagement />
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default InstructorSalary; 