import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import PaymentsIcon from '@mui/icons-material/Payments';

const InstructorHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static" sx={{ bgcolor: '#1a237e' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/instructor-home')}
        >
          TTTH ĐHSP TPHCM
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            startIcon={<PersonIcon />}
            onClick={() => navigate('/instructor-info')}
            sx={{ 
              backgroundColor: location.pathname === '/instructor-info' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'transparent' 
            }}
          >
            Thông tin cá nhân
          </Button>
          
          <Button 
            color="inherit" 
            startIcon={<SchoolIcon />}
            onClick={() => navigate('/instructor-teaching')}
            sx={{ 
              backgroundColor: location.pathname === '/instructor-teaching' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'transparent' 
            }}
          >
            Thông tin giảng dạy
          </Button>

          <Button 
            color="inherit" 
            startIcon={<PaymentsIcon />}
            onClick={() => navigate('/instructor-salary')}
            sx={{ 
              backgroundColor: location.pathname === '/instructor-salary' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'transparent' 
            }}
          >
            Quản lý lương
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default InstructorHeader; 