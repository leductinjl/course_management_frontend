import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import '../styles/pages/loginPage.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login
    console.log('Logging in with:', { username, password });
    navigate('/home'); // Redirect to home page after login
  };

  return (
    <div className="login-page">
      <Typography variant="h4" gutterBottom>Đăng nhập</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          variant="outlined"
          placeholder="Tên người dùng"
          InputProps={{
            startAdornment: <PersonIcon />,
          }}
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          type="password"
          placeholder="Mật khẩu"
          InputProps={{
            startAdornment: <LockIcon />,
          }}
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Đăng nhập
        </Button>
      </form>
      <p>
        Chưa có tài khoản?{' '}
        <Link to="/register">Đăng ký ngay</Link>
      </p>
    </div>
  );
};

export default LoginPage;
