import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from '@mui/material';

interface PlannedCourse {
  courseCode: string;
  courseName: string;
  credits: number;
  expectedDate: string;
  status: 'planned' | 'upcoming';
  prerequisites: string[];
}

interface PlannedCoursesProps {
  courses: PlannedCourse[];
}

const PlannedCourses: React.FC<PlannedCoursesProps> = ({ courses }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mã môn</TableCell>
            <TableCell>Tên môn học</TableCell>
            <TableCell>Số tín chỉ</TableCell>
            <TableCell>Dự kiến mở</TableCell>
            <TableCell>Môn học tiên quyết</TableCell>
            <TableCell align="center">Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.courseCode}>
              <TableCell>{course.courseCode}</TableCell>
              <TableCell>{course.courseName}</TableCell>
              <TableCell>{course.credits}</TableCell>
              <TableCell>{course.expectedDate}</TableCell>
              <TableCell>
                {course.prerequisites.length > 0 
                  ? course.prerequisites.join(', ') 
                  : 'Không có'}
              </TableCell>
              <TableCell align="center">
                <Chip
                  label={course.status === 'planned' ? 'Dự kiến' : 'Sắp mở'}
                  color={course.status === 'planned' ? 'default' : 'primary'}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlannedCourses; 