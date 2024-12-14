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

interface Class {
  id: string;
  class_code: string;
  schedule: string;
  student_count: number;
}

interface Course {
  id: string;
  name: string;
  code: string;
  classes?: Class[];
}

const GradeManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedClass, setSelectedClass] = useState<(Class & { courseName: string }) | null>(null);
  
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      console.log('Fetching courses...'); // Debug log
      const response = await instructorService.getInstructorCourses();
      console.log('Raw courses data:', response); // Debug log
      
      if (!response || !Array.isArray(response)) {
        console.error('Invalid response format:', response);
        setCourses([]);
        return;
      }

      const transformedData: Course[] = response.map((course: any) => ({
        id: course.id || '',
        name: course.name || '',
        code: course.code || '',
        classes: Array.isArray(course.classes) ? course.classes.map((cls: any) => ({
          id: cls.id || '',
          class_code: cls.class_code || '',
          schedule: cls.schedule || '',
          student_count: cls.student_count || 0
        })) : []
      }));

      console.log('Transformed courses:', transformedData); // Debug log
      setCourses(transformedData);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setCourses([]); // Set empty array on error
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
                          <Box component="span">
                            <Typography 
                              component="span" 
                              variant="body2" 
                              display="block"
                            >
                              Lịch học: {classItem.schedule}
                            </Typography>
                            
                          </Box>
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