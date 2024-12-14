import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { instructorService } from '../../services/instructor.service';
import ClassGradeManagement from './ClassGradeManagement';

interface CourseClass {
  id: string;
  class_code: string;
  schedule: string;
  enrollmentCount: number;
}

interface Course {
  id: string;
  name: string;
  code: string;
  classes?: CourseClass[];
}

const GradeManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedClass, setSelectedClass] = useState<(CourseClass & { courseName: string }) | null>(null);
  
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await instructorService.getInstructorCourses();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Quản lý điểm
      </Typography>

      {selectedClass ? (
        <>
          <Button 
            variant="outlined" 
            onClick={() => setSelectedClass(null)}
            sx={{ mb: 2 }}
          >
            Quay lại
          </Button>
          <ClassGradeManagement
            class_id={selectedClass.id}
            className={selectedClass.class_code}
            courseName={selectedClass.courseName}
          />
        </>
      ) : (
        <List component={Paper}>
          {courses.map((course) => (
            <Accordion key={course.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  {course.name} ({course.code})
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {course.classes?.map((classItem) => (
                    <ListItem 
                      key={classItem.id}
                      onClick={() => setSelectedClass({
                        ...classItem,
                        courseName: course.name
                      })}
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'action.hover' }
                      }}
                    >
                      <ListItemText
                        primary={`Lớp ${classItem.class_code}`}
                        secondary={
                          <>
                            <Typography variant="body2">
                              Lịch học: {classItem.schedule}
                            </Typography>
                            <Typography variant="body2">
                              Sĩ số: {classItem.enrollmentCount} học viên
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </List>
      )}
    </Box>
  );
};

export default GradeManagement;