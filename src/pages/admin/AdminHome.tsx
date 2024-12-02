import React from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card,
  CardContent,
  Divider,
  Stack
} from '@mui/material';
import {
  School as SchoolIcon,
  People as PeopleIcon,
  CardMembership as CertificateIcon,
  Assignment as ExamIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    {
      id: 'courses',
      title: 'Quản lý môn học',
      description: 'Quản lý danh sách môn học, thông tin chi tiết và trạng thái',
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      path: 'courses',
      color: '#1976d2',
      stats: '24 môn học'
    },
    {
      id: 'users',
      title: 'Quản lý tài khoản',
      description: 'Quản lý người dùng, phân quyền và thông tin cá nhân',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      path: 'users',
      color: '#2e7d32',
      stats: '156 người dùng'
    },
    {
      id: 'certificates',
      title: 'Quản lý chứng chỉ',
      description: 'Quản lý cấp phát và theo dõi chứng chỉ học viên',
      icon: <CertificateIcon sx={{ fontSize: 40 }} />,
      path: 'certificates',
      color: '#ed6c02',
      stats: '89 chứng chỉ'
    },
    {
      id: 'exams',
      title: 'Quản lý kỳ thi',
      description: 'Quản lý lịch thi, đề thi và kết quả thi',
      icon: <ExamIcon sx={{ fontSize: 40 }} />,
      path: 'exams',
      color: '#9c27b0',
      stats: '12 kỳ thi'
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 4, 
          bgcolor: 'primary.dark',
          color: 'white'
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <DashboardIcon sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="h4" gutterBottom>
              Xin chào, Admin
            </Typography>
            <Typography variant="subtitle1">
              Chào mừng bạn đến với Hệ thống quản trị TTTH ĐHSP
            </Typography>
          </Box>
        </Stack>
      </Paper>
      
      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
              onClick={() => navigate(item.path)}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ 
                  mb: 2, 
                  color: item.color,
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  {item.icon}
                </Box>
                <Typography variant="h6" component="div" align="center" gutterBottom>
                  {item.title}
                </Typography>
                <Divider sx={{ my: 1.5 }} />
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  align="center"
                  sx={{ mb: 1.5 }}
                >
                  {item.description}
                </Typography>
                <Typography 
                  variant="subtitle2" 
                  color={item.color}
                  align="center"
                  sx={{ fontWeight: 'bold' }}
                >
                  {item.stats}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminHome; 