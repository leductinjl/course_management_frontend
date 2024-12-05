import React, { useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';

const ExamSchedule: React.FC = () => {
  const [exams, setExams] = useState([
    {
      id: 1,
      courseCode: 'CS101',
      courseName: 'Tin học văn phòng',
      examDate: '2024-03-20',
      examTime: '18:00 - 19:30',
      room: 'A101',
      type: 'Cuối kỳ',
      status: 'Sắp thi',
      isRegistered: false,
      registrationDeadline: '2024-03-15'
    },
    {
      id: 2,
      courseCode: 'ENG201',
      courseName: 'Tiếng Anh B1',
      examDate: '2024-03-25',
      examTime: '18:00 - 20:00',
      room: 'B203',
      type: 'Giữa kỳ',
      status: 'Sắp thi',
      isRegistered: true,
      registrationDeadline: '2024-03-20'
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedExam, setSelectedExam] = useState<any>(null);

  const handleRegisterExam = (exam: any) => {
    setSelectedExam(exam);
    setOpenDialog(true);
  };

  const handleConfirmRegistration = () => {
    setExams(exams.map(exam => 
      exam.id === selectedExam.id 
        ? { ...exam, isRegistered: !exam.isRegistered }
        : exam
    ));
    setOpenDialog(false);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Lịch thi
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        Vui lòng đăng ký tham gia thi trước thời hạn. Bạn có thể thay đổi quyết định đăng ký cho đến khi hết hạn.
      </Alert>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã môn</TableCell>
              <TableCell>Tên môn học</TableCell>
              <TableCell>Ngày thi</TableCell>
              <TableCell>Giờ thi</TableCell>
              <TableCell>Phòng thi</TableCell>
              <TableCell>Loại thi</TableCell>
              <TableCell>Hạn đăng ký</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Đăng ký thi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>{exam.courseCode}</TableCell>
                <TableCell>{exam.courseName}</TableCell>
                <TableCell>{exam.examDate}</TableCell>
                <TableCell>{exam.examTime}</TableCell>
                <TableCell>{exam.room}</TableCell>
                <TableCell>{exam.type}</TableCell>
                <TableCell>{exam.registrationDeadline}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={exam.status}
                    color="primary"
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant={exam.isRegistered ? "outlined" : "contained"}
                    color={exam.isRegistered ? "error" : "primary"}
                    size="small"
                    onClick={() => handleRegisterExam(exam)}
                  >
                    {exam.isRegistered ? 'Hủy đăng ký' : 'Đăng ký thi'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {selectedExam?.isRegistered ? 'Hủy đăng ký thi' : 'Xác nhận đăng ký thi'}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {selectedExam?.isRegistered 
              ? `Bạn có chắc chắn muốn hủy đăng ký thi môn ${selectedExam?.courseName}?`
              : `Bạn có chắc chắn muốn đăng ký thi môn ${selectedExam?.courseName}?`
            }
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Thời gian thi: {selectedExam?.examDate} {selectedExam?.examTime}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Phòng thi: {selectedExam?.room}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button 
            variant="contained"
            color={selectedExam?.isRegistered ? "error" : "primary"}
            onClick={handleConfirmRegistration}
          >
            {selectedExam?.isRegistered ? 'Xác nhận hủy' : 'Xác nhận đăng ký'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExamSchedule; 