import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import PaymentsIcon from '@mui/icons-material/Payments';
import { authService } from '../../services/auth.service';

const InstructorHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
    handleMenuClose();
  };

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
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
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

          <IconButton
            onClick={handleMenuOpen}
            sx={{ ml: 2 }}
          >
            <Avatar sx={{ bgcolor: '#fff', color: '#1a237e', width: 32, height: 32 }}>
              <PersonIcon />
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
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default InstructorHeader; 