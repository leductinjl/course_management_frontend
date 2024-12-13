import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { CreateAchievementDTO } from '../../types/instructor.types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAchievementDTO) => void;
  initialData?: CreateAchievementDTO;
}

export const AchievementForm: React.FC<Props> = ({ open, onClose, onSubmit, initialData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateAchievementDTO>({
    defaultValues: initialData
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? 'Cập nhật thành tích' : 'Thêm thành tích mới'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Tiêu đề"
            {...register('title', { required: 'Vui lòng nhập tiêu đề' })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Mô tả"
            multiline
            rows={4}
            {...register('description')}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Ngày đạt được"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register('achievementDate', { required: 'Vui lòng chọn ngày' })}
            error={!!errors.achievementDate}
            helperText={errors.achievementDate?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
