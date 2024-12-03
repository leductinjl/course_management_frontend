import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper
} from '@mui/material';

const AdminPortalAuth = () => {
  const [portalPassword, setPortalPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (portalPassword === import.meta.env.VITE_ADMIN_PORTAL_PASSWORD) {
      sessionStorage.setItem('portalAuth', 'true');
      navigate('/management-portal-secure/login');
    } else {
      setError('Invalid portal password');
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
            Authentication Required
          </Typography>
          
          <TextField
            fullWidth
            type="password"
            value={portalPassword}
            onChange={(e) => setPortalPassword(e.target.value)}
            margin="normal"
            error={!!error}
            helperText={error}
            placeholder="Enter portal password"
          />
          
          <Button 
            fullWidth 
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Verify
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminPortalAuth; 