import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import { studentService } from '../../services/student.service';
import { Student } from '../../types/student.types';

const StudentHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [student, setStudent] = useState<Student | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    try {
      const data = await studentService.getCurrentStudent();
      setStudent(data);
    } catch (error) {
      console.error('Error loading student data:', error);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#1a237e' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/student-home')}
        >
          TTTH ĐHSP TPHCM
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button 
            color="inherit" 
            startIcon={<SearchIcon />}
            onClick={() => navigate('/search')}
            sx={{ 
              backgroundColor: location.pathname === '/search' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'transparent' 
            }}
          >
            Tra cứu
          </Button>
          
          <Button 
            color="inherit" 
            startIcon={<SchoolIcon />}
            onClick={() => navigate('/course-registration')}
            sx={{ 
              backgroundColor: location.pathname === '/course-registration' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'transparent' 
            }}
          >
            Đăng ký môn học
          </Button>
          
          <Button 
            color="inherit" 
            startIcon={<PersonIcon />}
            onClick={() => navigate('/student-info')}
            sx={{ 
              backgroundColor: location.pathname === '/student-info' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'transparent' 
            }}
          >
            Thông tin học viên
          </Button>

          <IconButton
            onClick={handleMenuOpen}
            sx={{ ml: 2 }}
          >
            <Avatar 
              sx={{ 
                width: 35, 
                height: 35, 
                bgcolor: 'primary.light',
                border: '2px solid white'
              }}
            >
              {student?.full_name?.charAt(0) || 'S'}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => {
              handleMenuClose();
              navigate('/student-info');
            }}>
              <PersonIcon sx={{ mr: 1, fontSize: 20 }} />
              Thông tin cá nhân
            </MenuItem>
            <Divider />
            <MenuItem 
              onClick={handleLogout}
              sx={{ color: 'error.main' }}
            >
              Đăng xuất
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default StudentHeader; 