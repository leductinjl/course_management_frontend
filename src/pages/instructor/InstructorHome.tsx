import React from 'react';
import InstructorHeader from '../../components/instructor/InstructorHeader';
import Footer from '../../components/Footer';
import { Container, Grid, Paper, Typography, List, ListItem, Box, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { MenuPaper } from '../../styles/pages/studentHomeStyle/MenuPaper.styles';

const InstructorHome: React.FC = () => {
  const bannerItems = [
    {
      imgSrc: "https://picsum.photos/1200/400",
      alt: "Banner HCMUE 2024"
    },
    {
      imgSrc: "https://picsum.photos/seed/picsum/1200/400",
      alt: "Banner 2"
    }
  ];

  const menuItems = [
    {
      title: "THÔNG TIN GIẢNG VIÊN",
      color: "#304399",
    },
    {
      title: "THÔNG TIN GIẢNG DẠY",
      color: "#E91E63",
    },
    {
      title: "LỊCH DẠY",
      color: "#3F4E75",
    },
    {
      title: "QUẢN LÝ ĐIỂM",
      color: "#26A69A",
    },
    {
      title: "BIỂU MẪU",
      color: "#FF9800",
    }
  ];

  const announcements = [
    {
      title: "THÔNG BÁO VỀ LỊCH NGHỈ TẾT NGUYÊN ĐÁN 2024",
      date: "26/01/2024",
      updateDate: "26/01/2024",
      isNew: true
    },
    {
      title: "Thông báo về việc nộp điểm học kỳ 1 năm học 2023-2024",
      date: "15/01/2024",
      updateDate: "15/01/2024",
      isNew: true
    }
  ];

  return (
    <>
      <InstructorHeader />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Carousel
          animation="slide"
          interval={5000}
          indicators={true}
          navButtonsAlwaysVisible={true}
        >
          {bannerItems.map((item, index) => (
            <Paper key={index} elevation={0}>
              <img 
                src={item.imgSrc} 
                alt={item.alt}
                style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover' }}
              />
            </Paper>
          ))}
        </Carousel>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={index}>
              <MenuPaper sx={{ backgroundColor: item.color }}>
                <Typography 
                  variant="subtitle1" 
                  align="center" 
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    lineHeight: 1.2,
                    color: 'white'
                  }}
                >
                  {item.title}
                </Typography>
              </MenuPaper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ color: '#304399', fontWeight: 'bold' }}>
                  Thông báo mới
                </Typography>
                <Button variant="contained" color="primary">
                  Xem tất cả
                </Button>
              </Box>
              
              <List>
                {announcements.map((item, index) => (
                  <ListItem 
                    key={index}
                    sx={{ 
                      borderBottom: '1px solid #eee',
                      py: 1.5,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {item.isNew && (
                        <Box component="span" sx={{ color: 'red', fontWeight: 'bold' }}>
                          Mới
                        </Box>
                      )}
                      <Typography sx={{ '&:hover': { color: '#304399', cursor: 'pointer' } }}>
                        {item.title}
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: '#666' }}>
                      Ngày đăng tin {item.date} • Ngày cập nhật {item.updateDate}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default InstructorHome;