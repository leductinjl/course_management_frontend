import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import EditIcon from '@mui/icons-material/Edit';

interface Student {
  id: string;
  name: string;
  midterm_grade?: number;
  final_grade?: number;
  attendance?: number;
}

interface ClassGradeProps {
  class_id: string;
  className: string;
  courseName: string;
}

const ClassGradeManagement: React.FC<ClassGradeProps> = ({
  class_id,
  className,
  courseName,
}) => {
  const [students, setStudents] = useState<Student[]>([
    { id: 'SV001', name: 'Nguyễn Văn A', midterm_grade: 8, final_grade: 7.5, attendance: 90 },
    { id: 'SV002', name: 'Trần Thị B', midterm_grade: 7, final_grade: 8, attendance: 85 },
    { id: 'SV003', name: 'Lê Văn C', midterm_grade: 9, final_grade: 8.5, attendance: 95 },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editedGrades, setEditedGrades] = useState({
    midterm_grade: '',
    final_grade: '',
    attendance: '',
  });

  const handleOpenDialog = (student: Student) => {
    setSelectedStudent(student);
    setEditedGrades({
      midterm_grade: student.midterm_grade?.toString() || '',
      final_grade: student.final_grade?.toString() || '',
      attendance: student.attendance?.toString() || '',
    });
    setOpenDialog(true);
  };

  const handleSaveGrades = () => {
    if (selectedStudent) {
      const updatedStudents = students.map(student => 
        student.id === selectedStudent.id
          ? {
              ...student,
              midterm_grade: editedGrades.midterm_grade ? Number(editedGrades.midterm_grade) : undefined,
              final_grade: editedGrades.final_grade ? Number(editedGrades.final_grade) : undefined,
              attendance: editedGrades.attendance ? Number(editedGrades.attendance) : undefined,
            }
          : student
      );
      setStudents(updatedStudents);
      setOpenDialog(false);
    }
  };

  const handleExportExcel = () => {
    // Implement Excel export logic
    console.log('Exporting to Excel...');
  };

  const handleImportExcel = () => {
    // Implement Excel import logic
    console.log('Importing from Excel...');
  };

  const calculatefinal_grade = (student: Student) => {
    if (student.midterm_grade !== undefined && student.final_grade !== undefined) {
      return ((student.midterm_grade + student.final_grade) / 2).toFixed(1);
    }
    return '-';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">
          Quản lý điểm lớp {className} - {courseName}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<FileUploadIcon />}
            onClick={handleImportExcel}
          >
            Nhập điểm từ Excel
          </Button>
          <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            onClick={handleExportExcel}
          >
            Xuất Excel
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>MSSV</TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell align="center">Chuyên cần (%)</TableCell>
              <TableCell align="center">Điểm giữa kỳ</TableCell>
              <TableCell align="center">Điểm cuối kỳ</TableCell>
              <TableCell align="center">Điểm tổng kết</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell align="center">{student.attendance || '-'}</TableCell>
                <TableCell align="center">{student.midterm_grade || '-'}</TableCell>
                <TableCell align="center">{student.final_grade || '-'}</TableCell>
                <TableCell align="center">{calculatefinal_grade(student)}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Sửa điểm">
                    <IconButton 
                      size="small"
                      onClick={() => handleOpenDialog(student)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Sửa điểm</DialogTitle>
        <DialogContent>
          <TextField
            label="Chuyên cần (%)"
            value={editedGrades.attendance}
            onChange={(e) => setEditedGrades({ ...editedGrades, attendance: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Điểm giữa kỳ"
            value={editedGrades.midterm_grade}
            onChange={(e) => setEditedGrades({ ...editedGrades, midterm_grade: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Điểm cuối kỳ"
            value={editedGrades.final_grade}
            onChange={(e) => setEditedGrades({ ...editedGrades, final_grade: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button onClick={handleSaveGrades}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClassGradeManagement; 