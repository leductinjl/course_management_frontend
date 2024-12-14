import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import { classGradeService } from '../../services/classGrade.service';
import { StudentGrade, EditedGrades, GradeUpdateDTO } from '../../types/grade.types';

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
  const [students, setStudents] = useState<StudentGrade[]>([]);
  const [enrollmentCount, setEnrollmentCount] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState<StudentGrade | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editedGrades, setEditedGrades] = useState<EditedGrades>({
    attendance: '',
    midterm_score: '',
    final_score: '',
  });

  const fetchGrades = async () => {
    try {
      const data = await classGradeService.getClassStudents(class_id);
      console.log('Fetched grades data:', data); // Debug log
      if (Array.isArray(data)) {
        setStudents(data);
        setEnrollmentCount(data.length);
      } else {
        console.error('Invalid grades data format:', data);
        setStudents([]);
        setEnrollmentCount(0);
      }
    } catch (error) {
      console.error('Error fetching grades:', error);
      setStudents([]);
      setEnrollmentCount(0);
    }
  };

  useEffect(() => {
    console.log('Class ID:', class_id); // Debug log
    fetchGrades();
  }, [class_id]);

  const handleEditClick = (student: StudentGrade) => {
    setSelectedStudent(student);
    setEditedGrades({
      attendance: student.attendance_score?.toString() || '',
      midterm_score: student.midterm_score?.toString() || '',
      final_score: student.final_score?.toString() || '',
    });
    setOpenDialog(true);
  };

  const handleSaveGrades = async () => {
    if (!selectedStudent) return;

    try {
      const gradeData: GradeUpdateDTO[] = [{
        enrollment_id: selectedStudent.enrollment_id,
        attendance_score: editedGrades.attendance ? parseFloat(editedGrades.attendance) : null,
        midterm_score: editedGrades.midterm_score ? parseFloat(editedGrades.midterm_score) : null,
        final_score: editedGrades.final_score ? parseFloat(editedGrades.final_score) : null,
      }];

      await classGradeService.updateClassGrades(class_id, gradeData);
      setOpenDialog(false);
      fetchGrades();
    } catch (error) {
      console.error('Error updating grades:', error);
    }
  };

  // Hàm format điểm
  const formatGrade = (score: number | string | undefined | null): string => {
    if (score === undefined || score === null) return '-';
    const numScore = typeof score === 'string' ? parseFloat(score) : score;
    if (isNaN(numScore)) return '-';
    return numScore.toFixed(2);
  };

  // Hàm xác định trạng thái đạt/không đạt
  const getGradeStatus = (totalScore: number | undefined | null): string => {
    if (totalScore === undefined || totalScore === null) return '-';
    return totalScore >= 4.0 ? 'Đạt' : 'Không đạt';
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {courseName} - Lớp {className}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Sĩ số: {enrollmentCount} học viên
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Họ tên</TableCell>
              <TableCell align="right">Chuyên cần (10%)</TableCell>
              <TableCell align="right">Giữa kỳ (40%)</TableCell>
              <TableCell align="right">Cuối kỳ (50%)</TableCell>
              <TableCell align="right">Tổng kết</TableCell>
              <TableCell align="right">Kết quả</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.enrollment_id || student.student_id}>
                <TableCell>{student.student_name}</TableCell>
                <TableCell align="right">{formatGrade(student.attendance_score)}</TableCell>
                <TableCell align="right">{formatGrade(student.midterm_score)}</TableCell>
                <TableCell align="right">{formatGrade(student.final_score)}</TableCell>
                <TableCell align="right">{formatGrade(student.total_score)}</TableCell>
                <TableCell align="right">{getGradeStatus(student.total_score)}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEditClick(student)}
                  >
                    Sửa điểm
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Sửa điểm - {selectedStudent?.student_name}</DialogTitle>
        <DialogContent>
          <TextField
            label="Chuyên cần (0-100)"
            value={editedGrades.attendance}
            onChange={(e) => setEditedGrades({ ...editedGrades, attendance: e.target.value })}
            fullWidth
            margin="normal"
            type="number"
            inputProps={{ min: 0, max: 10, step: 0.1 }}
            helperText="Điểm chuyên cần từ 0-10"
          />
          <TextField
            label="Điểm giữa kỳ (0-10)"
            value={editedGrades.midterm_score}
            onChange={(e) => setEditedGrades({ ...editedGrades, midterm_score: e.target.value })}
            fullWidth
            margin="normal"
            type="number"
            inputProps={{ min: 0, max: 10, step: 0.1 }}
            helperText="Điểm giữa kỳ từ 0-10"
          />
          <TextField
            label="Điểm cuối kỳ (0-10)"
            value={editedGrades.final_score}
            onChange={(e) => setEditedGrades({ ...editedGrades, final_score: e.target.value })}
            fullWidth
            margin="normal"
            type="number"
            inputProps={{ min: 0, max: 10, step: 0.1 }}
            helperText="Điểm cuối kỳ từ 0-10"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button onClick={handleSaveGrades} variant="contained" color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClassGradeManagement; 