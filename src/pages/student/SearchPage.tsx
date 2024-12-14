import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Alert,
} from '@mui/material';
import Header from '../../components/student/StudentHeader';
import Footer from '../../components/Footer';
import SearchBar from '../../components/search/SearchBar';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import UpdateIcon from '@mui/icons-material/Update';
import { courseService } from '../../services/course.service';
import { 
  Course, 
  CourseType, 
  CourseStatus, 
  COURSE_TYPE_MAP, 
  COURSE_STATUS_MAP 
} from '../../types/course.types';

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
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await courseService.getAvailableCoursesForStudent();
        setCourses(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = searchQuery.toLowerCase().trim() === '' ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = tabValue === 0 || 
      (tabValue === 1 && course.status === 'draft');

    return matchesSearch && matchesTab;
  });

  const renderCourseList = (courses: Course[]) => (
    <Box>
      {courses.map((course) => (
        <Paper
          key={course.id}
          sx={{
            p: 2,
            mb: 2,
            borderRadius: 2,
            '&:hover': { boxShadow: 3 }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6">
                {course.name} ({course.code})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Số tín chỉ: {course.credits} | Loại: {COURSE_TYPE_MAP[course.type as CourseType]}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {course.description}
              </Typography>
            </Box>
            <Box>
              <Chip
                label={COURSE_STATUS_MAP[course.status as CourseStatus]}
                color={course.status === 'active' ? 'success' : 'warning'}
                sx={{ mr: 1 }}
              />
              <Chip
                label={`${course.fee.toLocaleString()} VNĐ`}
                variant="outlined"
              />
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );

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
              onChange={(_, newValue) => setTabValue(newValue)}
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
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                renderCourseList(filteredCourses)
              )}
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                renderCourseList(filteredCourses.filter(course => course.status === 'draft'))
              )}
            </TabPanel>
          </Paper>
        </Container>
        <Footer />
      </Box>
    </Fade>
  );
};

export default SearchPage; 