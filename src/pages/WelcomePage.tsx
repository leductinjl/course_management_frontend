import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ComputerIcon from '@mui/icons-material/Computer';
import LanguageIcon from '@mui/icons-material/Language';
import SecurityIcon from '@mui/icons-material/Security';
import '../styles/pages/welcomePage.css';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ComputerIcon />,
      title: 'Khóa học Tin học',
      description: 'Đa dạng các khóa học từ cơ bản đến nâng cao'
    },
    {
      icon: <LanguageIcon />,
      title: 'Ngoại ngữ',
      description: 'Chương trình học theo chuẩn quốc tế'
    },
    {
      icon: <SecurityIcon />,
      title: 'Chứng chỉ',
      description: 'Chứng chỉ được công nhận toàn quốc'
    }
  ];

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="icon-container">
          <SchoolIcon className="school-icon" />
        </div>
        
        <Typography variant="h4" className="welcome-title">
          Chào mừng đến với Trung tâm Tin học
        </Typography>
        
        <Typography variant="h5" className="welcome-subtitle">
          Ngoại ngữ ĐHSPTPHCM
        </Typography>
        
        <Typography variant="body1" className="welcome-description">
          Nơi bạn bắt đầu hành trình học tập và phát triển kỹ năng!
        </Typography>

        <div className="features-container">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon">{feature.icon}</div>
              <Typography variant="h6" className="feature-title">
                {feature.title}
              </Typography>
              <Typography variant="body2" className="feature-description">
                {feature.description}
              </Typography>
            </div>
          ))}
        </div>

        <div className="stats-container">
          <div className="stat-item">
            <Typography variant="h4" className="stat-number">1000+</Typography>
            <Typography variant="body2" className="stat-label">Học viên</Typography>
          </div>
          <div className="stat-item">
            <Typography variant="h4" className="stat-number">50+</Typography>
            <Typography variant="body2" className="stat-label">Khóa học</Typography>
          </div>
          <div className="stat-item">
            <Typography variant="h4" className="stat-number">20+</Typography>
            <Typography variant="body2" className="stat-label">Giảng viên</Typography>
          </div>
        </div>

        <div className="button-container">
          <Button
            variant="contained"
            className="register-button"
            onClick={() => navigate('/register')}
          >
            ĐĂNG KÝ NGAY
          </Button>
          
          <Button
            variant="outlined"
            className="login-button"
            onClick={() => navigate('/login')}
          >
            ĐĂNG NHẬP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;