import React, { useState } from 'react';
import InstructorHeader from '../../components/instructor/InstructorHeader';
import Footer from '../../components/Footer';
import {
  Container,
  Grid,
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
} from '@mui/material';
import TeachingSchedule from '../../components/instructor/TeachingSchedule';
import CourseManagement from '../../components/instructor/CourseManagement';
import GradeManagement from '../../components/instructor/GradeManagement';
import ClassRequest from '../../components/instructor/ClassRequest';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`teaching-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const InstructorTeaching: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <InstructorHeader />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={selectedTab} 
              onChange={handleTabChange}
              variant="fullWidth"
            >
              <Tab label="Lịch giảng dạy" />
              <Tab label="Quản lý môn học" />
              <Tab label="Quản lý điểm" />
              <Tab label="Yêu cầu mở lớp" />
            </Tabs>
          </Box>

          <TabPanel value={selectedTab} index={0}>
            <TeachingSchedule />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <CourseManagement />
          </TabPanel>
          <TabPanel value={selectedTab} index={2}>
            <GradeManagement />
          </TabPanel>
          <TabPanel value={selectedTab} index={3}>
            <ClassRequest />
          </TabPanel>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default InstructorTeaching; 