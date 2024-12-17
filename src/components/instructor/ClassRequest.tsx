import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Alert,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { courseService } from '../../services/course.service';
import { classRequestService, ClassRequest as IClassRequest, CreateClassRequestDTO } from '../../services/classRequest.service';
import { Course } from '../../types/course.types';
import ClassRequestForm from './ClassRequestForm';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useDeleteConfirmation } from '../../hooks/useDeleteConfirmation';

const ClassRequestComponent: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [requests, setRequests] = useState<IClassRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<IClassRequest | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const { dialogProps, handleOpen: handleOpenDelete } = useDeleteConfirmation<IClassRequest>({
    onDelete: async (request) => {
      try {
        await classRequestService.deleteRequest(request.id);
        showSnackbar('Xóa yêu cầu thành công', 'success');
        await loadData();
      } catch (error: any) {
        showSnackbar(error.message || 'Không thể xóa yêu cầu', 'error');
      }
    },
    getMessage: () => 'Bạn có chắc chắn muốn xóa yêu cầu này?',
    getTitle: () => 'Xác nhận xóa',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [coursesData, requestsData] = await Promise.all([
        courseService.getAvailableCoursesForInstructor(),
        classRequestService.getMyRequests()
      ]);
      setCourses(coursesData);
      setRequests(requestsData);
    } catch (error) {
      showSnackbar('Không thể tải dữ liệu', 'error');
    }
  };

  const handleSubmit = async (values: CreateClassRequestDTO) => {
    try {
      setLoading(true);
      if (selectedRequest) {
        await classRequestService.updateRequest(selectedRequest.id, values);
        showSnackbar('Cập nhật yêu cầu thành công', 'success');
      } else {
        await classRequestService.createRequest(values);
        showSnackbar('Tạo yêu cầu thành công', 'success');
      }
      await loadData();
      handleCloseForm();
    } catch (error: any) {
      showSnackbar(error.message || 'Có lỗi xảy ra', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (request: IClassRequest) => {
    const formValues: CreateClassRequestDTO = {
      course_id: request.course.id,
      expected_students: request.expected_students,
      desired_start_date: request.desired_start_date,
      schedule_note: request.schedule_note,
      reason: request.reason,
    };
    setSelectedRequest({ ...request, ...formValues });
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setSelectedRequest(null);
    setOpenForm(false);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'warning';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Đã duyệt';
      case 'rejected': return 'Từ chối';
      default: return 'Chờ duyệt';
    }
  };

  const ConfirmDialog = () => (
    <Dialog
      open={dialogProps.open}
      onClose={dialogProps.onClose}
    >
      <DialogTitle>{dialogProps.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {dialogProps.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogProps.onClose}>Hủy</Button>
        <Button onClick={dialogProps.onConfirm} color="error" autoFocus>
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box>
      <Grid container justifyContent="space-between" alignItems="center" mb={3}>
        <Grid item>
          <Typography variant="h6">Yêu cầu mở lớp</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenForm(true)}
          >
            Tạo yêu cầu mới
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Môn học</TableCell>
              <TableCell align="center">Số lượng HV</TableCell>
              <TableCell>Ngày bắt đầu</TableCell>
              <TableCell>Ghi chú lịch học</TableCell>
              <TableCell>Lý do</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.course.name}</TableCell>
                <TableCell align="center">{request.expected_students}</TableCell>
                <TableCell>
                  {format(new Date(request.desired_start_date), 'dd/MM/yyyy', { locale: vi })}
                </TableCell>
                <TableCell>{request.schedule_note}</TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    color={getStatusColor(request.status)}
                  >
                    {getStatusText(request.status)}
                  </Button>
                </TableCell>
                <TableCell align="center">
                  {request.status === 'pending' && (
                    <>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(request)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDelete(request)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ClassRequestForm
        open={openForm}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        initialValues={selectedRequest ? {
          course_id: selectedRequest.course.id,
          expected_students: selectedRequest.expected_students,
          desired_start_date: selectedRequest.desired_start_date,
          schedule_note: selectedRequest.schedule_note,
          reason: selectedRequest.reason,
        } : undefined}
        courses={courses}
        title={selectedRequest ? 'Cập nhật yêu cầu' : 'Tạo yêu cầu mới'}
      />

      <ConfirmDialog />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClassRequestComponent; 