// frontend/src/components/instructor/ClassRequestForm.tsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers';
import { Course } from '../../types/course.types';
import { CreateClassRequestDTO } from '../../services/classRequest.service';
import dayjs, { Dayjs } from 'dayjs';

interface ClassRequestFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateClassRequestDTO) => Promise<void>;
  initialValues?: CreateClassRequestDTO;
  courses: Course[];
  title: string;
}

const validationSchema = Yup.object({
  course_id: Yup.string().required('Vui lòng chọn môn học'),
  expected_students: Yup.number()
    .required('Vui lòng nhập số lượng học viên')
    .min(1, 'Số lượng học viên phải lớn hơn 0'),
  desired_start_date: Yup.date()
    .required('Vui lòng chọn ngày bắt đầu')
    .min(new Date(Date.now() + 28 * 24 * 60 * 60 * 1000), 'Ngày bắt đầu phải sau 4 tuần kể từ ngày đăng ký'),
  schedule_note: Yup.string().required('Vui lòng nhập ghi chú lịch học'),
  reason: Yup.string().required('Vui lòng nhập lý do'),
});

const ClassRequestForm: React.FC<ClassRequestFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialValues,
  courses,
  title,
}) => {
  const formik = useFormik<CreateClassRequestDTO>({
    initialValues: initialValues || {
      course_id: '',
      expected_students: 0,
      desired_start_date: '',
      schedule_note: '',
      reason: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      await onSubmit(values);
      onClose();
    },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth error={formik.touched.course_id && Boolean(formik.errors.course_id)}>
                <InputLabel>Môn học</InputLabel>
                <Select
                  name="course_id"
                  value={formik.values.course_id}
                  onChange={formik.handleChange}
                  label="Môn học"
                >
                  {courses.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                      {course.name} ({course.code})
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.course_id && formik.errors.course_id && (
                  <FormHelperText>{formik.errors.course_id}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="expected_students"
                label="Số lượng học viên dự kiến"
                type="number"
                value={formik.values.expected_students}
                onChange={formik.handleChange}
                error={formik.touched.expected_students && Boolean(formik.errors.expected_students)}
                helperText={formik.touched.expected_students && formik.errors.expected_students}
              />
            </Grid>

            <Grid item xs={12}>
              <DatePicker
                format="DD/MM/YYYY"
                label="Ngày bắt đầu mong muốn"
                value={formik.values.desired_start_date ? dayjs(formik.values.desired_start_date) : null}
                onChange={(value: Dayjs | null) => {
                  formik.setFieldValue('desired_start_date', value ? value.format('YYYY-MM-DD') : '');
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.desired_start_date && Boolean(formik.errors.desired_start_date),
                    helperText: formik.touched.desired_start_date && formik.errors.desired_start_date as string,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="schedule_note"
                label="Ghi chú lịch học (VD: MON,WED,FRI|07:30-09:00)"
                multiline
                rows={3}
                value={formik.values.schedule_note}
                onChange={formik.handleChange}
                error={formik.touched.schedule_note && Boolean(formik.errors.schedule_note)}
                helperText={formik.touched.schedule_note && formik.errors.schedule_note}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="reason"
                label="Lý do"
                multiline
                rows={3}
                value={formik.values.reason}
                onChange={formik.handleChange}
                error={formik.touched.reason && Boolean(formik.errors.reason)}
                helperText={formik.touched.reason && formik.errors.reason}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="submit" variant="contained" color="primary">
            {initialValues ? 'Cập nhật' : 'Tạo yêu cầu'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ClassRequestForm;