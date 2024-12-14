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
import { Class, CLASS_STATUS_MAP, CreateClassDTO } from '../../types/class.types';
import { classService } from '../../services/class.service';
import AddClassDialog from './class/AddClassDialog';
import EditClassDialog from './class/EditClassDialog';
import ClassDetailDialog from './class/ClassDetailDialog';
import { useDeleteConfirmation } from '../../hooks/useDeleteConfirmation';
import { useSnackbar } from 'notistack';
import { formatDateTime } from '../../utils/dateUtils';

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

  const handleDelete = (classData: Class) => {
    deleteConfirmation.handleOpen(classData);
    setOpenDetail(false);
  };

  const deleteConfirmation = useDeleteConfirmation<Class>({
    onDelete: async (classData) => {
      try {
        await classService.deleteClass(classData.id);
        enqueueSnackbar('Xóa lớp học thành công', { variant: 'success' });
        fetchClasses();
      } catch (error) {
        enqueueSnackbar('Không thể xóa lớp học', { variant: 'error' });
      }
    },
    getMessage: (classData) => `Bạn có chắc chắn muốn xóa lớp học ${classData.class_code}?`,
    getTitle: () => 'Xác nhận xóa',
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

  const handleSubmitEdit = async (classData: Partial<Class>) => {
    if (!selectedClass) return;
    try {
      await classService.updateClass(selectedClass.id, classData);
      enqueueSnackbar('Cập nhật lớp học thành công', { variant: 'success' });
      setOpenForm(false);
      fetchClasses();
    } catch (error) {
      enqueueSnackbar('Không thể cập nhật lớp học', { variant: 'error' });
    }
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
                        handleDelete(classData);
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

      {openForm && editMode && selectedClass && (
        <EditClassDialog
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSubmit={handleSubmitEdit}
          classData={selectedClass}
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

export default ClassManagement;