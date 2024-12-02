import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Grid, Paper, Typography, List, ListItem, ListItemText, Box, InputBase, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import '../styles/pages/studentHomeStyle/StudentHome.css';
import { MenuPaper } from '../styles/pages/studentHomeStyle/MenuPaper.styles';

const StudentHome: React.FC = () => {
  const bannerItems = [
    {
      imgSrc: "https://picsum.photos/1200/400", // Placeholder image 1200x400px
      alt: "Banner tuyển sinh HCMUE 2023"
    },
    {
      imgSrc: "https://picsum.photos/seed/picsum/1200/400", // Different random image
      alt: "Banner 2"
    },
    {
      imgSrc: "https://picsum.photos/seed/banner3/1200/400", // Another different random image
      alt: "Banner 3"
    }
    // Có thể thêm nhiều banner khác nếu cần
  ];

  const menuItems = [
    {
      title: "CỔNG THÔNG TIN SINH VIÊN",
      color: "#304399", // Navy blue
    },
    {
      title: "SỔ TAY SINH VIÊN",
      color: "#E91E63", // Pink
    },
    {
      title: "CẨM NANG CỐ VẤN",
      color: "#3F4E75", // Dark blue grey
    },
    {
      title: "SINH HOẠT CÔNG DÂN",
      color: "#26A69A", // Teal
    },
    {
      title: "BIỂU MẪU CẦN THIẾT",
      color: "#FF9800", // Orange
    }
  ];

  const newsItems = [
    "Thông báo chung",
    "Thông báo từ phòng KHTC",
    "Khảo sát lấy ý kiến người học",
    "Hành chính",
    "Đào tạo",
    "Khảo thí",
    "Công tác SV",
    "Thông báo nổi bật",
  ];

  const announcements = [
    {
      title: "THÔNG BÁO VỀ THỜI GIAN NỘP HỌC PHÍ NĂM HỌC 2024-2025",
      date: "26/11/2024",
      updateDate: "26/11/2024",
      isNew: true
    },
    {
      title: "Thông báo về việc cung cấp thông tin để hoàn trả lệ phí đăng ký kiểm tra ngoại ngữ đầu vào năm 2024",
      date: "15/11/2024",
      updateDate: "26/11/2024",
      isNew: true
    },
    // ... thêm các thông báo khác tương tự
  ];

  return (
    <>
      <Header />
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
                className='bannerImage'    
              />
            </Paper>
          ))}
        </Carousel>

        {/* Menu Cards */}
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
                  lineHeight: 1.2
                }}
              >
                {item.title}
              </Typography>
            </MenuPaper>
          </Grid>
          ))}
        </Grid>
      </Container>

      {/* News and Announcements Section */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* News Section */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" sx={{ color: '#304399', mb: 2, fontWeight: 'bold' }}>
                Tin tức
              </Typography>
              <List>
                {newsItems.map((item, index) => (
                  <ListItem key={index} sx={{ py: 0.5, px: 1 }}>
                    <ListItemText 
                      primary={item}
                      sx={{ 
                        '& .MuiTypography-root': { 
                          fontSize: '0.9rem',
                          '&:hover': { color: '#304399', cursor: 'pointer' }
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Announcements Section */}
          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                <Typography variant="h6" sx={{ color: '#304399', fontWeight: 'bold' }}>
                  Thông báo mới
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <InputBase
                    placeholder="Tìm kiếm..."
                    sx={{ border: '1px solid #ddd', borderRadius: 1, px: 1 }}
                  />
                  <Button variant="contained" sx={{ bgcolor: '#ff0000', '&:hover': { bgcolor: '#cc0000' } }}>
                    Tìm kiếm
                  </Button>
                </Box>
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

export default StudentHome;
