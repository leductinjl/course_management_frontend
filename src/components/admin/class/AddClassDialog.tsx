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
  FormHelperText,
  Chip
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Course } from '../../../types/course.types';
import { Instructor } from '../../../types/instructor.types';
import { DatePicker } from '@mui/x-date-pickers';
import type { Dayjs } from 'dayjs';
import { CreateClassDTO } from '../../../types/class.types';
import { classService } from '../../../services/class.service';
import { useSnackbar } from 'notistack';
import {
  CLASS_STATUS_OPTIONS,
  CLASS_STATUS_MAP,
  ClassStatus
} from '../../../types/class.types';

interface AddClassDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (classData: CreateClassDTO) => void;
  defaultValues?: {
    course_id: string;
    instructor_id: string;
    start_date: Dayjs;
    end_date: Dayjs | null;
    schedule: string;
    room: string;
    capacity: string;
    status: string;
  };
}

interface FormValues {
  course_id: string;
  instructor_id: string;
  start_date: Dayjs | null;
  end_date: Dayjs | null;
  schedule: string;
  room: string;
  capacity: string;
  status: ClassStatus;
}

const validationSchema = Yup.object({
  course_id: Yup.string().required('Vui lòng chọn môn học'),
  instructor_id: Yup.string().required('Vui lòng chọn giảng viên'),
  start_date: Yup.mixed().required('Vui lòng chọn ngày bắt đầu'),
  end_date: Yup.mixed()
    .required('Vui lòng chọn ngày kết thúc')
    .test('after-start', 'Ngày kết thúc phải sau ngày bắt đầu', function(value) {
      const { start_date } = this.parent;
      if (!start_date || !value) return true;
      return value > start_date;
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
  onSubmit,
  defaultValues
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
      course_id: defaultValues?.course_id || '',
      instructor_id: defaultValues?.instructor_id || '',
      start_date: defaultValues?.start_date || null,
      end_date: defaultValues?.end_date || null,
      schedule: defaultValues?.schedule || '',
      room: defaultValues?.room || '',
      capacity: defaultValues?.capacity || '',
      status: defaultValues?.status as ClassStatus || 'upcoming'
    },
    validationSchema,
    onSubmit: (values) => {
      const classData: CreateClassDTO = {
        course_id: values.course_id,
        instructor_id: values.instructor_id,
        start_date: values.start_date ? values.start_date.toISOString() : '',
        end_date: values.end_date ? values.end_date.toISOString() : '',
        schedule: values.schedule,
        room: values.room,
        capacity: Number(values.capacity),
        status: values.status
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

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={formik.touched.instructor_id && Boolean(formik.errors.instructor_id)}>
                <InputLabel>Giảng viên</InputLabel>
                <Select
                  name="instructor_id"
                  value={formik.values.instructor_id}
                  onChange={formik.handleChange}
                  label="Giảng viên"
                >
                  {instructors.map((instructor) => (
                    <MenuItem key={instructor.id} value={instructor.id}>
                      {instructor.full_name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.instructor_id && formik.errors.instructor_id && (
                  <FormHelperText>{formik.errors.instructor_id}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <DatePicker
                label="Ngày bắt đầu"
                value={formik.values.start_date}
                onChange={(value: Dayjs | null) => formik.setFieldValue('start_date', value)}
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.start_date && Boolean(formik.errors.start_date),
                    helperText: formik.touched.start_date && formik.errors.start_date as string
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DatePicker
                label="Ngày kết thúc"
                value={formik.values.end_date}
                onChange={(value: Dayjs | null) => formik.setFieldValue('end_date', value)}
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: formik.touched.end_date && Boolean(formik.errors.end_date),
                    helperText: formik.touched.end_date && formik.errors.end_date as string
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

            <Grid item xs={12} md={6}>
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
          <Button type="submit" variant="contained" disabled={loading}>
            Thêm lớp học
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddClassDialog; 