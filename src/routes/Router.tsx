// src/routes/Router.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentHome from '../pages/StudentHome';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import WelcomePage from '../pages/WelcomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

const AppRouter: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/student-home" element={<StudentHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
};

export default AppRouter;
