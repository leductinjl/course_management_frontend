import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Breadcrumbs,
  Link,
  Fade,
  Grow,
  Chip,
} from '@mui/material';
import Header from '../../components/student/StudentHeader';
import Footer from '../../components/Footer';
import SearchBar from '../../components/search/SearchBar';
import PlannedCourses from '../../components/search/PlannedCourses';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import UpdateIcon from '@mui/icons-material/Update';

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

  return (
    <Fade in={true} timeout={800}>
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#f5f5f5'
      }}>
        <Header />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
          <Grow in={true} timeout={500}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ 
              mb: 3,
              p: 1.5,
              bgcolor: 'white',
              borderRadius: 1,
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <Link
                underline="hover"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  '&:hover': { color: 'primary.main' }
                }}
                color="inherit"
                href="/dashboard"
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Trang chủ
              </Link>
              <Typography
                sx={{ display: 'flex', alignItems: 'center' }}
                color="text.primary"
              >
                <SearchIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Tra cứu môn học
              </Typography>
            </Breadcrumbs>
          </Grow>

          <Paper 
            elevation={0}
            sx={{ 
              borderRadius: 2,
              overflow: 'hidden',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
              }
            }}
          >
            <Box sx={{ 
              p: 3,
              borderBottom: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'primary.main',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <MenuBookIcon />
                Tra cứu môn học
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Chip
                  icon={<UpdateIcon />}
                  label="Cập nhật: 15/03/2024"
                  color="primary"
                  variant="outlined"
                />
              </Box>
            </Box>

            <Tabs 
              value={tabValue} 
              onChange={(e, newValue) => setTabValue(newValue)}
              sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: '#f8f9fa',
                '& .MuiTab-root': {
                  minHeight: 64,
                  fontSize: '1rem',
                  textTransform: 'none',
                  fontWeight: 500,
                }
              }}
            >
              <Tab 
                label="Tất cả môn học" 
                icon={<MenuBookIcon />}
                iconPosition="start"
              />
              <Tab 
                label="Môn học sắp mở" 
                icon={<UpdateIcon />}
                iconPosition="start"
              />
            </Tabs>

            <Box sx={{ p: 3, bgcolor: 'white' }}>
              <SearchBar
                placeholder="Nhập mã môn học hoặc tên môn học để tìm kiếm..."
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={() => {}}
              />
            </Box>

            <TabPanel value={tabValue} index={0}>
              <PlannedCourses 
                courses={searchQuery
                  ? plannedCourses.filter(course =>
                      course.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                  : plannedCourses
                } 
              />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <PlannedCourses 
                courses={plannedCourses
                  .filter(course => course.status === 'upcoming')
                  .filter(course =>
                    searchQuery
                      ? course.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
                      : true
                  )
                } 
              />
            </TabPanel>
          </Paper>
        </Container>
        <Footer />
      </Box>
    </Fade>
  );
};

export default SearchPage; 