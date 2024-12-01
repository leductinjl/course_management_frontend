import React from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PaymentIcon from '@mui/icons-material/Payment';
import CardMembershipIcon from '@mui/icons-material/CardMembership';

interface StudentSidebarProps {
  selectedSection: string;
  onSectionChange: (section: string) => void;
}

const StudentSidebar: React.FC<StudentSidebarProps> = ({
  selectedSection,
  onSectionChange,
}) => {
  const menuItems = [
    { id: 'personal', text: 'Thông tin cá nhân', icon: <PersonIcon /> },
    { id: 'history', text: 'Lịch sử đăng ký', icon: <HistoryIcon /> },
    { id: 'courses', text: 'Thông tin môn học', icon: <MenuBookIcon /> },
    { id: 'schedule', text: 'Lịch học', icon: <CalendarTodayIcon /> },
    { id: 'exams', text: 'Lịch thi', icon: <AssignmentIcon /> },
    { id: 'results', text: 'Kết quả học tập', icon: <AssessmentIcon /> },
    { id: 'certificates', text: 'Chứng chỉ', icon: <CardMembershipIcon /> },
    { id: 'tuition', text: 'Học phí', icon: <PaymentIcon /> },
  ];

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <List component="nav">
        {menuItems.map((item) => (
          <React.Fragment key={item.id}>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedSection === item.id}
                onClick={() => onSectionChange(item.id)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.light',
                    '&:hover': {
                      backgroundColor: 'primary.light',
                    },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default StudentSidebar; 