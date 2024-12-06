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
    fullName: Yup.string()
      .required('Họ tên là bắt buộc'),
    role: Yup.string()
      .oneOf(['student', 'instructor'], 'Vai trò không hợp lệ')
      .required('Vai trò là bắt buộc'),
    status: Yup.string()
      .oneOf(['active', 'inactive'])
      .default('active'),
    phone: Yup.string(),
    address: Yup.string(),
    dateOfBirth: Yup.string().when('role', {
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
      fullName: '',
      role: 'student',
      status: 'active',
      phone: '',
      address: '',
      dateOfBirth: '',
      specialization: '',
      bio: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      const userData: CreateUserRequest = {
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        role: values.role,
        status: values.status,
        phone: values.phone || undefined,
        address: values.address || undefined
      };

      if (values.role === 'student') {
        userData.dateOfBirth = values.dateOfBirth || undefined;
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
                {...formik.getFieldProps('fullName')}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
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
                  {...formik.getFieldProps('dateOfBirth')}
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