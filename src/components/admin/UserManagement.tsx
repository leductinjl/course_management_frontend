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
import AddUserDialog from './user/AddUserDialog';
import { useDeleteConfirmation } from '../../hooks/useDeleteConfirmation';
import DeleteConfirmDialog from './common/DeleteConfirmDialog';
import EditUserDialog from './user/EditUserDialog';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'student1', fullName: 'Nguyễn Văn A', role: 'Học viên', status: 'Hoạt động' },
    { id: 2, username: 'instructor1', fullName: 'Trần Thị B', role: 'Giảng viên', status: 'Hoạt động' },
  ]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleAddUser = (userData: any) => {
    setUsers([...users, {
      id: users.length + 1,
      ...userData,
      status: 'Hoạt động'
    }]);
  };

  const handleDeleteUser = async (user: any) => {
    try {
      // await userApi.delete(user.id);
      setUsers(users.filter(u => u.id !== user.id));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleEditUser = (userData: any) => {
    setUsers(users.map(user => 
      user.id === selectedUser.id ? { ...user, ...userData } : user
    ));
    setOpenEditDialog(false);
  };

  const openEdit = (user: any) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  const { dialogProps, handleOpen: openDelete } = useDeleteConfirmation({
    onDelete: handleDeleteUser,
    getMessage: (user) => `Bạn có chắc chắn muốn xóa người dùng "${user.fullName}" không?`,
    getTitle: () => "Xóa người dùng"
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Quản lý người dùng</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
        >
          Thêm người dùng
        </Button>
      </Box>

      <AddUserDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={handleAddUser}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên đăng nhập</TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell>Vai trò</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>
                  <Chip 
                    label={user.role}
                    color={user.role === 'Giảng viên' ? 'primary' : 'default'}
                  />
                </TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => openEdit(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => openDelete(user)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedUser && (
        <EditUserDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          onSubmit={handleEditUser}
          userData={selectedUser}
        />
      )}

      <DeleteConfirmDialog {...dialogProps} />
    </Box>
  );
};

export default UserManagement; 