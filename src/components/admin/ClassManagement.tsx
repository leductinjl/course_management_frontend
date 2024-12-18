import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { Class, CLASS_STATUS_MAP, CreateClassDTO, UpdateClassDTO } from '../../types/class.types';
import { classService } from '../../services/class.service';
import AddClassDialog from './class/AddClassDialog';
import EditClassDialog from './class/EditClassDialog';
import ClassDetailDialog from './class/ClassDetailDialog';
import { useDeleteConfirmation } from '../../hooks/useDeleteConfirmation';
import { useSnackbar, VariantType } from 'notistack';
import { formatDateTime } from '../../utils/dateUtils';
import { showNotification, ERROR_MESSAGES } from '../../utils/notificationHelper';

const ClassManagement: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await classService.listClasses();
      setClasses(data);
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi tải danh sách lớp học');
      enqueueSnackbar('Không thể tải danh sách lớp học', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const filteredClasses = classes.filter((classItem) =>
    classItem.class_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classItem.Course?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classItem.Course?.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classItem.Instructor?.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (event: React.MouseEvent, classData: Class) => {
    setSelectedClass(classData);
    setOpenDetail(true);
  };

  const handleAdd = () => {
    setEditMode(false);
    setSelectedClass(null);
    setOpenForm(true);
  };

  const handleEdit = (classData: Class) => {
    setEditMode(true);
    setSelectedClass(classData);
    setOpenForm(true);
    setOpenDetail(false);
  };

  const handleDelete = async (classData: Class) => {
    try {
      await classService.deleteClass(classData.id);
      showNotification(enqueueSnackbar, {
        message: 'Xóa lớp học thành công',
        variant: 'success'
      });
      fetchClasses();
    } catch (error: any) {
      console.log('Delete error:', error.response);
      
      let message = ERROR_MESSAGES.NETWORK_ERROR;
      let variant: VariantType = 'error';

      if (error.response?.data) {
        const { status, data } = error.response;
        
        if (status === 404) {
          message = ERROR_MESSAGES.CLASS_NOT_FOUND;
        } else if (status === 409) {
          variant = 'warning';
          
          // Xử lý các trường hợp cụ thể
          if (data.details?.table === 'enrollments') {
            message = ERROR_MESSAGES.CLASS_HAS_ENROLLMENTS;
          } else if (data.details?.table === 'lessons') {
            message = ERROR_MESSAGES.CLASS_HAS_LESSONS;
          } else if (data.message.includes('đã bắt đầu')) {
            message = ERROR_MESSAGES.CLASS_ALREADY_STARTED;
          } else {
            message = data.message || ERROR_MESSAGES.CLASS_DELETE_ERROR;
          }
        } else {
          message = data.message || ERROR_MESSAGES.NETWORK_ERROR;
        }
      }

      showNotification(enqueueSnackbar, { message, variant });
    }
  };

  const { dialogProps, handleOpen: openDelete } = useDeleteConfirmation<Class>({
    onDelete: handleDelete,
    getMessage: (classData) => (
      <>
        <Typography>
          Bạn có chắc chắn muốn xóa lớp học "{classData.class_code}" không?
        </Typography>
        <Typography 
          variant="caption" 
          color="warning.main" 
          sx={{ display: 'block', mt: 1 }}
        >
          Lưu ý: 
          <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
            <li>Không thể xóa lớp học đã bắt đầu hoặc đã kết thúc</li>
            <li>Không thể xóa lớp học đã có học viên đăng ký</li>
            <li>Hành động này không thể hoàn tác</li>
          </ul>
        </Typography>
      </>
    ),
    getTitle: () => "Xác nhận xóa lớp học"
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'info';
      case 'ongoing':
        return 'success';
      case 'completed':
        return 'secondary';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleSubmitAdd = async (classData: CreateClassDTO) => {
    try {
      await classService.createClass(classData);
      enqueueSnackbar('Thêm lớp học thành công', { variant: 'success' });
      setOpenForm(false);
      fetchClasses();
    } catch (error) {
      enqueueSnackbar('Không thể thêm lớp học', { variant: 'error' });
    }
  };

  const handleSubmitEdit = async (data: UpdateClassDTO) => {
    try {
      if (!selectedClass) return;
      
      // Kiểm tra trạng thái lớp học trước khi cập nhật
      if (selectedClass.status !== 'upcoming') {
        showNotification(enqueueSnackbar, {
          message: ERROR_MESSAGES.CLASS_UPDATE_NOT_ALLOWED,
          variant: 'warning'
        });
        setOpenForm(false);
        return;
      }

      await classService.updateClass(selectedClass.id, data);
      showNotification(enqueueSnackbar, {
        message: 'Cập nhật lớp học thành công',
        variant: 'success'
      });
      setOpenForm(false);
      fetchClasses();
    } catch (error: any) {
      console.log('Update error:', error.response);
      
      let message = ERROR_MESSAGES.NETWORK_ERROR;
      let variant: VariantType = 'error';

      if (error.response?.data) {
        const { status, data } = error.response;
        
        if (status === 404) {
          message = ERROR_MESSAGES.CLASS_NOT_FOUND;
        } else if (status === 409) {
          variant = 'warning';
          if (data.message.includes('chưa bắt đầu')) {
            message = ERROR_MESSAGES.CLASS_UPDATE_NOT_ALLOWED;
          } else {
            message = data.message || ERROR_MESSAGES.CLASS_UPDATE_ERROR;
          }
        } else {
          message = data.message || ERROR_MESSAGES.CLASS_UPDATE_ERROR;
        }
      }

      showNotification(enqueueSnackbar, { message, variant });
    }
  };

  const renderEditDialog = () => {
    if (!selectedClass) return null;
    
    return (
      <EditClassDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmitEdit}
        classData={selectedClass}
        // @ts-ignore
        disabled={selectedClass.status !== 'upcoming'}
        // @ts-ignore
        statusMessage={
          selectedClass.status !== 'upcoming' 
            ? 'Không thể cập nhật lớp học đang diễn ra hoặc đã kết thúc'
            : undefined
        }
      />
    );
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Quản lý lớp học</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Thêm lớp học
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Tìm kiếm theo mã lớp, tên môn học, mã môn học hoặc tên giảng viên"
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

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ p: 3, textAlign: 'center', color: 'error.main' }}>
          <Typography>{error}</Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã lớp</TableCell>
                <TableCell>Môn học</TableCell>
                <TableCell>Giảng viên</TableCell>
                <TableCell>Lịch học</TableCell>
                <TableCell>Phòng</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClasses.map((classData) => (
                <TableRow 
                  key={classData.id}
                  hover
                  onClick={(e) => handleRowClick(e, classData)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>{classData.class_code}</TableCell>
                  <TableCell>
                    {classData.Course?.name} ({classData.Course?.code})
                  </TableCell>
                  <TableCell>{classData.Instructor?.full_name}</TableCell>
                  <TableCell>{classData.schedule}</TableCell>
                  <TableCell>{classData.room}</TableCell>
                  <TableCell>
                    {formatDateTime(classData.start_date)} - {formatDateTime(classData.end_date)}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={CLASS_STATUS_MAP[classData.status]} 
                      color={getStatusColor(classData.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right" className="action-buttons">
                    <IconButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(classData);
                      }}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={(e) => {
                        e.stopPropagation();
                        openDelete(classData);
                      }}
                      size="small" 
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {selectedClass && (
        <ClassDetailDialog
          open={openDetail}
          onClose={() => setOpenDetail(false)}
          classData={selectedClass}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {openForm && !editMode && (
        <AddClassDialog
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSubmit={handleSubmitAdd}
        />
      )}

      {renderEditDialog()}

      <Dialog
        open={dialogProps.open}
        onClose={dialogProps.onClose}
      >
        <DialogTitle>{dialogProps.title}</DialogTitle>
        <DialogContent>
          <Typography>
            {dialogProps.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogProps.onClose}>Hủy</Button>
          <Button
            onClick={dialogProps.onConfirm}
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

export default ClassManagement;