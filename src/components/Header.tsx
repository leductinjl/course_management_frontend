import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/student-home')}
        >
          TTTH ĐHSP TPHCM
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 