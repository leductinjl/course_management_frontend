import React from 'react';
import InstructorHeader from '../../components/instructor/InstructorHeader';
import Footer from '../../components/Footer';
import PersonalInfo from '../../components/instructor/PersonalInfo';
import { 
  Container, 
  Paper, 
  Grid, 
  Box, 
  Typography, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VerifiedIcon from '@mui/icons-material/Verified';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

const InstructorInfo: React.FC = () => {
  const achievements = [
    {
      icon: <SchoolIcon color="primary" />,
      title: "Học vị",
      content: "Tiến sĩ Công nghệ thông tin (2015)",
    },
    {
      icon: <WorkHistoryIcon color="primary" />,
      title: "Kinh nghiệm",
      content: "10 năm giảng dạy tại TTTH ĐHSP",
    },
    {
      icon: <EmojiEventsIcon color="primary" />,
      title: "Thành tích",
      content: "Giảng viên xuất sắc năm 2022",
    },
  ];

  const certificates = [
    {
      name: "Chứng chỉ sư phạm đại học",
      issuer: "Bộ Giáo dục và Đào tạo",
      year: "2012",
    },
    {
      name: "IELTS Academic 7.5",
      issuer: "British Council",
      year: "2020",
    },
    {
      name: "Chứng chỉ Tin học IC3",
      issuer: "Certiport",
      year: "2019",
    },
  ];

  const professionalActivities = [
    {
      period: "2015 - Hiện tại",
      position: "Giảng viên chính",
      department: "Khoa Công nghệ thông tin",
      responsibilities: [
        "Giảng dạy các môn học chuyên ngành CNTT",
        "Phụ trách bộ môn Lập trình cơ bản",
        "Tham gia nghiên cứu khoa học",
      ]
    },
    {
      period: "2012 - 2015",
      position: "Giảng viên",
      department: "Khoa Công nghệ thông tin",
      responsibilities: [
        "Giảng dạy tin học cơ bản",
        "Hỗ trợ sinh viên thực hành",
      ]
    },
  ];

  return (
    <>
      <InstructorHeader />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <PersonalInfo />
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Thông tin chuyên môn
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={3}>
                {achievements.map((item, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      p: 2,
                      border: '1px solid #e0e0e0',
                      borderRadius: 1,
                      height: '100%'
                    }}>
                      {item.icon}
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.content}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <WorkspacePremiumIcon color="primary" />
                <Typography variant="h6">
                  Chứng chỉ
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <List>
                {certificates.map((cert, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <VerifiedIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={cert.name}
                      secondary={
                        <React.Fragment>
                          <Typography variant="body2" color="text.secondary">
                            {cert.issuer}
                          </Typography>
                          <Chip 
                            label={cert.year} 
                            size="small" 
                            sx={{ mt: 0.5 }}
                          />
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <BusinessCenterIcon color="primary" />
                <Typography variant="h6">
                  Quá trình công tác
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              {professionalActivities.map((activity, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {activity.position}
                    </Typography>
                    <Chip 
                      label={activity.period} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {activity.department}
                  </Typography>
                  <List dense>
                    {activity.responsibilities.map((resp, idx) => (
                      <ListItem key={idx}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <Box sx={{ width: 4, height: 4, bgcolor: 'primary.main', borderRadius: '50%' }} />
                        </ListItemIcon>
                        <ListItemText primary={resp} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default InstructorInfo; 