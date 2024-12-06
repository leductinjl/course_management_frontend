import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { User, CreateUserRequest, UpdateUserRequest } from '../../types/user.types';
import { userService } from '../../services/user.service';
import { toast } from 'react-toastify';
import AddUserDialog from './user/AddUserDialog';
import EditUserDialog from './user/EditUserDialog';
import { useDeleteConfirmation } from '../../hooks/useDeleteConfirmation';
import DeleteConfirmDialog from './common/DeleteConfirmDialog';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { dialogProps, handleOpen: openDelete } = useDeleteConfirmation<string>({
    onDelete: async (userId) => {
      try {
        await userService.deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
        toast.success('Xóa người dùng thành công');
      } catch (error: any) {
        toast.error(error.message || 'Không thể xóa người dùng');
      }
    },
    getMessage: () => 'Bạn có chắc chắn muốn xóa người dùng này không?',
    getTitle: () => 'Xác nhận xóa người dùng'
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error: any) {
      toast.error(error.message || 'Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (userData: CreateUserRequest) => {
    try {
      const newUser = await userService.createUser(userData);
      setUsers(prevUsers => [...prevUsers, newUser]);
      setOpenAddDialog(false);
      toast.success('Thêm người dùng thành công');
    } catch (error: any) {
      toast.error(error.message || 'Không thể thêm người dùng');
    }
  };

  const handleUpdateUser = async (id: string, userData: UpdateUserRequest) => {
    try {
      setLoading(true);
      const updatedUser = await userService.updateUser(id, userData);
      
      if (updatedUser) {
        setUsers(prevUsers => 
          prevUsers.map(user => {
            if (user.id === id) {
              const updatedUserData = {
                ...user,
                status: userData.status || user.status,
                email: userData.email || user.email,
              };

              if (user.role === 'student' && user.studentProfile) {
                updatedUserData.studentProfile = {
                  ...user.studentProfile,
                  fullName: userData.fullName || user.studentProfile.fullName,
                  phone: userData.phone || user.studentProfile.phone || '',
                  address: userData.address || user.studentProfile.address || '',
                  dateOfBirth: userData.dateOfBirth || user.studentProfile.dateOfBirth || '',
                  status: user.studentProfile.status
                };
              }

              if (user.role === 'instructor' && user.instructorProfile) {
                updatedUserData.instructorProfile = {
                  ...user.instructorProfile,
                  fullName: userData.fullName || user.instructorProfile.fullName,
                  phone: userData.phone || user.instructorProfile.phone || '',
                  address: userData.address || user.instructorProfile.address || '',
                  specialization: userData.specialization || user.instructorProfile.specialization || '',
                  bio: userData.bio || user.instructorProfile.bio || '',
                  status: user.instructorProfile.status
                };
              }

              return updatedUserData;
            }
            return user;
          })
        );
        
        setOpenEditDialog(false);
        setSelectedUser(null);
        toast.success('Cập nhật người dùng thành công');
      }
    } catch (error: any) {
      console.error('Error updating user:', error);
      toast.error(error.message || 'Có lỗi xảy ra khi cập nhật người dùng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      console.log('Users updated:', users);
    }
  }, [users, loading]);

  const openEdit = (user: User) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  const renderEditDialog = () => {
    if (!selectedUser || !openEditDialog) return null;
    return (
      <EditUserDialog
        open={openEditDialog}
        onClose={() => {
          setOpenEditDialog(false);
          setSelectedUser(null);
        }}
        onSubmit={(userData) => handleUpdateUser(selectedUser.id, userData)}
        userData={selectedUser}
      />
    );
  };

  return (
    <Box sx={{ p: 3 }}>
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

      <TableContainer component={Paper}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Họ tên</TableCell>
                <TableCell>Vai trò</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell align="right">Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.role === 'student' 
                      ? user.studentProfile?.fullName 
                      : user.instructorProfile?.fullName}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.role === 'student' ? 'Học viên' : 'Giảng viên'}
                      color={user.role === 'student' ? 'primary' : 'secondary'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                      color={user.status === 'active' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => openEdit(user)} size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => openDelete(user.id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <AddUserDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={handleAddUser}
      />

      {renderEditDialog()}

      <DeleteConfirmDialog {...dialogProps} />
    </Box>
  );
};

export default UserManagement;