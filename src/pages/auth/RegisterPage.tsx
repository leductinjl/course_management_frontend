import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/registerPage.css'; // Import the CSS file
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
    address: '',
    verificationCode: ''
  });

  const navigate = useNavigate();

  // Xử lý sự thay đổi trong input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Tiến sang bước tiếp theo khi nhấn nút "Next" hoặc "Finish"
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2); // Chuyển sang bước nhập mã xác thực
    } else if (step === 2) {
      setStep(3); // Chuyển sang bước nhập thông tin cá nhân
    } else {
      // Gửi dữ liệu đăng ký và chuyển hướng sang trang login
      console.log(formData);
      navigate('/login'); // Chuyển hướng đến trang đăng nhập
    }
  };

  return (
    <div className="register-page">
      <h2>Create a free account</h2>
      <p>Join us today and get started</p>
      <form onSubmit={handleNext}>
        {/* Bước 1: Nhập Email và Mật khẩu */}
        {step === 1 && (
          <>
            <div className="input-group">
              <EmailIcon />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="input-group">
              <LockIcon />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Choose a password"
                required
              />
            </div>
            <div className="input-group">
              <LockIcon />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          </>
        )}

        {/* Bước 2: Nhập Mã xác thực */}
        {step === 2 && (
          <>
            <div className="input-group">
              <VerifiedUserIcon />
              <input
                type="text"
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleChange}
                placeholder="Enter your verification code"
                required
              />
            </div>
          </>
        )}

        {/* Bước 3: Nhập Thông tin cá nhân */}
        {step === 3 && (
          <>
            <div className="input-group">
              <PersonIcon />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </div>
            <div className="input-group">
              <PersonIcon />
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="input-group">
              <PersonIcon />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required
              />
            </div>
          </>
        )}

        {/* Bước 4: Chào mừng */}
        {step === 4 && (
          <div className="welcome-section">
            <h2>Welcome to Untitled!</h2>
            <p>Get up and running in 3 minutes.</p>
            <img src="path/to/your/image.jpg" alt="Welcome" />
            <button onClick={() => navigate('/home')}>Finish up</button>
          </div>
        )}

        <button type="submit">{step === 3 ? 'Finish' : 'Next'}</button>
      </form>

      {/* Link đăng nhập nếu đã có tài khoản */}
      <p>
        Already have an account?{' '}
        <span onClick={() => navigate('/login')} style={{ cursor: 'pointer', color: 'blue' }}>
          Sign in
        </span>
      </p>
    </div>
  );
};

export default RegisterPage;
