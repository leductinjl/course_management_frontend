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
import { instructorService } from '../../services/instructor.service';
import { Instructor } from '../../types/instructor.types';

const PersonalInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Instructor>({
    id: '',
    full_name: '',
    email: '',
    phone: '',
    address: '',
    specialization: '',
    bio: '',
    created_at: '',
    updated_at: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('instructorToken');
    if (!token) {
      console.error('No instructor token found');
      // Redirect to login if needed
      return;
    }
    loadInstructorData();
  }, []);

  const loadInstructorData = async () => {
    try {
      setLoading(true);
      const data = await instructorService.getCurrentInstructor();
      console.log('Loaded instructor data:', data);
      setFormData(data);
      setError(null);
    } catch (err: any) {
      console.error('Error loading instructor:', err);
      setError(err.response?.data?.message || 'Không thể tải thông tin giảng viên');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const { id, email, created_att, updated_at, ...updateData } = formData;
      await instructorService.updateInstructor(id, updateData);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError('Không thể cập nhật thông tin');
    }
  };

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
          Thông tin giảng viên
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
            label="Chuyên ngành"
            name="specialization"
            value={formData.specialization || ''}
            onChange={handleChange}
            InputProps={{ readOnly: !isEditing }}
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
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Giới thiệu"
            name="bio"
            value={formData.bio || ''}
            onChange={handleChange}
            InputProps={{ readOnly: !isEditing }}
            multiline
            rows={3}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfo; 