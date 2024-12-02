import { Routes, Route, Navigate } from 'react-router-dom';
import CourseManagement from '../components/admin/CourseManagement';
import UserManagement from '../components/admin/UserManagement';
import CertificateManagement from '../components/admin/CertificateManagement';
import ExamManagement from '../components/admin/ExamManagement';
import AdminHome from '../pages/admin/AdminHome';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route index element={<AdminHome />} />
      <Route path="courses/*" element={<CourseManagement />} />
      <Route path="users/*" element={<UserManagement />} />
      <Route path="certificates/*" element={<CertificateManagement />} />
      <Route path="exams/*" element={<ExamManagement />} />
    </Routes>
  );
};

export default AdminRoutes; 