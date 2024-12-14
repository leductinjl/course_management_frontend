import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { adminGradeService } from '../../services/admin.grade.service';

interface PendingGrade {
  id: string;
  attendance_score: number;
  midterm_score: number;
  final_score: number;
  total_score: number;
  Enrollment: {
    Student: {
      id: string;
      full_name: string;
    };
    Class: {
      class_code: string;
      Course: {
        name: string;
        code: string;
      };
    };
  };
}

const GradeVerification: React.FC = () => {
  const [pendingGrades, setPendingGrades] = useState<PendingGrade[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [verificationNote, setVerificationNote] = useState('');

  useEffect(() => {
    fetchPendingGrades();
  }, []);

  const fetchPendingGrades = async () => {
    try {
      const data = await adminGradeService.getPendingGrades();
      setPendingGrades(data);
    } catch (error) {
      console.error('Error fetching pending grades:', error);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedGrades(pendingGrades.map(grade => grade.id));
    } else {
      setSelectedGrades([]);
    }
  };

  const handleSelectGrade = (gradeId: string) => {
    setSelectedGrades(prev => {
      if (prev.includes(gradeId)) {
        return prev.filter(id => id !== gradeId);
      }
      return [...prev, gradeId];
    });
  };

  const handleVerifyGrades = async () => {
    try {
      await adminGradeService.verifyBulkGrades(selectedGrades, verificationNote);
      setOpenDialog(false);
      setVerificationNote('');
      setSelectedGrades([]);
      fetchPendingGrades();
    } catch (error) {
      console.error('Error verifying grades:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Xác thực điểm</Typography>
        {selectedGrades.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
          >
            Xác thực ({selectedGrades.length})
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  onChange={handleSelectAll}
                  checked={selectedGrades.length === pendingGrades.length}
                  indeterminate={
                    selectedGrades.length > 0 && 
                    selectedGrades.length < pendingGrades.length
                  }
                />
              </TableCell>
              <TableCell>Môn học</TableCell>
              <TableCell>Lớp</TableCell>
              <TableCell>MSSV</TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell align="center">Chuyên cần</TableCell>
              <TableCell align="center">Giữa kỳ</TableCell>
              <TableCell align="center">Cuối kỳ</TableCell>
              <TableCell align="center">Tổng kết</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingGrades.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedGrades.includes(grade.id)}
                    onChange={() => handleSelectGrade(grade.id)}
                  />
                </TableCell>
                <TableCell>
                  {grade.Enrollment.Class.Course.name} ({grade.Enrollment.Class.Course.code})
                </TableCell>
                <TableCell>{grade.Enrollment.Class.class_code}</TableCell>
                <TableCell>{grade.Enrollment.Student.id}</TableCell>
                <TableCell>{grade.Enrollment.Student.full_name}</TableCell>
                <TableCell align="center">{grade.attendance_score}</TableCell>
                <TableCell align="center">{grade.midterm_score}</TableCell>
                <TableCell align="center">{grade.final_score}</TableCell>
                <TableCell align="center">{grade.total_score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Xác thực điểm</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Ghi chú xác thực"
            fullWidth
            multiline
            rows={3}
            value={verificationNote}
            onChange={(e) => setVerificationNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button onClick={handleVerifyGrades} variant="contained">
            Xác thực
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GradeVerification; 