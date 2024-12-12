import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { Class, CLASS_STATUS_MAP } from '../../types/class.types';
import { classService } from '../../services/class.service';
import { useSnackbar } from 'notistack';
import { useDeleteConfirmation } from '../../hooks/useDeleteConfirmation';
import AddClassDialog from './class/AddClassDialog';
import EditClassDialog from './class/EditClassDialog';
import ClassDetailDialog from './class/ClassDetailDialog';
import DeleteConfirmDialog from './common/DeleteConfirmDialog';
import { formatDateTime } from '../../utils/dateUtils';

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

const ClassManagement = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [selectedClassForDetail, setSelectedClassForDetail] = useState<Class | null>(null);
  const [stats, setStats] = useState<any>(null);
  const { enqueueSnackbar } = useSnackbar();

  // Thêm state cho bộ lọc
  const [filter, setFilter] = useState({
    status: '',
    search: '',
    courseId: '',
    instructorId: ''
  });

  const loadClasses = async () => {
    try {
      setLoading(true);
      const data = await classService.listClasses();
      console.log('Loaded classes:', data);
      setClasses(data);
      const summary = await classService.getClassSummary();
      setStats(summary);
    } catch (error) {
      console.error('Error loading classes:', error);
      enqueueSnackbar('Không thể tải danh sách lớp học', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClasses();
  }, []);

  const handleAddClass = async (classData: any) => {
    try {
      await classService.createClass(classData);
      enqueueSnackbar('Thêm lớp học thành công', { variant: 'success' });
      loadClasses();
      setOpenAddDialog(false);
    } catch (error) {
      enqueueSnackbar('Không thể thêm lớp học', { variant: 'error' });
    }
  };

  const handleEditClass = async (classData: any) => {
    try {
      await classService.updateClass(selectedClass!.id, classData);
      enqueueSnackbar('Cập nhật lớp học thành công', { variant: 'success' });
      loadClasses();
      setOpenEditDialog(false);
    } catch (error) {
      enqueueSnackbar('Không thể cập nhật lớp học', { variant: 'error' });
    }
  };

  const { dialogProps, handleOpen: openDelete } = useDeleteConfirmation<Class>({
    onDelete: async (classData) => {
      try {
        await classService.deleteClass(classData.id);
        setClasses(classes.filter(c => c.id !== classData.id));
        enqueueSnackbar('Xóa lớp học thành công', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar('Không thể xóa lớp học', { variant: 'error' });
      }
    },
    getMessage: (classData) => `Bạn có chắc chắn muốn xóa lớp học ${classData.classCode}?`,
    getTitle: () => 'Xác nhận xóa lớp học'
  });

  const openEdit = (classData: Class) => {
    setSelectedClass(classData);
    setOpenEditDialog(true);
    setSelectedClassForDetail(null);
  };

  const handleRowClick = (event: React.MouseEvent, classData: Class) => {
    if ((event.target as HTMLElement).closest('.action-buttons')) {
      return;
    }
    setSelectedClassForDetail(classData);
  };

  const handleDelete = (classData: Class) => {
    openDelete(classData);
    setSelectedClassForDetail(null);
  };

  // Lọc danh sách lớp học
  const filteredClasses = classes.filter(classData => {
    return (
      (filter.status === '' || classData.status === filter.status) &&
      (filter.search === '' || 
        classData.classCode.toLowerCase().includes(filter.search.toLowerCase()) ||
        classData.Course?.name.toLowerCase().includes(filter.search.toLowerCase()) ||
        classData.Instructor?.fullName.toLowerCase().includes(filter.search.toLowerCase())
      )
    );
  });

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Quản lý lớp học</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
        >
          Thêm lớp học
        </Button>
      </Box>

      {/* Bộ lọc */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="small"
              label="Tìm kiếm"
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={filter.status}
                label="Trạng thái"
                onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value="upcoming">Sắp diễn ra</MenuItem>
                <MenuItem value="ongoing">Đang diễn ra</MenuItem>
                <MenuItem value="completed">Đã kết thúc</MenuItem>
                <MenuItem value="cancelled">Đã hủy</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã lớp</TableCell>
                <TableCell>Môn học</TableCell>
                <TableCell>Giảng viên</TableCell>
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
                  <TableCell>{classData.classCode}</TableCell>
                  <TableCell>
                    {classData.Course ? (
                      `${classData.Course.name} (${classData.Course.code})`
                    ) : (
                      <span style={{color: 'red'}}>
                        {`Debug: courseId=${classData.courseId}`}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {classData.Instructor ? (
                      classData.Instructor.fullName
                    ) : (
                      <span style={{color: 'red'}}>
                        {`Debug: instructorId=${classData.instructorId}`}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {formatDateTime(classData.startDate)} - {formatDateTime(classData.endDate)}
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
                        openEdit(classData);
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
        )}
      </TableContainer>

      <AddClassDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={handleAddClass}
      />

      {selectedClass && (
        <EditClassDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          onSubmit={handleEditClass}
          classData={selectedClass}
        />
      )}

      {selectedClassForDetail && (
        <ClassDetailDialog
          open={!!selectedClassForDetail}
          onClose={() => setSelectedClassForDetail(null)}
          classData={selectedClassForDetail}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      )}

      <DeleteConfirmDialog {...dialogProps} />
    </Box>
  );
};

export default ClassManagement;