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
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GradingIcon from '@mui/icons-material/Grading';
import MenuBookIcon from '@mui/icons-material/MenuBook';

interface InstructorSidebarProps {
  selectedSection: string;
  onSectionChange: (section: string) => void;
}

const InstructorSidebar: React.FC<InstructorSidebarProps> = ({
  selectedSection,
  onSectionChange,
}) => {
  const menuItems = [
    { id: 'personal', text: 'Thông tin cá nhân', icon: <PersonIcon /> },
    { id: 'schedule', text: 'Lịch giảng dạy', icon: <CalendarTodayIcon /> },
    { id: 'grades', text: 'Quản lý điểm', icon: <GradingIcon /> },
    { id: 'courses', text: 'Quản lý môn học', icon: <MenuBookIcon /> },
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

export default InstructorSidebar; 