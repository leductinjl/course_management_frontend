import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Chip,
  IconButton,
  Box,
  Divider,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import { Class, CLASS_STATUS_MAP } from '../../../types/class.types';
import { formatDateTime } from '../../../utils/dateUtils';
import { adminGradeService } from '../../../services/admin.grade.service';
import { classService } from '../../../services/class.service';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface ClassDetailDialogProps {
  open: boolean;
  onClose: () => void;
  classData: Class;
  onEdit: (classData: Class) => void;
  onDelete: (classData: Class) => void;
}

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

const ClassDetailDialog: React.FC<ClassDetailDialogProps> = ({
  open,
  onClose,
  classData,
  onEdit,
  onDelete,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [grades, setGrades] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && classData) {
      fetchClassDetails();
    }
  }, [open, classData]);

  const fetchClassDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const [gradesData, studentsData, lessonsData] = await Promise.all([
        adminGradeService.getClassGrades(classData.id),
        classService.getClassStudents(classData.id),
        classService.getClassLessons(classData.id)
      ]);

      console.log('Grades data:', gradesData);
      console.log('Students data:', studentsData);
      console.log('Lessons data:', lessonsData);

      setGrades(gradesData || []);
      setStudents(studentsData || []);
      setLessons(lessonsData || []);
    } catch (error: any) {
      console.error('Error fetching class details:', error);
      setError(error.message || 'Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleVerifyGrades = async () => {
    try {
      const gradeIds = grades
        .filter(grade => 
          grade.enrollment_status === 'enrolled' && 
          grade.grade_status !== 'verified'
        )
        .map(grade => grade.id);

      if (gradeIds.length === 0) {
        return;
      }

      await adminGradeService.verifyBulkGrades(gradeIds, 'Xác thực điểm từ chi tiết lớp học');
      await fetchClassDetails();
    } catch (error: any) {
      console.error('Error verifying grades:', error);
      // Hiển thị thông báo lỗi nếu cần
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            Chi tiết lớp học: {classData?.class_code}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {/* Basic Info Section */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Thông tin cơ bản
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Mã lớp học
            </Typography>
            <Typography variant="body1">{classData.class_code}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Trạng thái
            </Typography>
            <Chip
              label={CLASS_STATUS_MAP[classData.status]}
              color={getStatusColor(classData.status)}
              size="small"
            />
          </Grid>

          {/* Thông tin môn học */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Môn học
            </Typography>
            <Typography variant="body1">
              {classData?.Course?.name} ({classData?.Course?.code})
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Giảng viên
            </Typography>
            <Typography variant="body1">
              {classData?.Instructor?.full_name}
            </Typography>
          </Grid>

          {/* Thời gian và địa điểm */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Thời gian học
            </Typography>
            <Typography variant="body1">{classData.schedule}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Phòng học
            </Typography>
            <Typography variant="body1">{classData.room}</Typography>
          </Grid>

          {/* Thống kê */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Thống kê
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="textSecondary">
              Số lượng học viên
            </Typography>
            <Typography variant="body1">
            {students?.filter(s => s.status === 'enrolled').length || 0} / {classData.capacity || 'Không giới hạn'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="textSecondary">
              Tiến độ bài học
            </Typography>
            <Typography variant="body1">
              {classData.stats?.completedLessons || 0}/{classData.stats?.totalLessons || 0}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" color="textSecondary">
              Số thông báo
            </Typography>
            <Typography variant="body1">
              {classData.stats?.announcementCount || 0}
            </Typography>
          </Grid>

          {/* Thông tin quản lý */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Thông tin quản lý
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Người tạo
            </Typography>
            <Typography variant="body1">
              {classData.creator?.full_name || 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Ngày tạo
            </Typography>
            <Typography variant="body1">
              {formatDateTime(classData.created_at)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textSecondary">
              Cập nhật lần cuối
            </Typography>
            <Typography variant="body1">
              {formatDateTime(classData.updated_at)}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab icon={<SchoolIcon />} label="Điểm số" />
            <Tab icon={<PeopleIcon />} label="Học viên" />
            <Tab icon={<AssignmentIcon />} label="Bài học" />
          </Tabs>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ p: 3, textAlign: 'center', color: 'error.main' }}>
            <Typography>{error}</Typography>
          </Box>
        ) : (
          <>
            <TabPanel value={tabValue} index={0}>
              {grades && grades.length > 0 ? (
                <>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>MSSV</TableCell>
                          <TableCell>Họ và tên</TableCell>
                          <TableCell align="center">Chuyên cần</TableCell>
                          <TableCell align="center">Giữa kỳ</TableCell>
                          <TableCell align="center">Cuối kỳ</TableCell>
                          <TableCell align="center">Tổng kết</TableCell>
                          <TableCell align="center">Trạng thái</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {grades.map((grade) => (
                          <TableRow key={grade.enrollment_id}>
                            <TableCell>-</TableCell>
                            <TableCell>{grade.full_name}</TableCell>
                            <TableCell align="center">
                              {grade.attendance_score !== null ? grade.attendance_score : '-'}
                            </TableCell>
                            <TableCell align="center">
                              {grade.midterm_score !== null ? grade.midterm_score : '-'}
                            </TableCell>
                            <TableCell align="center">
                              {grade.final_score !== null ? grade.final_score : '-'}
                            </TableCell>
                            <TableCell align="center">
                              {grade.total_score !== null ? grade.total_score : '-'}
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={grade.grade_status === 'verified' ? 'Đã xác thực' : 'Chưa xác thực'}
                                color={grade.grade_status === 'verified' ? 'success' : 'warning'}
                                size="small"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      startIcon={<VerifiedIcon />}
                      onClick={handleVerifyGrades}
                      disabled={!grades.some(grade => grade.grade_status !== 'verified')}
                    >
                      Xác thực điểm
                    </Button>
                  </Box>
                </>
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography>Chưa có dữ liệu điểm</Typography>
                </Box>
              )}
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              {students && students.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>MSSV</TableCell>
                        <TableCell>Họ và tên</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Số điện thoại</TableCell>
                        <TableCell>Ngày đăng ký</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.enrollment_id}>
                          <TableCell>-</TableCell>
                          <TableCell>{student.full_name}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.phone}</TableCell>
                          <TableCell>{formatDateTime(student.enrollment_date)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography>Chưa có học viên đăng ký</Typography>
                </Box>
              )}
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              {lessons.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Tiêu đề</TableCell>
                        <TableCell>Mô tả</TableCell>
                        <TableCell>Trạng thái</TableCell>
                        <TableCell>Ngày hoàn thành</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {lessons.map((lesson, index) => (
                        <TableRow key={lesson.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{lesson.title}</TableCell>
                          <TableCell>{lesson.description}</TableCell>
                          <TableCell>
                            <Chip
                              label={lesson.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                              color={lesson.completed ? 'success' : 'warning'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            {lesson.completion_date ? formatDateTime(lesson.completion_date) : '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography>Chưa có bài học nào</Typography>
                </Box>
              )}
            </TabPanel>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => onEdit(classData)} startIcon={<EditIcon />}>
          Chỉnh sửa
        </Button>
        <Button
          onClick={() => onDelete(classData)}
          color="error"
          startIcon={<DeleteIcon />}
        >
          Xóa
        </Button>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassDetailDialog; 