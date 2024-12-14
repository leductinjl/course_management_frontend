import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import AddCourseDialog from './course/AddCourseDialog';
import EditCourseDialog from './course/EditCourseDialog';
import DeleteConfirmDialog from './common/DeleteConfirmDialog';
import { useDeleteConfirmation } from '../../hooks/useDeleteConfirmation';
import { courseService } from '../../services/course.service';
import { 
  Course, 
  CourseStatus, 
  COURSE_STATUS_MAP, 
  COURSE_STATUS_COLORS, 
  CourseFilter 
} from '../../types/course.types';
import { useSnackbar } from 'notistack';
import CourseDetailDialog from './course/CourseDetailDialog';

const CourseManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<Course | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const [filter, setFilter] = useState<CourseFilter>({
    status: undefined,
    type: undefined,
    search: '',
  });

  const loadCourses = async () => {
    try {
      setLoading(true);
      const response = await courseService.listCourses();
      if (Array.isArray(response)) {
        setCourses(response);
      } else {
        console.error('Invalid response format:', response);
        setCourses([]);
      }
    } catch (error) {
      console.error('Error loading courses:', error);
      enqueueSnackbar('Không thể tải danh sách khóa học', { variant: 'error' });
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleAddCourse = async (courseData: any) => {
    try {
      await courseService.createCourse(courseData);
      enqueueSnackbar('Thêm khóa học thành công', { variant: 'success' });
      loadCourses();
      setOpenAddDialog(false);
    } catch (error) {
      enqueueSnackbar('Không thể thêm khóa học', { variant: 'error' });
    }
  };

  const handleEditCourse = async (courseData: any) => {
    try {
      await courseService.updateCourse(selectedCourse!.id, courseData);
      enqueueSnackbar('Cập nhật khóa học thành công', { variant: 'success' });
      loadCourses();
      setOpenEditDialog(false);
    } catch (error) {
      enqueueSnackbar('Không thể cập nhật khóa học', { variant: 'error' });
    }
  };

  const handleDeleteCourse = async (course: Course) => {
    try {
      await courseService.deleteCourse(course.id);
      enqueueSnackbar('Xóa khóa học thành công', { variant: 'success' });
      loadCourses();
    } catch (error) {
      enqueueSnackbar('Không thể xóa khóa học', { variant: 'error' });
    }
  };

  const { dialogProps, handleOpen: openDelete } = useDeleteConfirmation({
    onDelete: handleDeleteCourse,
    getMessage: (course) => `Bạn có chắc chắn muốn xóa môn học "${course.name}" không?`,
    getTitle: () => "Xóa môn học"
  });

  const openEdit = (course: Course) => {
    setSelectedCourse(course);
    setOpenEditDialog(true);
  };

  const filteredCourses = useMemo(() => {
    if (!Array.isArray(courses)) return [];
    
    return courses.filter(course => {
      if (!course) return false;
      
      const matchStatus = !filter.status || course.status === filter.status;
      const matchType = !filter.type || course.type === filter.type;
      
      if (!matchStatus || !matchType) return false;
      
      if (filter.search) {
        const searchTerm = filter.search.toLowerCase();
        return (
          (course.code || '').toLowerCase().includes(searchTerm) ||
          (course.name || '').toLowerCase().includes(searchTerm) ||
          (course.description || '').toLowerCase().includes(searchTerm)
        );
      }
      return true;
    });
  }, [courses, filter]);

  const handleRowClick = (event: React.MouseEvent, course: Course) => {
    if ((event.target as HTMLElement).closest('.action-buttons')) {
      return;
    }
    setSelectedCourseForDetail(course);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const coursesToRender = Array.isArray(filteredCourses) ? filteredCourses : [];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Quản lý môn học</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
        >
          Thêm môn học
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Tìm kiếm"
              variant="outlined"
              size="small"
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={filter.status || ''}
                label="Trạng thái"
                onChange={(e) => setFilter({ ...filter, status: e.target.value as CourseStatus || undefined })}
              >
                <MenuItem value="">Tất cả</MenuItem>
                {Object.entries(COURSE_STATUS_MAP).map(([key, value]) => (
                  <MenuItem key={key} value={key}>{value}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Loại môn học</InputLabel>
              <Select
                value={filter.type || ''}
                label="Loại môn học"
                onChange={(e) => setFilter({ ...filter, type: e.target.value || undefined })}
              >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value="basic">Cơ bản</MenuItem>
                <MenuItem value="advanced">Nâng cao</MenuItem>
                <MenuItem value="specialized">Chuyên ngành</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {coursesToRender.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã môn học</TableCell>
                <TableCell>Tên môn học</TableCell>
                <TableCell>Số tín chỉ</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coursesToRender.map((course) => (
                <TableRow 
                  key={course.id}
                  hover
                  onClick={(e) => handleRowClick(e, course)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>{course.code}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>{course.credits}</TableCell>
                  <TableCell>
                    {course.type === 'basic' && 'Cơ bản'}
                    {course.type === 'advanced' && 'Nâng cao'}
                    {course.type === 'specialized' && 'Chuyên ngành'}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={COURSE_STATUS_MAP[course.status]} 
                      color={COURSE_STATUS_COLORS[course.status]}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right" className="action-buttons">
                    <IconButton 
                      color="primary" 
                      onClick={() => openEdit(course)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      color="error" 
                      onClick={() => openDelete(course)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
          Không có khóa học nào
        </Typography>
      )}

      <AddCourseDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={handleAddCourse}
      />

      {selectedCourse && (
        <EditCourseDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          onSubmit={handleEditCourse}
          courseData={selectedCourse}
        />
      )}

      <DeleteConfirmDialog {...dialogProps} />

      {selectedCourseForDetail && (
        <CourseDetailDialog
          open={!!selectedCourseForDetail}
          onClose={() => setSelectedCourseForDetail(null)}
          course={selectedCourseForDetail}
        />
      )}
    </Box>
  );
};

export default CourseManagement; 