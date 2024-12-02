// src/routes/Router.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentHome from '../pages/StudentHome';
import SearchPage from '../pages/SearchPage';
import CourseRegistration from '../pages/CourseRegistration';
import StudentInfo from '../pages/StudentInfo';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import WelcomePage from '../pages/WelcomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import InstructorHome from '../pages/InstructorHome';
import InstructorInfo from '../pages/InstructorInfo';
import InstructorTeaching from '../pages/InstructorTeaching';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/student-home" element={<StudentHome />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/course-registration" element={<CourseRegistration />} />
      <Route path="/student-info" element={<StudentInfo />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/instructor-home" element={<InstructorHome />} />
      <Route path="/instructor-info" element={<InstructorInfo />} />
      <Route path="/instructor-teaching" element={<InstructorTeaching />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
