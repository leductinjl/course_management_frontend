import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container } from '@mui/material';

import styles from './StudentHome.module.css';

const StudentHome: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <h1 className={styles.welcomeText}>Welcome to the Home Page</h1>
      </Container>
      <Footer />
    </>
  );
};

export default StudentHome;
