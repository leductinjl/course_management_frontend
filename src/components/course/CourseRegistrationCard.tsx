import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Box,
  Dialog,
  DialogTitle,
} from '@mui/material';
import { Course } from '../../types/course.types';
import { COURSE_TYPE_MAP } from '../../types/course.types';
import ClassSelection from './ClassSelection';

interface CourseRegistrationCardProps {
  course: Course;
}

const CourseRegistrationCard: React.FC<CourseRegistrationCardProps> = ({ course }) => {
  const [openClassDialog, setOpenClassDialog] = React.useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div">
              {course.name}
            </Typography>
            <Chip 
              label={COURSE_TYPE_MAP[course.type]} 
              color="primary" 
              variant="outlined" 
              size="small" 
            />
          </Box>

          <Typography color="text.secondary" gutterBottom>
            Mã môn học: {course.code}
          </Typography>

          <Typography variant="body2">
            {course.description || 'Chưa có mô tả'}
          </Typography>

          {course.instructors && course.instructors.length > 0 && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Giảng viên:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {course.instructors.map((instructor) => (
                  <Chip
                    key={instructor.id}
                    label={instructor.full_name}
                    size="small"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2}>
              <Typography variant="body2">
                Số tín chỉ: {course.credits}
              </Typography>
              <Typography variant="body2" color="primary">
                Học phí: {formatCurrency(course.fee)}
              </Typography>
            </Stack>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => setOpenClassDialog(true)}
            >
              Đăng ký
            </Button>
          </Box>
        </Stack>
      </CardContent>

      <Dialog 
        open={openClassDialog} 
        onClose={() => setOpenClassDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Đăng ký lớp học - {course.name} ({course.code})
        </DialogTitle>
        <ClassSelection 
          course_id={course.id} 
          onClose={() => setOpenClassDialog(false)}
        />
      </Dialog>
    </Card>
  );
};

export default CourseRegistrationCard; 