import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from '@mui/material';

interface ClassSelectionProps {
  courseId: string;
  onClose: () => void;
}

interface ClassSection {
  id: string;
  classCode: string;
  instructor: string;
  schedule: string;
  time: string;
  room: string;
  capacity: number;
  enrolled: number;
}

const ClassSelection: React.FC<ClassSelectionProps> = ({ onClose }) => {
  const classSections: ClassSection[] = [
    {
      id: '1',
      classCode: 'CS101.1',
      instructor: 'Nguyễn Văn A',
      schedule: 'Thứ 2, 4, 6',
      time: '7:30 - 9:30',
      room: 'A101',
      capacity: 40,
      enrolled: 35,
    },
    {
      id: '2',
      classCode: 'CS101.2',
      instructor: 'Trần Thị B',
      schedule: 'Thứ 3, 5',
      time: '13:30 - 16:30',
      room: 'A102',
      capacity: 40,
      enrolled: 28,
    },
    // Add more class sections as needed
  ];

  const handleRegisterClass = (classSection: ClassSection) => {
    // Handle class registration logic here
    console.log('Registering for class:', classSection);
    onClose();
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã lớp</TableCell>
              <TableCell>Giảng viên</TableCell>
              <TableCell>Lịch học</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Phòng</TableCell>
              <TableCell>Sĩ số</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classSections.map((section) => (
              <TableRow key={section.id}>
                <TableCell>{section.classCode}</TableCell>
                <TableCell>{section.instructor}</TableCell>
                <TableCell>{section.schedule}</TableCell>
                <TableCell>{section.time}</TableCell>
                <TableCell>{section.room}</TableCell>
                <TableCell>
                  {section.enrolled}/{section.capacity}
                </TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => handleRegisterClass(section)}
                  >
                    Đăng ký
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClassSelection; 