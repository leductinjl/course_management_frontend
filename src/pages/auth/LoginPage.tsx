import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Typography, 
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Alert,
  CircularProgress
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { authService } from '../../services/auth.service';
import '../../styles/pages/loginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let response;
      if (role === 'student') {
        response = await authService.studentLogin(email, password);
        if (response.success && response.data.token) {
          localStorage.setItem('userToken', response.data.token);
          localStorage.setItem('userData', JSON.stringify(response.data.user));
          navigate('/student-home');
        }
      } else {
        response = await authService.instructorLogin(email, password);
        if (response.success && response.data.token) {
          localStorage.setItem('instructorToken', response.data.token);
          localStorage.setItem('instructorData', JSON.stringify(response.data.user));
          navigate('/instructor-home');
        }
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="particles"></div>
      <div className="floating-circle"></div>
      <div className="floating-circle"></div>
      <div className="floating-circle"></div>
      <div className="decorative-shape decorative-shape-1"></div>
      <div className="decorative-shape decorative-shape-2"></div>
      <div className="login-page">
        <Typography variant="h4" gutterBottom>Welcome Back</Typography>
        <Typography className="subtitle">Sign in to your account</Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <FormControl component="fieldset" className="role-selector">
            <FormLabel component="legend">Login as:</FormLabel>
            <RadioGroup
              row
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <FormControlLabel value="student" control={<Radio />} label="Student" />
              <FormControlLabel value="instructor" control={<Radio />} label="Instructor" />
            </RadioGroup>
          </FormControl>
          
          <label>Email address</label>
          <TextField
            variant="outlined"
            placeholder="Enter your email"
            type="email"
            InputProps={{
              startAdornment: <PersonIcon />,
            }}
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          
          <label>Password</label>
          <TextField
            variant="outlined"
            type="password"
            placeholder="Enter your password"
            InputProps={{
              startAdornment: <LockIcon />,
            }}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </form>
        <p>
          Don't have an account?{' '}
          <Link to="/register">Sign up</Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
