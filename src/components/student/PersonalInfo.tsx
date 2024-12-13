import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import { studentService } from '../../services/student.service';
import { Student, UpdateStudentDTO } from '../../types/student.types';
import { formatDate } from '../../utils/dateUtils';
import dayjs from 'dayjs';

const PersonalInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Student>({
    id: '',
    user_id: '',
    full_name: '',
    email: '',
    phone: '',
    address: '',
    date_of_birth: '',
    created_at: '',
    updated_at: ''
  });

  const formatDateForInput = (dateString: string | null | undefined) => {
    if (!dateString) return '';
    try {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Error formatting date for input:', error);
      return '';
    }
  };

  const loadStudentData = async () => {
    try {
      setLoading(true);
      const data = await studentService.getCurrentStudent();
      
      const formattedData = {
        ...data,
        date_of_birth: formatDate(data.date_of_birth)
      };
      
      setFormData(formattedData);
      setError(null);
    } catch (err: any) {
      console.error('Error loading student:', err);
      setError(err.message || 'Không thể tải thông tin học viên');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'date_of_birth') {
      const date = new Date(value);
      const formattedDate = formatDate(date);
      setFormData(prev => ({
        ...prev,
        [name]: formattedDate
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const { id, email, created_at, updated_at, user_id, ...updateData } = formData;
      
      const formattedData: UpdateStudentDTO = {
        full_name: updateData.full_name,
        phone: updateData.phone,
        address: updateData.address,
        date_of_birth: updateData.date_of_birth ? dayjs(formatDateForInput(updateData.date_of_birth)).toISOString() : null
      };

      await studentService.updateStudent(id, formattedData);
      setIsEditing(false);
      setError(null);
      loadStudentData();
    } catch (err: any) {
      setError('Không thể cập nhật thông tin');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      console.error('No student token found');
      return;
    }
    loadStudentData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">
          Thông tin học viên
        </Typography>
        <Button 
          variant="contained" 
          color={isEditing ? "secondary" : "primary"}
          onClick={() => isEditing ? handleSubmit() : setIsEditing(true)}
        >
          {isEditing ? 'Lưu thay đổi' : 'Chỉnh sửa'}
        </Button>
      </Box>
      <Divider sx={{ mb: 3 }} />
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Họ và tên"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            InputProps={{ readOnly: !isEditing }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Số điện thoại"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            InputProps={{ readOnly: !isEditing }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Ngày sinh"
            name="date_of_birth"
            type="date"
            value={formData.date_of_birth ? formatDateForInput(formData.date_of_birth) : ''}
            onChange={handleChange}
            InputProps={{ 
              readOnly: !isEditing,
              inputProps: { 
                max: new Date().toISOString().split('T')[0]
              }
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Địa chỉ"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            InputProps={{ readOnly: !isEditing }}
            multiline
            rows={2}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfo; 