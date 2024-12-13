import React, { useEffect, useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  Paper,
  Chip,
  Box,
  Stack,
  Divider,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import { studentService } from '../../services/student.service';
import LoadingSpinner from '../common/LoadingSpinner';
import { EnrolledCourse } from '../../types/enrollment.types';
import { COURSE_TYPE_MAP, CourseType } from '../../types/course.types';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const CourseInfo: React.FC = () => {
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const data = await studentService.getEnrolledCourses();
        setCourses(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: vi });
    } catch {
      return 'Chưa cập nhật';
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Thông tin môn học đã đăng ký
      </Typography>
      {courses.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8,
            backgroundColor: 'grey.50',
            borderRadius: 2,
          }}
        >
          <SchoolIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" align="center" gutterBottom>
            Bạn chưa đăng ký môn học nào
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Vui lòng truy cập mục "Đăng ký môn học" để xem danh sách các môn học có thể đăng ký
          </Typography>
        </Box>
      ) : (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {courses.map((course, index) => (
            <React.Fragment key={course.id}>
              <ListItem
                component={Paper}
                elevation={1}
                sx={{ 
                  mb: 1,
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
              >
                <Box sx={{ width: '100%', mb: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="h6" component="div" sx={{ flex: 1 }}>
                      {course.name}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={course.status}
                        color={course.status === 'Đang học' ? 'success' : 'default'}
                        size="small"
                      />
                      <Chip
                        label={COURSE_TYPE_MAP[course.type as CourseType]}
                        color="primary"
                        size="small"
                      />
                      <Chip
                        label={`${course.credits} tín chỉ`}
                        variant="outlined"
                        size="small"
                      />
                    </Stack>
                  </Stack>
                </Box>

                <Stack spacing={1} sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      Giảng viên: {course.instructor}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EventIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      Lịch học: {course.schedule}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">
                      Thời gian: {formatDate(course.start_date)} - {formatDate(course.end_date)}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    Mã lớp: {course.class_code} | Phòng: {course.room}
                  </Typography>
                </Stack>
              </ListItem>
              {index < courses.length - 1 && <Divider sx={{ my: 1 }} />}
            </React.Fragment>
          ))}
        </List>
      )}
    </>
  );
};

export default CourseInfo;