import { Routes, Route } from 'react-router-dom';
import CourseManagement from '../components/admin/CourseManagement';
import ClassManagement from '../components/admin/ClassManagement';
import UserManagement from '../components/admin/UserManagement';
import CertificateManagement from '../components/admin/CertificateManagement';
import ExamManagement from '../components/admin/ExamManagement';
import FinanceManagement from '../components/admin/FinanceManagement';
import AdminHome from '../pages/admin/AdminHome';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route index element={<AdminHome />} />
      <Route path="courses/*" element={<CourseManagement />} />
      <Route path="classes/*" element={<ClassManagement />} />
      <Route path="users/*" element={<UserManagement />} />
      <Route path="certificates/*" element={<CertificateManagement />} />
      <Route path="exams/*" element={<ExamManagement />} />
      <Route path="finance/*" element={<FinanceManagement />} />
    </Routes>
  );
};

export default AdminRoutes; 