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
import AddExamDialog from './exam/AddExamDialog';
import EditExamDialog from './exam/EditExamDialog';
import DeleteConfirmDialog from './common/DeleteConfirmDialog';
import { useDeleteConfirmation } from '../../hooks/useDeleteConfirmation';

const ExamManagement = () => {
  const [exams, setExams] = useState([
    { 
      id: 1, 
      code: 'EX001', 
      name: 'Giữa kỳ Lập trình cơ bản', 
      course: 'CS101',
      date: '2024-04-15',
      time: '08:00',
      duration: 90,
      location: 'P.201',
      type: 'midterm',
      description: 'Kiểm tra giữa kỳ môn Lập trình cơ bản',
      status: 'Sắp diễn ra' 
    },
    { 
      id: 2, 
      code: 'EX002', 
      name: 'Cuối kỳ Cấu trúc dữ liệu', 
      course: 'CS102',
      date: '2024-04-20',
      time: '13:30',
      duration: 120,
      location: 'P.305',
      type: 'final',
      description: 'Thi cuối kỳ môn Cấu trúc dữ liệu',
      status: 'Sắp diễn ra' 
    },
  ]);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedExam, setSelectedExam] = useState<any>(null);

  const handleAddExam = (examData: any) => {
    setExams([...exams, {
      id: exams.length + 1,
      ...examData,
      status: 'Sắp diễn ra'
    }]);
    setOpenAddDialog(false);
  };

  const handleEditExam = (examData: any) => {
    setExams(exams.map(exam => 
      exam.id === selectedExam.id ? { ...exam, ...examData } : exam
    ));
    setOpenEditDialog(false);
  };

  const handleDeleteExam = async (exam: any) => {
    try {
      // await examApi.delete(exam.id);
      setExams(exams.filter(e => e.id !== exam.id));
    } catch (error) {
      console.error('Failed to delete exam:', error);
    }
  };

  const { dialogProps, handleOpen: openDelete } = useDeleteConfirmation({
    onDelete: handleDeleteExam,
    getMessage: (exam) => `Bạn có chắc chắn muốn xóa kỳ thi "${exam.name}" không?`,
    getTitle: () => "Xóa kỳ thi"
  });

  const openEdit = (exam: any) => {
    setSelectedExam(exam);
    setOpenEditDialog(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Quản lý kỳ thi</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
        >
          Thêm kỳ thi
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã kỳ thi</TableCell>
              <TableCell>Tên kỳ thi</TableCell>
              <TableCell>Môn học</TableCell>
              <TableCell>Ngày thi</TableCell>
              <TableCell>Giờ thi</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Địa điểm</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>{exam.code}</TableCell>
                <TableCell>{exam.name}</TableCell>
                <TableCell>{exam.course}</TableCell>
                <TableCell>{exam.date}</TableCell>
                <TableCell>{exam.time}</TableCell>
                <TableCell>{exam.duration} phút</TableCell>
                <TableCell>{exam.location}</TableCell>
                <TableCell>
                  <Chip 
                    label={
                      exam.type === 'midterm' ? 'Giữa kỳ' :
                      exam.type === 'final' ? 'Cuối kỳ' : 'Thi lại'
                    }
                    color={
                      exam.type === 'midterm' ? 'primary' :
                      exam.type === 'final' ? 'secondary' : 'default'
                    }
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={exam.status}
                    color={exam.status === 'Đã kết thúc' ? 'default' : 'success'}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => openEdit(exam)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => openDelete(exam)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddExamDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={handleAddExam}
      />

      {selectedExam && (
        <EditExamDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          onSubmit={handleEditExam}
          examData={selectedExam}
        />
      )}

      <DeleteConfirmDialog {...dialogProps} />
    </Box>
  );
};

export default ExamManagement; 