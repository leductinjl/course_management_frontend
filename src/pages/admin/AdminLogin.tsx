import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert
} from '@mui/material';
import { useState } from 'react';
import { adminService } from '../../services/admin.service';
import { AdminLoginRequest, ApiError } from '../../types/admin.types';
import axiosInstance from '../../config/axios.config';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<AdminLoginRequest>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await adminService.login(credentials);
      
      if (response.success && response.data) {
        // Store token from the correct response structure
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminData', JSON.stringify(response.data.admin));
        
        // Set the token in axios defaults
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        navigate('/adminne/dashboard');
      }
    } catch (err: any) {
      const apiError = err.response?.data;
      setError(apiError?.message || 'Đã xảy ra lỗi khi đăng nhập');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5'
      }}
    >
      <Paper 
        elevation={3}
        sx={{ 
          p: 4, 
          width: '100%', 
          maxWidth: 400,
          bgcolor: 'white' 
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Đăng nhập Admin
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            type="password"
            label="Mật khẩu"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            margin="normal"
          />
          
          <Button 
            fullWidth 
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminLogin; 