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
  midtermGrade?: number;
  finalGrade?: number;
  attendance?: number;
}

interface ClassGradeProps {
  classId: string;
  className: string;
  courseName: string;
}

const ClassGradeManagement: React.FC<ClassGradeProps> = ({
  classId,
  className,
  courseName,
}) => {
  const [students, setStudents] = useState<Student[]>([
    { id: 'SV001', name: 'Nguyễn Văn A', midtermGrade: 8, finalGrade: 7.5, attendance: 90 },
    { id: 'SV002', name: 'Trần Thị B', midtermGrade: 7, finalGrade: 8, attendance: 85 },
    { id: 'SV003', name: 'Lê Văn C', midtermGrade: 9, finalGrade: 8.5, attendance: 95 },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editedGrades, setEditedGrades] = useState({
    midtermGrade: '',
    finalGrade: '',
    attendance: '',
  });

  const handleOpenDialog = (student: Student) => {
    setSelectedStudent(student);
    setEditedGrades({
      midtermGrade: student.midtermGrade?.toString() || '',
      finalGrade: student.finalGrade?.toString() || '',
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
              midtermGrade: editedGrades.midtermGrade ? Number(editedGrades.midtermGrade) : undefined,
              finalGrade: editedGrades.finalGrade ? Number(editedGrades.finalGrade) : undefined,
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

  const calculateFinalGrade = (student: Student) => {
    if (student.midtermGrade !== undefined && student.finalGrade !== undefined) {
      return ((student.midtermGrade + student.finalGrade) / 2).toFixed(1);
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
                <TableCell align="center">{student.midtermGrade || '-'}</TableCell>
                <TableCell align="center">{student.finalGrade || '-'}</TableCell>
                <TableCell align="center">{calculateFinalGrade(student)}</TableCell>
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
            value={editedGrades.midtermGrade}
            onChange={(e) => setEditedGrades({ ...editedGrades, midtermGrade: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Điểm cuối kỳ"
            value={editedGrades.finalGrade}
            onChange={(e) => setEditedGrades({ ...editedGrades, finalGrade: e.target.value })}
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