// src/routes/Router.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentHome from '../pages/student/StudentHome';
import SearchPage from '../pages/student/SearchPage';
import CourseRegistration from '../pages/student/CourseRegistration';
import StudentInfo from '../pages/student/StudentInfo';
import About from '../pages/About';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import WelcomePage from '../pages/WelcomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import InstructorHome from '../pages/instructor/InstructorHome';
import InstructorInfo from '../pages/instructor/InstructorInfo';
import InstructorTeaching from '../pages/instructor/InstructorTeaching';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import InstructorSalary from '../pages/instructor/InstructorSalary';
import VNPayReturn from '../pages/payment/VNPayReturn';

const AppRouter: React.FC = () => {

  return (
    <Routes>
      {/* Public Routes */}
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
      <Route path="/instructor-salary" element={<InstructorSalary />} />
      <Route path="/payment/vnpay-return" element={<VNPayReturn />} />

      {/* Admin Routes */}
      <Route path="/adminne/login" element={<AdminLogin />} />
      <Route 
        path="/adminne/dashboard/*" 
        element={
            <AdminDashboard />
        } 
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
