import React, { useState } from 'react';
import Header from '../../components/student/StudentHeader';
import Footer from '../../components/Footer';
import StudentSidebar from '../../components/student/StudentSidebar';
import PersonalInfo from '../../components/student/PersonalInfo';
import RegistrationHistory from '../../components/student/RegistrationHistory';
import CourseInfo from '../../components/student/CourseInfo';
import ClassSchedule from '../../components/student/ClassSchedule';
import ExamSchedule from '../../components/student/ExamSchedule';
import Certificates from '../../components/student/Certificates';
import Tuition from '../../components/student/Tuition';
import { Container, Grid, Paper, Typography, TextField, Button } from '@mui/material';
import StudyResults from '../../components/student/StudyResults';

const StudentInfo: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState('personal');

  const renderPersonalInfoContent = () => {
    return (
      <Grid container spacing={3}>
        {/* Avatar section */}
        <Grid item xs={12} display="flex" alignItems="center" gap={2}>
          <div style={{ 
            width: 120, 
            height: 120, 
            borderRadius: '50%', 
            backgroundColor: '#faf5ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            color: '#a855f7'
          }}>
            S
          </div>
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: '#1a1a1a',
              '&:hover': { backgroundColor: '#333' },
              textTransform: 'none',
              px: 3
            }}
          >
            Cập Nhật Ảnh
          </Button>
        </Grid>

        {/* Form fields */}
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" mb={1} fontWeight={500}>Họ và tên</Typography>
            <TextField
              fullWidth
              value="Nguyễn Văn A"
              variant="outlined"
              InputProps={{
                sx: { backgroundColor: 'white' }
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" mb={1} fontWeight={500}>Mã số học viên</Typography>
            <TextField
              fullWidth
              value="HV001"
              variant="outlined"
              InputProps={{
                sx: { backgroundColor: 'white' }
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" mb={1} fontWeight={500}>Email</Typography>
            <TextField
              fullWidth
              value="example@email.com"
              variant="outlined"
              InputProps={{
                sx: { backgroundColor: 'white' }
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" mb={1} fontWeight={500}>Số điện thoại</Typography>
            <TextField
              fullWidth
              value="0123456789"
              variant="outlined"
              InputProps={{
                sx: { backgroundColor: 'white' }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" mb={1} fontWeight={500}>Địa chỉ</Typography>
            <TextField
              fullWidth
              value="123 Đường ABC, Quận XYZ, TP.HCM"
              variant="outlined"
              InputProps={{
                sx: { backgroundColor: 'white' }
              }}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button 
            variant="contained"
            sx={{ 
              backgroundColor: '#1a1a1a',
              '&:hover': { backgroundColor: '#333' },
              textTransform: 'none',
              px: 3
            }}
          >
            Lưu Thay Đổi
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'personal':
        return renderPersonalInfoContent();
      case 'history':
        return <RegistrationHistory />;
      case 'courses':
        return <CourseInfo />;
      case 'schedule':
        return <ClassSchedule />;
      case 'exams':
        return <ExamSchedule />;
      case 'certificates':
        return <Certificates />;
      case 'tuition':
        return <Tuition />;
      case 'results':
        return <StudyResults />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <>
      <Header />
      <Container 
        maxWidth={false} 
        sx={{ 
          mt: 4, 
          mb: 4,
          px: 4,
          backgroundColor: '#faf5ff',
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 2,
                borderRadius: 2,
                backgroundColor: 'transparent'
              }}
            >
              <StudentSidebar
                selectedSection={selectedSection}
                onSectionChange={setSelectedSection}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4,
                borderRadius: 2,
                backgroundColor: 'white'
              }}
            >
              {renderContent()}
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default StudentInfo; 