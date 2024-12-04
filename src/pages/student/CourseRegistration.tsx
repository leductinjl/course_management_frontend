import React, { useState } from 'react';
import Header from '../../components/student/StudentHeader';
import Footer from '../../components/Footer';
import CourseList from '../../components/course/CourseList';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Breadcrumbs,
  Link,
  Divider,
  Alert,
  Fade,
  Grow,
  Chip,
  TextField,
  InputAdornment
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventNoteIcon from '@mui/icons-material/EventNote';

const CourseRegistration: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
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
                <SchoolIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Đăng ký môn học
              </Typography>
            </Breadcrumbs>
          </Grow>

          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              mb: 4,
              borderRadius: 2,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
              }
            }}
          >
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3
            }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  color: 'primary.main',
                  fontWeight: 600,
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: 60,
                    height: 4,
                    bgcolor: 'primary.main',
                    borderRadius: 2
                  }
                }}
              >
                Đăng ký môn học
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Chip
                  icon={<AccessTimeIcon />}
                  label="Thời gian còn lại: 5 ngày"
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  icon={<EventNoteIcon />}
                  label="Học kỳ: 2023-2024/II"
                  color="secondary"
                  variant="outlined"
                />
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />
            
            <Alert 
              severity="info" 
              sx={{ 
                mb: 3,
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { opacity: 1 },
                  '50%': { opacity: 0.8 },
                  '100%': { opacity: 1 },
                }
              }}
            >
              Vui lòng kiểm tra kỹ thông tin môn học và điều kiện tiên quyết trước khi đăng ký.
            </Alert>

            <TextField
              fullWidth
              variant="outlined"
              placeholder="Tìm kiếm môn học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ mt: 3 }}>
              <CourseList />
            </Box>
          </Paper>
        </Container>
        <Footer />
      </Box>
    </Fade>
  );
};

export default CourseRegistration; 