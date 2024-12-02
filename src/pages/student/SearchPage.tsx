import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import Header from '../../components/student/StudentHeader';
import Footer from '../../components/Footer';
import SearchBar from '../../components/search/SearchBar';
import PlannedCourses from '../../components/search/PlannedCourses';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const SearchPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Dữ liệu mẫu
  const plannedCourses = [
    {
      courseCode: 'CS201',
      courseName: 'Lập trình hướng đối tượng',
      credits: 4,
      expectedDate: 'HK2 2023-2024',
      prerequisites: ['CS101'],
      status: 'planned' as const,
    },
    {
      courseCode: 'ENG301',
      courseName: 'Tiếng Anh B2',
      credits: 4,
      expectedDate: 'HK2 2023-2024',
      prerequisites: ['ENG201'],
      status: 'upcoming' as const,
    },
    {
      courseCode: 'CS302',
      courseName: 'Cơ sở dữ liệu',
      credits: 3,
      expectedDate: 'HK2 2023-2024',
      prerequisites: [],
      status: 'upcoming' as const,
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setSearchQuery('');
  };

  const filteredCourses = searchQuery
    ? plannedCourses.filter(course =>
        course.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : plannedCourses;

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tra cứu môn học
        </Typography>

        <Paper sx={{ mt: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Tất cả môn học" />
            <Tab label="Môn học sắp mở" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            <SearchBar
              placeholder="Nhập mã môn học hoặc tên môn học..."
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={() => {}}
            />
          </Box>

          <TabPanel value={tabValue} index={0}>
            <PlannedCourses 
              courses={filteredCourses} 
            />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <PlannedCourses 
              courses={filteredCourses.filter(course => course.status === 'upcoming')} 
            />
          </TabPanel>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default SearchPage; 