import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Typography } from '@mui/material';

const SearchPage: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Tra cứu thông tin
        </Typography>
        {/* Thêm nội dung trang tra cứu ở đây */}
      </Container>
      <Footer />
    </>
  );
};

export default SearchPage; 