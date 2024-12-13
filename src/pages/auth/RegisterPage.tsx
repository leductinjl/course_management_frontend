import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Box
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import { authService } from '../../services/auth.service';
import '../../styles/pages/registerPage.css';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phoneNumber: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.studentRegister({
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
        phoneNumber: formData.phoneNumber,
        address: formData.address
      });

      setSuccess(response.message);
      
      // Chuyển hướng sau 2 giây
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <Typography variant="h4" gutterBottom>Create Account</Typography>
      <Typography variant="subtitle1" gutterBottom>Join us today</Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box className="input-group">
          <EmailIcon />
          <TextField
            fullWidth
            name="email"
            type="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </Box>

        <Box className="input-group">
          <LockIcon />
          <TextField
            fullWidth
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </Box>

        <Box className="input-group">
          <LockIcon />
          <TextField
            fullWidth
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </Box>

        <Box className="input-group">
          <PersonIcon />
          <TextField
            fullWidth
            name="full_name"
            label="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </Box>

        <Box className="input-group">
          <PhoneIcon />
          <TextField
            fullWidth
            name="phoneNumber"
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            disabled={loading}
          />
        </Box>

        <Box className="input-group">
          <HomeIcon />
          <TextField
            fullWidth
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
            disabled={loading}
          />
        </Box>

        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Register'}
        </Button>
      </form>

      <Box mt={2}>
        <Typography>
          Already have an account?{' '}
          <Button 
            color="primary" 
            onClick={() => navigate('/login')}
            disabled={loading}
          >
            Sign in
          </Button>
        </Typography>
      </Box>
    </div>
  );
};

export default RegisterPage;
