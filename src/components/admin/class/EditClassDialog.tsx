import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FormHelperText,
  Chip
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Instructor } from '../../../types/instructor.types';
import { classService } from '../../../services/class.service';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Course } from '../../../types/course.types';
import { 
  Class,
  CLASS_STATUS_OPTIONS,
  ClassStatus 
} from '../../../types/class.types';
import { useSnackbar } from 'notistack';

interface EditClassDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (classData: Partial<Class>) => void;
  classData: Class;
}

const validationSchema = Yup.object({
  startDate: Yup.mixed().required('Vui lòng chọn ngày bắt đầu'),
  endDate: Yup.mixed()
    .required('Vui lòng chọn ngày kết thúc')
    .test('after-start', 'Ngày kết thúc phải sau ngày bắt đầu', function(value) {
      const { startDate } = this.parent;
      if (!startDate || !value) return true;
      return value > startDate;
    }),
  schedule: Yup.string().required('Vui lòng nhập lịch học'),
  room: Yup.string().required('Vui lòng nhập phòng học'),
  capacity: Yup.number()
    .required('Vui lòng nhập sĩ số')
    .min(1, 'Sĩ số phải lớn hơn 0'),
  status: Yup.string().required('Vui lòng chọn trạng thái')
});

const EditClassDialog: React.FC<EditClassDialogProps> = ({
  open,
  onClose,
  onSubmit,
  classData: initialClassData,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [instructorsData, coursesData] = await Promise.all([
          classService.getInstructors(),
          classService.getAvailableCourses()
        ]);
        setInstructors(instructorsData);
        setCourses(coursesData);
      } catch (error: any) {
        if (error.response?.status === 403) {
          enqueueSnackbar('Phiên đăng nhập đã hết hạn hoặc không có quyền truy cập', { 
            variant: 'error',
            autoHideDuration: 3000
          });
          onClose();
          navigate('/login');
        } else {
          enqueueSnackbar('Có lỗi xảy ra khi tải dữ liệu', { 
            variant: 'error',
            autoHideDuration: 3000
          });
        }
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      loadData();
    }
  }, [open, enqueueSnackbar, onClose, navigate]);

  const formik = useFormik({
    initialValues: {
      instructorId: initialClassData.instructorId,
      startDate: dayjs(initialClassData.startDate),
      endDate: dayjs(initialClassData.endDate),
      schedule: initialClassData.schedule,
      room: initialClassData.room,
      capacity: initialClassData.capacity,
      status: initialClassData.status
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const submitData = {
          ...values,
          startDate: values.startDate.toISOString(),
          endDate: values.endDate.toISOString()
        };
        await onSubmit(submitData);
      } catch (error: any) {
        if (error.response?.status === 403) {
          enqueueSnackbar('Phiên đăng nhập đã hết hạn hoặc không có quyền truy cập', {
            variant: 'error',
            autoHideDuration: 3000
          });
          onClose();
          navigate('/adminne/login');
        } else {
          enqueueSnackbar('Có lỗi xảy ra khi cập nhật lớp học', {
            variant: 'error',
            autoHideDuration: 3000
          });
        }
      }
    },
    enableReinitialize: true
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Chỉnh sửa lớp học</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mã lớp"
                value={initialClassData.classCode}
                disabled
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Môn học"
                value={initialClassData.Course?.name}
                disabled
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={formik.touched.instructorId && Boolean(formik.errors.instructorId)}>
                <InputLabel>Giảng viên</InputLabel>
                <Select
                  name="instructorId"
                  value={formik.values.instructorId}
                  onChange={formik.handleChange}
                  label="Giảng viên"
                >
                  {instructors.map((instructor) => (
                    <MenuItem key={instructor.id} value={instructor.id}>
                      {instructor.fullName}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.instructorId && formik.errors.instructorId && (
                  <FormHelperText>{formik.errors.instructorId}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <DatePicker
                label="Ngày bắt đầu"
                value={formik.values.startDate}
                onChange={(value: Dayjs | null) => formik.setFieldValue('startDate', value)}
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.startDate && Boolean(formik.errors.startDate),
                    helperText: formik.touched.startDate && formik.errors.startDate as string
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DatePicker
                label="Ngày kết th��c"
                value={formik.values.endDate}
                onChange={(value: Dayjs | null) => formik.setFieldValue('endDate', value)}
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.endDate && Boolean(formik.errors.endDate),
                    helperText: formik.touched.endDate && formik.errors.endDate as string
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                name="schedule"
                label="Lịch học (VD: MON,WED,FRI|07:30-09:00)"
                value={formik.values.schedule}
                onChange={formik.handleChange}
                error={formik.touched.schedule && Boolean(formik.errors.schedule)}
                helperText={formik.touched.schedule && formik.errors.schedule}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="room"
                label="Phòng học"
                value={formik.values.room}
                onChange={formik.handleChange}
                error={formik.touched.room && Boolean(formik.errors.room)}
                helperText={formik.touched.room && formik.errors.room}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="capacity"
                label="Sĩ số"
                type="number"
                value={formik.values.capacity}
                onChange={formik.handleChange}
                error={formik.touched.capacity && Boolean(formik.errors.capacity)}
                helperText={formik.touched.capacity && formik.errors.capacity}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth error={formik.touched.status && Boolean(formik.errors.status)}>
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  label="Trạng thái"
                >
                  {CLASS_STATUS_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.status && formik.errors.status && (
                  <FormHelperText>{formik.errors.status}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="submit" variant="contained" color="primary">
            Cập nhật
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditClassDialog; 