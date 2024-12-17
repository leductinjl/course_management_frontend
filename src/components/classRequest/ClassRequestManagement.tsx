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
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ClassRequest } from '../../types/classRequest.types';
import { classRequestService } from '../../services/classRequest.service';
import { useDeleteConfirmation } from '../../hooks/useDeleteConfirmation';
import ClassRequestDetailDialog from '../classRequest/ClassRequestDetailDialog';
import ReviewClassRequestDialog from '../classRequest/ReviewClassRequestDialog';
import { classService } from '../../services/class.service';
import { CreateClassDTO } from '../../types/class.types';

const ClassRequestManagement: React.FC = () => {
  const [requests, setRequests] = useState<ClassRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<ClassRequest | null>(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await classRequestService.getAllRequests();
      setRequests(data as ClassRequest[]);
    } catch (error: any) {
      enqueueSnackbar(error.message || 'Không thể tải danh sách yêu cầu', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (request: ClassRequest) => {
    setSelectedRequest(request);
    setOpenDetail(true);
  };

  const handleReview = (request: ClassRequest) => {
    setSelectedRequest(request);
    setOpenReview(true);
    setOpenDetail(false);
  };

  const handleApprove = async (request: ClassRequest, notes: string, classData: CreateClassDTO) => {
    try {
      await classService.createClass(classData);

      await classRequestService.reviewRequest(request.id, {
        status: 'approved',
        admin_notes: notes,
      });

      enqueueSnackbar('Đã tạo lớp và phê duyệt yêu cầu thành công', { variant: 'success' });
      fetchRequests();
    } catch (error: any) {
      enqueueSnackbar(error.message || 'Không thể tạo lớp hoặc phê duyệt yêu cầu', { variant: 'error' });
      throw error;
    }
  };

  const handleReject = async (request: ClassRequest, notes: string) => {
    try {
      await classRequestService.reviewRequest(request.id, {
        status: 'rejected',
        admin_notes: notes,
      });
      enqueueSnackbar('Đã từ chối yêu cầu mở lớp', { variant: 'success' });
      fetchRequests();
      setOpenReview(false);
    } catch (error: any) {
      enqueueSnackbar(error.message || 'Không thể từ chối yêu cầu', { variant: 'error' });
    }
  };

  const deleteConfirmation = useDeleteConfirmation<ClassRequest>({
    onDelete: async (request) => {
      try {
        await classRequestService.deleteRequest(request.id);
        enqueueSnackbar('Xóa yêu cầu thành công', { variant: 'success' });
        fetchRequests();
      } catch (error: any) {
        enqueueSnackbar(error.message || 'Không thể xóa yêu cầu', { variant: 'error' });
      }
    },
    getMessage: (request) => `Bạn có chắc chắn muốn xóa yêu cầu mở lớp của giảng viên ${request.instructor.full_name}?`,
    getTitle: () => 'Xác nhận xóa',
  });

  const filteredRequests = requests.filter((request) =>
    request.course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.instructor.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusChip = (status: string) => {
    const statusConfig: Record<string, { label: string; color: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" }> = {
      pending: { label: 'Chờ duyệt', color: 'warning' },
      approved: { label: 'Đã duyệt', color: 'success' },
      rejected: { label: 'Từ chối', color: 'error' },
    };

    const config = statusConfig[status] || { label: status, color: 'default' };
    return <Chip label={config.label} color={config.color} size="small" />;
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Quản lý yêu cầu mở lớp
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Tìm kiếm theo tên môn học, mã môn học hoặc tên giảng viên"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Môn học</TableCell>
              <TableCell>Giảng viên</TableCell>
              <TableCell>Số lượng SV</TableCell>
              <TableCell>Ngày bắt đầu</TableCell>
              <TableCell>Ghi chú lịch học</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow
                key={request.id}
                hover
                onClick={() => handleRowClick(request)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  {request.course.name} ({request.course.code})
                </TableCell>
                <TableCell>{request.instructor.full_name}</TableCell>
                <TableCell>{request.expected_students}</TableCell>
                <TableCell>
                  {format(new Date(request.desired_start_date), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell>{request.schedule_note}</TableCell>
                <TableCell>{getStatusChip(request.status)}</TableCell>
                <TableCell align="right">
                  {request.status === 'pending' && (
                    <>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReview(request);
                        }}
                        color="primary"
                      >
                        <ApproveIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteConfirmation.handleOpen(request);
                        }}
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

      {selectedRequest && (
        <ClassRequestDetailDialog
          open={openDetail}
          onClose={() => setOpenDetail(false)}
          request={selectedRequest}
          onReview={handleReview}
          onDelete={(request) => {
            deleteConfirmation.handleOpen(request);
            setOpenDetail(false);
          }}
        />
      )}

      {selectedRequest && (
        <ReviewClassRequestDialog
          open={openReview}
          onClose={() => setOpenReview(false)}
          request={selectedRequest}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}

      <Dialog
        open={deleteConfirmation.open}
        onClose={deleteConfirmation.dialogProps.onClose}
      >
        <DialogTitle>{deleteConfirmation.dialogProps.title}</DialogTitle>
        <DialogContent>
          <Typography>{deleteConfirmation.dialogProps.content}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteConfirmation.dialogProps.onClose}>Hủy</Button>
          <Button
            onClick={deleteConfirmation.dialogProps.onConfirm}
            color="error"
            variant="contained"
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClassRequestManagement;