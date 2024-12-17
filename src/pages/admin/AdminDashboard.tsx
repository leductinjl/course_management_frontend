import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminRoutes from '../../routes/AdminRoutes';
import { useLocation } from 'react-router-dom';

const drawerWidth = 280;

const AdminDashboard: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes('/courses')) return 'Quản lý môn học';
    if (path.includes('/users')) return 'Quản lý tài khoản';
    if (path.includes('/certificates')) return 'Quản lý chứng chỉ';
    if (path.includes('/exams')) return 'Quản lý kỳ thi';
    if (path.includes('/class-requests')) return 'Quản lý yêu cầu mở lớp';
    return 'Admin Dashboard';
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {getTitle()}
          </Typography>
        </Toolbar>
      </AppBar>

      <AdminSidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8
        }}
      >
        <AdminRoutes />
      </Box>
    </Box>
  );
};

export default AdminDashboard; 