import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import PaymentIcon from '@mui/icons-material/Payment';

interface StudentSidebarProps {
  selectedSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'personal', label: 'Thông tin cá nhân', icon: <PersonIcon /> },
  { id: 'history', label: 'Lịch sử đăng ký', icon: <HistoryIcon /> },
  { id: 'courses', label: 'Thông tin môn học', icon: <MenuBookIcon /> },
  { id: 'schedule', label: 'Lịch học', icon: <CalendarTodayIcon /> },
  { id: 'exams', label: 'Lịch thi', icon: <AssignmentIcon /> },
  { id: 'results', label: 'Kết quả học tập', icon: <AssessmentIcon /> },
  { id: 'certificates', label: 'Chứng chỉ', icon: <CardMembershipIcon /> },
  { id: 'tuition', label: 'Học phí', icon: <PaymentIcon /> },
];

const StudentSidebar: React.FC<StudentSidebarProps> = ({
  selectedSection,
  onSectionChange,
}) => {
  return (
    <Paper 
      elevation={1} 
      sx={{ 
        backgroundColor: 'white',
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <List sx={{ p: 0 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            sx={{
              cursor: 'pointer',
              backgroundColor: selectedSection === item.id ? '#4285f4' : 'transparent',
              color: selectedSection === item.id ? 'white' : 'inherit',
              '&:hover': {
                backgroundColor: selectedSection === item.id ? '#4285f4' : '#f5f5f5',
              },
              borderBottom: '1px solid #e0e0e0',
              py: 2,
            }}
          >
            <ListItemIcon 
              sx={{ 
                color: selectedSection === item.id ? 'white' : '#757575',
                minWidth: '40px'
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label}
              primaryTypographyProps={{
                fontSize: '0.95rem',
                fontWeight: selectedSection === item.id ? 500 : 400
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default StudentSidebar; 