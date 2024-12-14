import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { CreateWorkHistoryDTO } from '../../types/instructor.types';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateWorkHistoryDTO) => void;
  initialData?: CreateWorkHistoryDTO;
}

export const WorkHistoryForm: React.FC<Props> = ({ open, onClose, onSubmit, initialData }) => {
  const [responsibilities, setResponsibilities] = useState<string[]>(initialData?.responsibilities || []);
  const [newResponsibility, setNewResponsibility] = useState('');
  
  const { register, handleSubmit, formState: { errors } } = useForm<Omit<CreateWorkHistoryDTO, 'responsibilities'>>();

  const handleAddResponsibility = () => {
    if (newResponsibility.trim()) {
      setResponsibilities([...responsibilities, newResponsibility.trim()]);
      setNewResponsibility('');
    }
  };

  const handleRemoveResponsibility = (index: number) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== index));
  };

  const onFormSubmit = (data: Omit<CreateWorkHistoryDTO, 'responsibilities'>) => {
    onSubmit({
      ...data,
      responsibilities: responsibilities
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{initialData ? 'Cập nhật quá trình công tác' : 'Thêm quá trình công tác mới'}</DialogTitle>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Vị trí"
            {...register('position', { required: 'Vui lòng nhập vị trí' })}
            error={!!errors.position}
            helperText={errors.position?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phòng/Ban"
            {...register('department', { required: 'Vui lòng nhập phòng/ban' })}
            error={!!errors.department}
            helperText={errors.department?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Ngày bắt đầu"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register('start_date', { required: 'Vui lòng chọn ngày bắt đầu' })}
            error={!!errors.start_date}
            helperText={errors.start_date?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Ngày kết thúc"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register('end_date')}
          />

          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                fullWidth
                label="Nhiệm vụ"
                value={newResponsibility}
                onChange={(e) => setNewResponsibility(e.target.value)}
              />
              <IconButton 
                color="primary" 
                onClick={handleAddResponsibility}
                sx={{ alignSelf: 'center' }}
              >
                <AddIcon />
              </IconButton>
            </Box>

            <List>
              {responsibilities.map((resp, index) => (
                <ListItem key={index}>
                  <ListItemText primary={resp} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleRemoveResponsibility(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={responsibilities.length === 0}
          >
            {initialData ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}; 