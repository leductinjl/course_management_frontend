import React from 'react';
import { 
  Box, 
  Grid, 
  Typography,
  Card,
  CardContent,
  IconButton,
  keyframes
} from '@mui/material';
import {
  School as SchoolIcon,
  People as PeopleIcon,
  CardMembership as CertificateIcon,
  Assignment as ExamIcon,
  Notifications as NotificationIcon,
  Settings as SettingsIcon,
  Class as ClassIcon,
  MonetizationOn as MonetizationOnIcon,
  RequestPage as RequestIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Định nghĩa keyframes cho các animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const AdminHome = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    {
      id: 'courses',
      title: 'Quản lý môn học',
      description: 'Quản lý danh sách môn học, thông tin chi tiết và yêu cầu mở môn',
      icon: <SchoolIcon />,
      path: 'courses',
      count: '24',
      color: '#6366f1',
      delay: '0s'
    },
    {
      id: 'classes',
      title: 'Quản lý lớp học',
      description: 'Quản lý lớp học, phân công giảng viên và theo dõi tiến độ',
      icon: <ClassIcon />,
      path: 'classes',
      count: '36',
      color: '#8b5cf6',
      delay: '0.1s'
    },
    {
      id: 'users',
      title: 'Quản lý tài khoản',
      description: 'Quản lý người dùng, phân quyền và mở khóa tài khoản',
      icon: <PeopleIcon />,
      path: 'users',
      count: '156',
      color: '#10b981',
      delay: '0.2s'
    },
    {
      id: 'certificates',
      title: 'Quản lý chứng chỉ',
      description: 'Quản lý chứng chỉ, tiêu chuẩn cấp và theo dõi cấp phát',
      icon: <CertificateIcon />,
      path: 'certificates',
      count: '45',
      color: '#f59e0b',
      delay: '0.3s'
    },
    {
      id: 'exams',
      title: 'Quản lý kỳ thi',
      description: 'Quản lý kỳ thi cấp chứng chỉ và đăng ký thi',
      icon: <ExamIcon />,
      path: 'exams',
      count: '12',
      color: '#ec4899',
      delay: '0.4s'
    },
    {
      id: 'finance',
      title: 'Quản lý tài chính',
      description: 'Thống kê doanh thu và quản lý thanh toán lương',
      icon: <MonetizationOnIcon />,
      path: 'finance',
      count: '₫',
      color: '#14b8a6',
      delay: '0.5s'
    },
    {
      id: 'class-requests',
      title: 'Yêu cầu mở lớp',
      description: 'Quản lý và phê duyệt các yêu cầu mở lớp mới',
      icon: <RequestIcon />,
      path: 'class-requests',
      count: '8',
      color: '#ef4444',
      delay: '0.25s'
    }
  ];

  return (
    <Box sx={{ 
      p: 4, 
      bgcolor: '#f8fafc', 
      minHeight: '100vh',
      animation: `${fadeIn} 0.6s ease-out`
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4,
        animation: `${fadeIn} 0.6s ease-out`
      }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 500, 
          color: '#1e293b',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: 0,
            width: '60px',
            height: '3px',
            backgroundColor: '#6366f1',
            borderRadius: '2px'
          }
        }}>
          Admin Home
        </Typography>
        <Box>
          <IconButton 
            color="inherit"
            sx={{
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
                color: '#6366f1'
              }
            }}
          >
            <NotificationIcon />
          </IconButton>
          <IconButton 
            color="inherit"
            sx={{
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.1)',
                color: '#6366f1'
              }
            }}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Welcome Message */}
      <Box 
        sx={{ 
          mb: 4,
          p: 3,
          bgcolor: '#fff',
          borderRadius: 2,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          animation: `${fadeIn} 0.6s ease-out`,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 12px -1px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-2px)'
          }
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ 
          color: '#1e293b', 
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          Xin chào, Admin
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Chào mừng bạn đến với Hệ thống quản trị TTTH ĐHSP
        </Typography>
      </Box>

      {/* Menu Grid */}
      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Card 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                animation: `${fadeIn} 0.6s ease-out`,
                animationDelay: item.delay,
                opacity: 0,
                animationFillMode: 'forwards',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px -5px rgba(0, 0, 0, 0.15)',
                  '& .icon-box': {
                    animation: `${pulse} 0.5s ease-in-out`
                  },
                  '& .count': {
                    transform: 'scale(1.1)'
                  }
                }
              }}
              onClick={() => navigate(item.path)}
            >
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2 
                }}>
                  <Box 
                    className="icon-box"
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: `${item.color}15`,
                      color: item.color,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography 
                    className="count"
                    variant="h4" 
                    sx={{ 
                      fontWeight: 600,
                      color: item.color,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {item.count}
                  </Typography>
                </Box>
                <Typography 
                  variant="subtitle1" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 500,
                    color: '#1e293b'
                  }}
                >
                  {item.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#64748b',
                    lineHeight: 1.5
                  }}
                >
                  {item.description}
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