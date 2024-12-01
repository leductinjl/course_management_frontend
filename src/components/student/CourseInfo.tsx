import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Box,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';

const CourseInfo: React.FC = () => {
  const courses = [
    {
      id: 1,
      name: 'Tin học văn phòng',
      instructor: 'Nguyễn Văn A',
      schedule: 'Thứ 2, 4, 6',
      time: '18:00 - 20:00',
      room: 'A101',
      status: 'Đang học',
    },
    {
      id: 2,
      name: 'Tiếng Anh B1',
      instructor: 'Trần Thị B',
      schedule: 'Thứ 3, 5',
      time: '18:00 - 21:00',
      room: 'B203',
      status: 'Sắp học',
    },
  ];

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Thông tin môn học
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} md={6} key={course.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {course.name}
                </Typography>
                <Chip
                  label={course.status}
                  color={course.status === 'Đang học' ? 'primary' : 'secondary'}
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PersonIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Giảng viên: {course.instructor}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EventIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Lịch học: {course.schedule}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Thời gian: {course.time}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Xem chi tiết
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CourseInfo; 