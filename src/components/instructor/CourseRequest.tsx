import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface CourseRequest {
  id: string;
  courseName: string;
  expectedStudents: number;
  reason: string;
  status: 'Chờ duyệt' | 'Đã duyệt' | 'Từ chối';
  requestDate: string;
  responseDate?: string;
}

const CourseRequest: React.FC = () => {
  const [requests, setRequests] = useState<CourseRequest[]>([
    {
      id: 'REQ001',
      courseName: 'Lập trình Python nâng cao',
      expectedStudents: 30,
      reason: 'Nhu cầu học viên cao',
      status: 'Chờ duyệt',
      requestDate: '2024-03-10',
    },
    {
      id: 'REQ002',
      courseName: 'Machine Learning cơ bản',
      expectedStudents: 25,
      reason: 'Môn học mới, cần thiết cho xu hướng',
      status: 'Đã duyệt',
      requestDate: '2024-03-05',
      responseDate: '2024-03-08',
    },
  ]);

  const [newRequest, setNewRequest] = useState({
    courseName: '',
    expectedStudents: '',
    reason: '',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const request: CourseRequest = {
      id: `REQ${Math.random().toString(36).substr(2, 3)}`,
      courseName: newRequest.courseName,
      expectedStudents: Number(newRequest.expectedStudents),
      reason: newRequest.reason,
      status: 'Chờ duyệt',
      requestDate: new Date().toISOString().split('T')[0],
    };

    setRequests([request, ...requests]);
    setNewRequest({ courseName: '', expectedStudents: '', reason: '' });
    setOpenSnackbar(true);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Yêu cầu mở môn học
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tên môn học"
                required
                value={newRequest.courseName}
                onChange={(e) => setNewRequest({ ...newRequest, courseName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số lượng học viên dự kiến"
                type="number"
                required
                value={newRequest.expectedStudents}
                onChange={(e) => setNewRequest({ ...newRequest, expectedStudents: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Lý do yêu cầu"
                multiline
                rows={4}
                required
                value={newRequest.reason}
                onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Gửi yêu cầu
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã yêu cầu</TableCell>
              <TableCell>Tên môn học</TableCell>
              <TableCell align="center">Số lượng HV</TableCell>
              <TableCell>Lý do</TableCell>
              <TableCell>Ngày yêu cầu</TableCell>
              <TableCell>Ngày phản hồi</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.courseName}</TableCell>
                <TableCell align="center">{request.expectedStudents}</TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell>{request.requestDate}</TableCell>
                <TableCell>{request.responseDate || '-'}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    color={
                      request.status === 'Đã duyệt'
                        ? 'success'
                        : request.status === 'Từ chối'
                        ? 'error'
                        : 'warning'
                    }
                  >
                    {request.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          Yêu cầu mở môn học đã được gửi thành công!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CourseRequest; 