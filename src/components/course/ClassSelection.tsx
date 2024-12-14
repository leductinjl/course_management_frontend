import React, { useState, useEffect } from 'react';
import {
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Alert,
  CircularProgress,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import { classService } from '../../services/class.service';
import { enrollmentService } from '../../services/enrollment.service';
import { useSnackbar } from 'notistack';
import { ClassWithEnrollment } from '../../types/class.types';
import dayjs from 'dayjs';

interface ClassSelectionProps {
  course_id: string;
  onClose: () => void;
}

const ClassSelection: React.FC<ClassSelectionProps> = ({ course_id, onClose }) => {
  const [classes, setClasses] = useState<ClassWithEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolledClassId, setEnrolledClassId] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const fetchClasses = async () => {
    try {
      const data = await classService.getAvailableClasses(course_id);
      setClasses(data || []);
      // Kiểm tra lớp đã đăng ký
      const enrolledClass = data.find(c => c.isEnrolled);
      if (enrolledClass) {
        setEnrolledClassId(enrolledClass.id);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [course_id]);

  const handleEnroll = async (class_id: string) => {
    try {
      await enrollmentService.enrollClass(class_id);
      enqueueSnackbar('Đăng ký lớp học thành công!', { variant: 'success' });
      setEnrolledClassId(class_id);
      await fetchClasses(); // Refresh data
    } catch (err: any) {
      enqueueSnackbar(err.message || 'Đăng ký lớp học thất bại', { variant: 'error' });
    }
  };

  const handleUnenroll = async (class_id: string) => {
    try {
      await enrollmentService.unenrollClass(class_id);
      enqueueSnackbar('Hủy đăng ký lớp học thành công!', { variant: 'success' });
      setEnrolledClassId(null);
      await fetchClasses(); // Refresh data
    } catch (err: any) {
      enqueueSnackbar(err.message || 'Hủy đăng ký lớp học thất bại', { variant: 'error' });
    }
  };

  return (
    <>
      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : classes.length === 0 ? (
          <Typography variant="body1" sx={{ p: 2, textAlign: 'center' }}>
            Không có lớp học nào khả dụng cho môn học này
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mã lớp</TableCell>
                  <TableCell>Giảng viên</TableCell>
                  <TableCell>Lịch học</TableCell>
                  <TableCell>Ngày học</TableCell>
                  <TableCell>Phòng</TableCell>
                  <TableCell>Sĩ số</TableCell>
                  <TableCell align="center">Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {classes.map((classItem) => (
                  <TableRow key={classItem.id}>
                    <TableCell>{classItem.class_code}</TableCell>
                    <TableCell>
                      {classItem.instructor?.full_name || 'Chưa phân công'}
                    </TableCell>
                    <TableCell>{classItem.schedule}</TableCell>
                    <TableCell>
                      {dayjs(classItem.start_date).format('DD/MM/YYYY')} - 
                      {dayjs(classItem.end_date).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>{classItem.room}</TableCell>
                    <TableCell>
                      {classItem.enrollmentCount}/{classItem.capacity}
                    </TableCell>
                    <TableCell align="center">
                      {enrolledClassId === classItem.id ? (
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleUnenroll(classItem.id)}
                        >
                          Hủy đăng ký
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleEnroll(classItem.id)}
                          disabled={
                            classItem.enrollmentCount >= classItem.capacity ||
                            enrolledClassId !== null
                          }
                        >
                          Đăng ký
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
    </>
  );
};

export default ClassSelection; 