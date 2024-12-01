import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import '../styles/pages/welcomePage.css';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      <div className="left-section">
        <img src="path/to/logo.svg" alt="Logo" className="logo" />
        <Typography variant="h4" component="h1" gutterBottom>
          <ComputerIcon /> Chào mừng đến với Trung tâm Tin học Ngoại ngữ ĐHSPTPHCM <LanguageIcon />
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Nơi bạn bắt đầu hành trình học tập và phát triển kỹ năng!
        </Typography>
      </div>
      <div className="right-section">
        <div className="button-container">
          <Button 
            variant="outlined" 
            color="secondary" 
            startIcon={<AccountCircleIcon />}
            onClick={() => navigate('/register')}
          >
            Đăng ký
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            startIcon={<LoginIcon />}
            onClick={() => navigate('/login')}
          >
            Đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
