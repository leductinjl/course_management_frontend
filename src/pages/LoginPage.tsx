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
    navigate('/student-home'); // Redirect to home page after login
  };

  // Add particles
  React.useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.animationDuration = Math.random() * 3 + 5 + 's';
      document.querySelector('.particles')?.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 8000);
    };

    const particleInterval = setInterval(createParticle, 500);
    return () => clearInterval(particleInterval);
  }, []);

  return (
    <>
      <div className="particles"></div>
      <div className="floating-circle"></div>
      <div className="floating-circle"></div>
      <div className="floating-circle"></div>
      <div className="decorative-shape decorative-shape-1"></div>
      <div className="decorative-shape decorative-shape-2"></div>
      <div className="login-page">
        <Typography variant="h4" gutterBottom>Create a free account</Typography>
        <Typography className="subtitle">Join us today and get started</Typography>
        
        <form onSubmit={handleLogin}>
          <label>Email address</label>
          <TextField
            variant="outlined"
            placeholder="Enter your email"
            InputProps={{
              startAdornment: <PersonIcon />,
            }}
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          
          <label>Password</label>
          <TextField
            variant="outlined"
            type="password"
            placeholder="Choose a password"
            InputProps={{
              startAdornment: <LockIcon />,
            }}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm password</label>
          <TextField
            variant="outlined"
            type="password"
            placeholder="Confirm your password"
            InputProps={{
              startAdornment: <LockIcon />,
            }}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Account
          </Button>
        </form>
        <p>
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
