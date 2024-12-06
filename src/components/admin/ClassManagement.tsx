import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import AddClassDialog from './class/AddClassDialog';
import EditClassDialog from './class/EditClassDialog';

const ClassManagement = () => {
  const [classes, setClasses] = useState([
    {
      id: 1,
      code: 'CS101-A',
      courseName: 'Lập trình cơ bản',
      instructor: 'Nguyễn Văn A',
      schedule: 'T2,T4 (7:30-9:30)',
      students: 25,
      status: 'Đang diễn ra'
    },
    // ... more classes
  ]);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const handleAddClass = (classData: any) => {
    setClasses([...classes, { id: classes.length + 1, ...classData }]);
  };

  const handleEditClass = (classData: any) => {
    setClasses(classes.map(cls => cls.id === classData.id ? classData : cls));
  };

  const openEdit = (classItem: any) => {
    setSelectedClass(classItem);
    setOpenEditDialog(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Quản lý lớp học</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAddDialog(true)}>
          Thêm lớp học
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã lớp</TableCell>
              <TableCell>Tên môn học</TableCell>
              <TableCell>Giảng viên</TableCell>
              <TableCell>Lịch học</TableCell>
              <TableCell>Số học viên</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell>{classItem.code}</TableCell>
                <TableCell>{classItem.courseName}</TableCell>
                <TableCell>{classItem.instructor}</TableCell>
                <TableCell>{classItem.schedule}</TableCell>
                <TableCell>{classItem.students}</TableCell>
                <TableCell>
                  <Chip 
                    label={classItem.status}
                    color={classItem.status === 'Đang diễn ra' ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => openEdit(classItem)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddClassDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={handleAddClass}
      />

      {selectedClass && (
        <EditClassDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          onSubmit={handleEditClass}
          classData={selectedClass}
        />
      )}
    </Box>
  );
};

export default ClassManagement; 