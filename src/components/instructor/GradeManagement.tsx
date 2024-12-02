import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import ClassGradeManagement from './ClassGradeManagement';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RoomIcon from '@mui/icons-material/Room';
import GroupIcon from '@mui/icons-material/Group';

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
  }[];
}

const GradeManagement: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState('2023-2024/1');

  const semesters = ['2023-2024/1', '2023-2024/2', '2022-2023/2'];
  
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
        },
        {
          id: 'CS101-A2',
          name: 'A2',
          schedule: 'Thứ 3, 5',
          time: '18:00 - 20:00',
          room: 'A102',
          students: 30,
        },
      ]
    },
    {
      id: 'CS102',
      code: 'CS102',
      name: 'Lập trình cơ bản',
      classes: [
        {
          id: 'CS102-B1',
          name: 'B1',
          schedule: 'Thứ 2, 4',
          time: '18:00 - 20:00',
          room: 'B101',
          students: 40,
        },
      ]
    },
  ];

  if (selectedClass) {
    const currentClass = courses[selectedTab]?.classes.find(c => c.id === selectedClass);
    return (
      <Box>
        <Button 
          onClick={() => setSelectedClass(null)}
          sx={{ mb: 2 }}
        >
          ← Quay lại danh sách lớp
        </Button>
        <ClassGradeManagement
          classId={selectedClass}
          className={currentClass?.name || ''}
          courseName={courses[selectedTab]?.name || ''}
        />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Quản lý điểm</Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Học kỳ</InputLabel>
          <Select
            value={selectedSemester}
            label="Học kỳ"
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            {semesters.map((semester) => (
              <MenuItem key={semester} value={semester}>
                {semester}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => {
            setSelectedTab(newValue);
            setSelectedClass(null);
          }}
          variant="scrollable"
        >
          {courses.map((course) => (
            <Tab key={course.id} label={`${course.name} (${course.classes.length})`} />
          ))}
        </Tabs>
      </Paper>

      <Paper>
        <List>
          {courses[selectedTab]?.classes.map((classItem, index) => (
            <React.Fragment key={classItem.id}>
              {index > 0 && <Divider />}
              <ListItem sx={{ py: 2 }}>
                <ListItemText
                  primary={
                    <Typography variant="h6" component="div">
                      Lớp {classItem.name}
                    </Typography>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTimeIcon fontSize="small" color="action" />
                          <Typography variant="body2">
                            {classItem.schedule} ({classItem.time})
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <RoomIcon fontSize="small" color="action" />
                          <Typography variant="body2">
                            Phòng {classItem.room}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <GroupIcon fontSize="small" color="action" />
                          <Typography variant="body2">
                            {classItem.students} sinh viên
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => setSelectedClass(classItem.id)}
                  >
                    Xem điểm lớp
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default GradeManagement;