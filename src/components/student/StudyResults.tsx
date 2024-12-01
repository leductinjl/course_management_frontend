import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';

const StudyResults: React.FC = () => {
  const results = [
    {
      id: 1,
      courseCode: 'CS101',
      courseName: 'Tin học văn phòng',
      semester: 'HK1 2023-2024',
      midtermScore: 8.5,
      finalScore: 9.0,
      status: 'Đạt',
    },
    {
      id: 2,
      courseCode: 'ENG201',
      courseName: 'Tiếng Anh B1',
      semester: 'HK1 2023-2024',
      midtermScore: 7.5,
      finalScore: 8.0,
      status: 'Đạt',
    },
    {
      id: 3,
      courseCode: 'CS102',
      courseName: 'Lập trình cơ bản',
      semester: 'HK2 2023-2024',
      midtermScore: '-',
      finalScore: '-',
      status: 'Đang học',
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Kết quả học tập
      </Typography>
      
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã môn</TableCell>
              <TableCell>Tên môn học</TableCell>
              <TableCell>Học kỳ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map(result => (
              <TableRow key={result.id}>
                <TableCell>{result.courseCode}</TableCell>
                <TableCell>{result.courseName}</TableCell>
                <TableCell>{result.semester}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudyResults; 