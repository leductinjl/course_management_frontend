import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { studentGradeService } from '../../services/student.grade.service';
import { getGradeStatus } from '../../utils/grade.utils';
interface GradeResult {
  id: string;
  courseCode: string;
  courseName: string;
  semester: string;
  attendance_score: number | null;
  midterm_score: number | null;
  final_score: number | null;
  total_score: number | null;
  status: 'pending' | 'graded' | 'verified';
}

const StudyResults: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<GradeResult[]>([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        setLoading(true);
        const data = await studentGradeService.getMyGrades();
        setResults(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  const formatScore = (score: number | null): string => {
    if (score === null) return '-';
    return typeof score === 'number' ? score.toFixed(1) : '-';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Kết quả học tập
      </Typography>
      
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã môn</TableCell>
              <TableCell>Tên môn học</TableCell>
              <TableCell>Học kỳ</TableCell>
              <TableCell align="center">Chuyên cần</TableCell>
              <TableCell align="center">Giữa kỳ</TableCell>
              <TableCell align="center">Cuối kỳ</TableCell>
              <TableCell align="center">Tổng kết</TableCell>
              <TableCell align="center">Điểm chữ</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map(result => (
              <TableRow key={result.id}>
                <TableCell>{result.courseCode}</TableCell>
                <TableCell>{result.courseName}</TableCell>
                <TableCell>{result.semester}</TableCell>
                <TableCell align="center">
                  {formatScore(result.attendance_score)}
                </TableCell>
                <TableCell align="center">
                  {formatScore(result.midterm_score)}
                </TableCell>
                <TableCell align="center">
                  {formatScore(result.final_score)}
                </TableCell>
                <TableCell align="center">
                  {formatScore(result.total_score)}
                </TableCell>
                <TableCell align="center">
                  {result.total_score ? getGradeStatus(result.total_score) : '-'}
                </TableCell>
                <TableCell align="center">
                  {result.status === 'verified' ? 'Đã xác thực' : 
                   result.status === 'graded' ? 'Chờ xác thực' : 'Chưa có điểm'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudyResults; 