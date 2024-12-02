import React, { useState } from 'react';
import Header from '../components/student/StudentHeader';
import Footer from '../components/Footer';
import StudentSidebar from '../components/student/StudentSidebar';
import PersonalInfo from '../components/student/PersonalInfo';
import RegistrationHistory from '../components/student/RegistrationHistory';
import CourseInfo from '../components/student/CourseInfo';
import ClassSchedule from '../components/student/ClassSchedule';
import ExamSchedule from '../components/student/ExamSchedule';
import Certificates from '../components/student/Certificates';
import Tuition from '../components/student/Tuition';
import { Container, Grid, Paper } from '@mui/material';
import StudyResults from '../components/student/StudyResults';

const StudentInfo: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState('personal');

  const renderContent = () => {
    switch (selectedSection) {
      case 'personal':
        return <PersonalInfo />;
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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <StudentSidebar
              selectedSection={selectedSection}
              onSectionChange={setSelectedSection}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper elevation={3} sx={{ p: 3 }}>
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