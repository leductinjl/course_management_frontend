import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

export const MenuPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  borderRadius: '8px',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));