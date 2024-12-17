import React from 'react';
import {
  Box,
  Drawer,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  School as SchoolIcon,
  People as PeopleIcon,
  CardMembership as CertificateIcon,
  Assignment as ExamIcon,
  Logout as LogoutIcon,
  Home as HomeIcon,
  Class as ClassIcon,
  MonetizationOn as MonetizationOnIcon,
  RequestPage as RequestIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { 
      id: 'home',
      text: 'Trang chủ', 
      icon: <HomeIcon />,
      path: '/adminne/dashboard'
    },
    { 
      id: 'courses', 
      text: 'Quản lý môn học', 
      icon: <SchoolIcon />,
      path: '/adminne/dashboard/courses'
    },
    { 
      id: 'classes', 
      text: 'Quản lý lớp học', 
      icon: <ClassIcon />,
      path: '/adminne/dashboard/classes'
    },
    { 
      id: 'class-requests', 
      text: 'Yêu cầu mở lớp', 
      icon: <RequestIcon />,
      path: '/adminne/dashboard/class-requests'
    },
    { 
      id: 'users', 
      text: 'Quản lý tài khoản', 
      icon: <PeopleIcon />,
      path: '/adminne/dashboard/users'
    },
    { 
      id: 'certificates', 
      text: 'Quản lý chứng chỉ', 
      icon: <CertificateIcon />,
      path: '/adminne/dashboard/certificates'
    },
    { 
      id: 'exams', 
      text: 'Quản lý kỳ thi', 
      icon: <ExamIcon />,
      path: '/adminne/dashboard/exams'
    },
    { 
      id: 'finance', 
      text: 'Quản lý tài chính', 
      icon: <MonetizationOnIcon />,
      path: '/adminne/dashboard/finance'
    },
  ];

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.id}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              },
              '&:hover': {
                backgroundColor: 'primary.light',
                color: 'white',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
              },
            }}
          >
            <ListItemIcon sx={{ 
              color: location.pathname === item.path ? 'white' : 'inherit'
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List>
        <ListItemButton
          onClick={() => navigate('/')}
          sx={{
            '&:hover': {
              backgroundColor: 'error.light',
              color: 'white',
              '& .MuiListItemIcon-root': {
                color: 'white',
              },
            },
          }}
        >
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Đăng xuất" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default AdminSidebar; 