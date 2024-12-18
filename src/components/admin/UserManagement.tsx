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
import UserDetailDialog from './user/UserDetailDialog';
import { useSnackbar } from 'notistack';
import { showNotification, ERROR_MESSAGES } from '../../utils/notificationHelper';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserForDetail, setSelectedUserForDetail] = useState<User | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const { dialogProps, handleOpen: openDelete } = useDeleteConfirmation<string>({
    onDelete: async (user_id) => {
      try {
        await userService.deleteUser(user_id);
        setUsers(users.filter(user => user.id !== user_id));
        showNotification(enqueueSnackbar, {
          message: 'Xóa người dùng thành công',
          variant: 'success'
        });
      } catch (error: any) {
        let errorMessage = ERROR_MESSAGES.USER_DELETE_ERROR;
        let variant: 'warning' | 'error' = 'error';
        
        if (error.code === 'DELETE_RESTRICTED') {
          variant = 'warning';
          if (error.message.includes('giảng viên')) {
            errorMessage = ERROR_MESSAGES.INSTRUCTOR_HAS_CLASSES;
          } else if (error.message.includes('học viên')) {
            errorMessage = ERROR_MESSAGES.STUDENT_HAS_ENROLLMENTS;
          }
        }
        
        showNotification(enqueueSnackbar, {
          message: errorMessage,
          variant: variant
        });
        throw error;
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
      showNotification(enqueueSnackbar, {
        message: 'Thêm người dùng thành công',
        variant: 'success'
      });
    } catch (error: any) {
      let errorMessage = ERROR_MESSAGES.USER_CREATE_ERROR;
      let variant: 'warning' | 'error' = 'error';

      if (error.code === 'EMAIL_EXISTS') {
        errorMessage = ERROR_MESSAGES.EMAIL_EXISTS;
        variant = 'warning';
      }

      showNotification(enqueueSnackbar, {
        message: errorMessage,
        variant: variant
      });
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
                  full_name: userData.full_name || user.studentProfile.full_name,
                  phone: userData.phone || user.studentProfile.phone || '',
                  address: userData.address || user.studentProfile.address || '',
                  date_of_birth: userData.date_of_birth || user.studentProfile.date_of_birth || ''
                };
              }

              if (user.role === 'instructor' && user.instructorProfile) {
                updatedUserData.instructorProfile = {
                  ...user.instructorProfile,
                  full_name: userData.full_name || user.instructorProfile.full_name,
                  phone: userData.phone || user.instructorProfile.phone || '',
                  address: userData.address || user.instructorProfile.address || '',
                  specialization: userData.specialization || user.instructorProfile.specialization || '',
                  bio: userData.bio || user.instructorProfile.bio || ''
                };
              }

              return updatedUserData;
            }
            return user;
          })
        );
        
        setOpenEditDialog(false);
        setSelectedUser(null);
        showNotification(enqueueSnackbar, {
          message: 'Cập nhật người dùng thành công',
          variant: 'success'
        });
      }
    } catch (error: any) {
      let errorMessage = ERROR_MESSAGES.USER_UPDATE_ERROR;
      let variant: 'warning' | 'error' = 'error';

      if (error.code === 'EMAIL_EXISTS') {
        errorMessage = ERROR_MESSAGES.EMAIL_EXISTS;
        variant = 'warning';
      }

      showNotification(enqueueSnackbar, {
        message: errorMessage,
        variant: variant
      });
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

  const handleRowClick = (event: React.MouseEvent, user: User) => {
    if ((event.target as HTMLElement).closest('.action-buttons')) {
      return;
    }
    setSelectedUserForDetail(user);
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
                <TableRow 
                  key={user.id}
                  hover
                  onClick={(e) => handleRowClick(e, user)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.role === 'student' 
                      ? user.studentProfile?.full_name 
                      : user.instructorProfile?.full_name}
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
                  <TableCell align="right" className="action-buttons">
                    <IconButton 
                      onClick={() => openEdit(user)}
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => openDelete(user.id)}
                      size="small"
                      color="error"
                    >
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

      {selectedUserForDetail && (
        <UserDetailDialog
          open={!!selectedUserForDetail}
          onClose={() => setSelectedUserForDetail(null)}
          user={selectedUserForDetail}
        />
      )}
    </Box>
  );
};

export default UserManagement;