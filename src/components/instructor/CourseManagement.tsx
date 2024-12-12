import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Chip,
  Collapse,
  CircularProgress,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { instructorService } from '../../services/instructor.service';
import { useSnackbar } from 'notistack';
import { Course } from '../../types/course.types';
import { Class } from '../../types/class.types';

interface CourseWithClasses extends Course {
  classes: Class[];
}

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<CourseWithClasses[]>([]);
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await instructorService.getInstructorCourses();
      console.log('API Response:', data);
      
      if (data && Array.isArray(data)) {
        setCourses(data);
      } else {
        console.error('Invalid response format:', data);
        setCourses([]);
        enqueueSnackbar('Không thể tải danh sách môn học', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      enqueueSnackbar('Đã xảy ra lỗi khi tải danh sách môn học', { variant: 'error' });
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExpandCourse = (courseId: string) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Danh sách môn học giảng dạy
      </Typography>

      {courses && courses.length > 0 ? (
        <List component={Paper}>
          {courses.map((course, index) => (
            <React.Fragment key={course.id}>
              {index > 0 && <Divider />}
              <ListItem>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">
                      {course.name} ({course.code})
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Số tín chỉ: {course.credits}
                      </Typography>
                      {course.description && (
                        <Typography variant="body2" color="text.secondary">
                          Mô tả: {course.description}
                        </Typography>
                      )}
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton 
                    onClick={() => handleExpandCourse(course.id)}
                    edge="end"
                  >
                    {expandedCourse === course.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>

              <Collapse in={expandedCourse === course.id}>
                <Box sx={{ p: 2, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Danh sách lớp học:
                  </Typography>
                  {course.classes && course.classes.length > 0 ? (
                    <List>
                      {course.classes.map((classItem: Class) => (
                        <ListItem key={classItem.id}>
                          <ListItemText
                            primary={`Lớp ${classItem.classCode}`}
                            secondary={
                              <>
                                <Typography variant="body2">
                                  Lịch học: {classItem.schedule}
                                </Typography>
                                <Typography variant="body2">
                                  Phòng: {classItem.room}
                                </Typography>
                              </>
                            }
                          />
                          <Chip
                            label={classItem.status}
                            color={
                              classItem.status === 'ongoing' 
                                ? 'success' 
                                : classItem.status === 'upcoming' 
                                  ? 'warning' 
                                  : 'default'
                            }
                            size="small"
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Chưa có lớp học nào
                    </Typography>
                  )}
                </Box>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
          Chưa có môn học nào được phân công
        </Typography>
      )}
    </Box>
  );
};

export default CourseManagement; 