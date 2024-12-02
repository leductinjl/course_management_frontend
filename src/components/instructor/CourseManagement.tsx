import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

interface Course {
  id: string;
  code: string;
  name: string;
  classes: {
    id: string;
    name: string;
    schedule: string;
    time: string;
    room: string;
    students: number;
    status: 'Đang dạy' | 'Sắp dạy' | 'Đã kết thúc';
  }[];
}

const CourseManagement: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [newStatus, setNewStatus] = useState('');

  const courses: Course[] = [
    {
      id: 'CS101',
      code: 'CS101',
      name: 'Tin học văn phòng',
      classes: [
        {
          id: 'CS101-A1',
          name: 'A1',
          schedule: 'Thứ 2, 4, 6',
          time: '18:00 - 20:00',
          room: 'A101',
          students: 35,
          status: 'Đang dạy',
        },
        // Thêm các lớp khác
      ]
    },
    // Thêm các môn học khác
  ];

  const handleStatusUpdate = () => {
    // Xử lý cập nhật trạng thái
    console.log('Update status:', selectedClass?.id, newStatus);
    setOpenStatusDialog(false);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Quản lý môn học
      </Typography>

      <Paper sx={{ mt: 2 }}>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          variant="scrollable"
        >
          {courses.map((course, index) => (
            <Tab key={course.id} label={course.name} />
          ))}
        </Tabs>
      </Paper>

      <Box sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {courses[selectedTab]?.classes.map((classItem) => (
            <Grid item xs={12} md={6} key={classItem.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    Lớp {classItem.name}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography>Lịch học: {classItem.schedule}</Typography>
                    <Typography>Thời gian: {classItem.time}</Typography>
                    <Typography>Phòng: {classItem.room}</Typography>
                    <Typography>Sĩ số: {classItem.students}</Typography>
                    <Chip
                      label={classItem.status}
                      color={
                        classItem.status === 'Đang dạy' 
                          ? 'success' 
                          : classItem.status === 'Sắp dạy' 
                            ? 'warning' 
                            : 'default'
                      }
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    onClick={() => {
                      setSelectedClass(classItem);
                      setOpenStatusDialog(true);
                    }}
                  >
                    Cập nhật trạng thái
                  </Button>
                  <Button size="small">
                    Xem chi tiết lớp
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={openStatusDialog} onClose={() => setOpenStatusDialog(false)}>
        <DialogTitle>Cập nhật trạng thái dạy</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={newStatus}
              label="Trạng thái"
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <MenuItem value="Đang dạy">Đang dạy</MenuItem>
              <MenuItem value="Sắp dạy">Sắp dạy</MenuItem>
              <MenuItem value="Đã kết thúc">Đã kết thúc</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStatusDialog(false)}>Hủy</Button>
          <Button onClick={handleStatusUpdate} variant="contained">
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseManagement; 