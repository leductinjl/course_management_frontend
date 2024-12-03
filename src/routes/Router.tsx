// src/routes/Router.tsx
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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
import AdminPortalAuth from '../pages/admin/AdminPortalAuth';
import { useAuth } from '../contexts/AuthContext';

const PortalAuthGuard = ({ children }: { children: React.ReactNode }) => {
  const isPortalAuthenticated = sessionStorage.getItem('portalAuth') === 'true';
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isPortalAuthenticated) {
      navigate('/management-portal-secure');
    }
  }, [isPortalAuthenticated, navigate]);

  return isPortalAuthenticated ? <>{children}</> : null;
};

const AppRouter: React.FC = () => {
  const { isAdminAuthenticated } = useAuth();

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

      {/* Admin Routes */}
      <Route path="/management-portal-secure" element={<AdminPortalAuth />} />
      <Route 
        path="/management-portal-secure/login" 
        element={
          <PortalAuthGuard>
            <AdminLogin />
          </PortalAuthGuard>
        } 
      />
      <Route 
        path="/management-portal-secure/dashboard/*" 
        element={
          <PortalAuthGuard>
            {isAdminAuthenticated ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/management-portal-secure/login" replace />
            )}
          </PortalAuthGuard>
        } 
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
