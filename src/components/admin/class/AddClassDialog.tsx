import React, { useState, useEffect } from 'react';
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
  FormHelperText
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Course } from '../../../types/course.types';
import { Instructor } from '../../../types/instructor.types';
import { DateTimePicker } from '@mui/x-date-pickers';
import type { Dayjs } from 'dayjs';
import { CreateClassDTO } from '../../../types/class.types';
import { classService } from '../../../services/class.service';
import { useSnackbar } from 'notistack';

interface AddClassDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (classData: CreateClassDTO) => void;
}

interface FormValues {
  courseId: string;
  instructorId: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  schedule: string;
  room: string;
  capacity: string;
}

const validationSchema = Yup.object({
  courseId: Yup.string().required('Vui lòng chọn môn học'),
  instructorId: Yup.string().required('Vui lòng chọn giảng viên'),
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
    .min(1, 'Sĩ số phải lớn hơn 0')
});

const AddClassDialog: React.FC<AddClassDialogProps> = ({
  open,
  onClose,
  onSubmit
}) => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (open) {
      loadData();
    }
  }, [open]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [instructorsData, coursesData] = await Promise.all([
        classService.getInstructors(),
        classService.getAvailableCourses()
      ]);
      setInstructors(instructorsData);
      setCourses(coursesData);
    } catch (error: any) {
      console.error('Error loading data:', error);
      setError(error.message || 'Có lỗi xảy ra khi tải dữ liệu');
      enqueueSnackbar('Không thể tải dữ liệu. Vui lòng thử lại sau.', { 
        variant: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Lỗi</DialogTitle>
        <DialogContent>{error}</DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    );
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      courseId: '',
      instructorId: '',
      startDate: null,
      endDate: null,
      schedule: '',
      room: '',
      capacity: ''
    },
    validationSchema,
    onSubmit: (values) => {
      const classData: CreateClassDTO = {
        courseId: values.courseId,
        instructorId: values.instructorId,
        startDate: values.startDate ? values.startDate.toISOString() : '',
        endDate: values.endDate ? values.endDate.toISOString() : '',
        schedule: values.schedule,
        room: values.room,
        capacity: Number(values.capacity)
      };
      onSubmit(classData);
    }
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Thêm lớp học mới</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={formik.touched.courseId && Boolean(formik.errors.courseId)}>
                <InputLabel>Môn học</InputLabel>
                <Select
                  name="courseId"
                  value={formik.values.courseId}
                  onChange={formik.handleChange}
                  label="Môn học"
                >
                  {courses.map((course) => (
                    <MenuItem key={course.id} value={course.id}>
                      {course.name} ({course.code})
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.courseId && formik.errors.courseId && (
                  <FormHelperText>{formik.errors.courseId}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
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
              <DateTimePicker
                label="Ngày bắt đầu"
                value={formik.values.startDate}
                onChange={(value: Dayjs | null) => formik.setFieldValue('startDate', value)}
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
              <DateTimePicker
                label="Ngày kết thúc"
                value={formik.values.endDate}
                onChange={(value: Dayjs | null) => formik.setFieldValue('endDate', value)}
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            Thêm lớp học
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddClassDialog; 