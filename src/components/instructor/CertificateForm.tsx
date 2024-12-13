import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { CreateCertificateDTO } from '../../types/instructor.types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCertificateDTO) => void;
  initialData?: CreateCertificateDTO;
}

export const CertificateForm: React.FC<Props> = ({ open, onClose, onSubmit, initialData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateCertificateDTO>({
    defaultValues: initialData
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? 'Cập nhật chứng chỉ' : 'Thêm chứng chỉ mới'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Tên chứng chỉ"
            {...register('name', { required: 'Vui lòng nhập tên chứng chỉ' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Đơn vị cấp"
            {...register('issuer', { required: 'Vui lòng nhập đơn vị cấp' })}
            error={!!errors.issuer}
            helperText={errors.issuer?.message}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Năm cấp"
            type="number"
            {...register('issue_year', { 
              required: 'Vui lòng nhập năm cấp',
              min: { value: 1900, message: 'Năm không hợp lệ' },
              max: { value: new Date().getFullYear(), message: 'Năm không hợp lệ' }
            })}
            error={!!errors.issue_year}
            helperText={errors.issue_year?.message}
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
