import React, { useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
} from '@mui/material';
import ClassSelection from './ClassSelection';

interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  category: string;
  description: string;
  prerequisites: string[];
  status: 'open' | 'closed';
}

const CourseList: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const courses: Course[] = [
    {
      id: '1',
      code: 'CS101',
      name: 'Tin học văn phòng',
      credits: 3,
      category: 'Tin học cơ bản',
      description: 'Khóa học về các ứng dụng văn phòng cơ bản',
      prerequisites: [],
      status: 'open',
    },
    {
      id: '2',
      code: 'ENG201',
      name: 'Tiếng Anh B1',
      credits: 4,
      category: 'Ngoại ngữ',
      description: 'Khóa học tiếng Anh trình độ B1',
      prerequisites: ['ENG101'],
      status: 'open',
    },
    {
      id: '3',
      code: 'CS301',
      name: 'Lập trình nâng cao',
      credits: 4,
      category: 'CNTT nâng cao',
      description: 'Khóa học lập trình nâng cao',
      prerequisites: ['CS101'],
      status: 'open',
    },
    // Add more courses as needed
  ];

  const categories = ['All', 'Tin học cơ bản', 'Ngoại ngữ', 'CNTT nâng cao'];

  const handleRegister = (course: Course) => {
    setSelectedCourse(course);
    setOpenDialog(true);
  };

  const filteredCourses = selectedCategory === 'All'
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Danh sách môn học
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'contained' : 'outlined'}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </Stack>

      <List>
        {filteredCourses.map((course) => (
          <ListItem key={course.id} divider>
            <ListItemText
              primary={`${course.name} (${course.code})`}
              secondary={
                <>
                  <Typography variant="body2" color="text.secondary">
                    Số tín chỉ: {course.credits}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                  {course.prerequisites.length > 0 && (
                    <Typography variant="body2" color="error">
                      Môn học tiên quyết: {course.prerequisites.join(', ')}
                    </Typography>
                  )}
                </>
              }
            />
            <ListItemSecondaryAction>
              <Chip
                label={course.status === 'open' ? 'Đang mở' : 'Đã đóng'}
                color={course.status === 'open' ? 'success' : 'error'}
                size="small"
                sx={{ mr: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleRegister(course)}
                disabled={course.status === 'closed'}
              >
                Đăng ký
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Chọn lớp học - {selectedCourse?.name}
        </DialogTitle>
        <DialogContent>
          <ClassSelection
            courseId={selectedCourse?.id || ''}
            onClose={() => setOpenDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CourseList;
