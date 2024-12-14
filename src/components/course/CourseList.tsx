import React, { useState, useEffect } from 'react';
import { Grid, Box, CircularProgress, Alert, Typography } from '@mui/material';
import { courseService } from '../../services/course.service';
import CourseRegistrationCard from './CourseRegistrationCard';
import { Course } from '../../types/course.types';

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getAvailableCoursesForStudent();
        console.log('Fetched courses:', data);
        setCourses(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    );
  }

  if (courses.length === 0) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <Typography variant="h6" color="text.secondary">
          Không có môn học nào khả dụng
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {courses.map((course) => (
        <Grid item xs={12} md={6} key={course.id}>
          <CourseRegistrationCard course={course} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseList;
