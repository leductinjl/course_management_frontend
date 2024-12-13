import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { CreateUserRequest } from '../../../types/user.types';

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (userData: CreateUserRequest) => Promise<void>;
}

const AddUserDialog: React.FC<AddUserDialogProps> = ({
  open,
  onClose,
  onSubmit
}) => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Email là bắt buộc'),
    password: Yup.string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .required('Mật khẩu là bắt buộc'),
    full_name: Yup.string()
      .required('Họ tên là bắt buộc'),
    role: Yup.string()
      .oneOf(['student', 'instructor'], 'Vai trò không hợp lệ')
      .required('Vai trò là bắt buộc'),
    status: Yup.string()
      .oneOf(['active', 'inactive'])
      .default('active'),
    phone: Yup.string(),
    address: Yup.string(),
    date_of_birth: Yup.string().when('role', {
      is: 'student',
      then: (schema) => schema
    }),
    specialization: Yup.string().when('role', {
      is: 'instructor',
      then: (schema) => schema
    }),
    bio: Yup.string().when('role', {
      is: 'instructor',
      then: (schema) => schema
    })
  });

  const formik = useFormik<CreateUserRequest>({
    initialValues: {
      email: '',
      password: '',
      full_name: '',
      role: 'student',
      status: 'active',
      phone: '',
      address: '',
      date_of_birth: '',
      specialization: '',
      bio: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      const userData: CreateUserRequest = {
        email: values.email,
        password: values.password,
        full_name: values.full_name,
        role: values.role,
        status: values.status,
        phone: values.phone || undefined,
        address: values.address || undefined
      };

      if (values.role === 'student') {
        userData.date_of_birth = values.date_of_birth || undefined;
      } else {
        userData.specialization = values.specialization || undefined;
        userData.bio = values.bio || undefined;
      }

      await onSubmit(userData);
      formik.resetForm();
      onClose();
    }
  });

  const isInstructor = formik.values.role === 'instructor';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Thêm người dùng mới</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                required
                {...formik.getFieldProps('email')}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mật khẩu"
                type="password"
                required
                {...formik.getFieldProps('password')}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Họ và tên"
                required
                {...formik.getFieldProps('full_name')}
                error={formik.touched.full_name && Boolean(formik.errors.full_name)}
                helperText={formik.touched.full_name && formik.errors.full_name}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Vai trò</InputLabel>
                <Select
                  {...formik.getFieldProps('role')}
                  label="Vai trò"
                  error={formik.touched.role && Boolean(formik.errors.role)}
                >
                  <MenuItem value="student">Học viên</MenuItem>
                  <MenuItem value="instructor">Giảng viên</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                {...formik.getFieldProps('phone')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Địa chỉ"
                multiline
                rows={2}
                {...formik.getFieldProps('address')}
              />
            </Grid>
            {!isInstructor && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Ngày sinh"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  {...formik.getFieldProps('date_of_birth')}
                />
              </Grid>
            )}
            {isInstructor && (
              <>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Chuyên môn"
                    multiline
                    rows={2}
                    {...formik.getFieldProps('specialization')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tiểu sử"
                    multiline
                    rows={3}
                    {...formik.getFieldProps('bio')}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="submit" variant="contained">Thêm người dùng</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddUserDialog; 