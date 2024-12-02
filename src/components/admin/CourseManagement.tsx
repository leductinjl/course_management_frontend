import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import AddCourseDialog from './course/AddCourseDialog';
import EditCourseDialog from './course/EditCourseDialog';
import DeleteConfirmDialog from './common/DeleteConfirmDialog';
import { useDeleteConfirmation } from '../../hooks/useDeleteConfirmation';

const CourseManagement = () => {
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      code: 'CS101', 
      name: 'Lập trình cơ bản', 
      instructor: 'Nguyễn Văn A', 
      credits: 3,
      type: 'Cơ bản',
      status: 'Đang mở' 
    },
    { 
      id: 2, 
      code: 'CS102', 
      name: 'Cấu trúc dữ liệu', 
      instructor: 'Trần Thị B', 
      credits: 4,
      type: 'Nâng cao',
      status: 'Đang mở' 
    },
  ]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const handleAddCourse = (courseData: any) => {
    setCourses([...courses, {
      id: courses.length + 1,
      ...courseData,
      status: 'Đang mở'
    }]);
  };

  const handleEditCourse = (courseData: any) => {
    setCourses(courses.map(course => 
      course.id === selectedCourse.id ? { ...course, ...courseData } : course
    ));
    setOpenEditDialog(false);
  };

  const handleDeleteCourse = async (course: any) => {
    try {
      // Gọi API xóa khóa học
      // await courseApi.delete(course.id);
      setCourses(courses.filter(c => c.id !== course.id));
    } catch (error) {
      console.error('Failed to delete course:', error);
      // Hiển thị thông báo lỗi
    }
  };

  const { dialogProps, handleOpen: openDelete } = useDeleteConfirmation({
    onDelete: handleDeleteCourse,
    getMessage: (course) => `Bạn có chắc chắn muốn xóa môn học "${course.name}" không?`,
    getTitle: () => "Xóa môn học"
  });

  const openEdit = (course: any) => {
    setSelectedCourse(course);
    setOpenEditDialog(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Quản lý môn học</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
        >
          Thêm môn học
        </Button>
      </Box>

      <AddCourseDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={handleAddCourse}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã môn</TableCell>
              <TableCell>Tên môn học</TableCell>
              <TableCell>Giảng viên</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>{course.code}</TableCell>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>{course.status}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => openEdit(course)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => openDelete(course)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedCourse && (
        <EditCourseDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          onSubmit={handleEditCourse}
          courseData={selectedCourse}
        />
      )}

      <DeleteConfirmDialog {...dialogProps} />
    </Box>
  );
};

export default CourseManagement; 