import React, { useEffect } from 'react';
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
import { Course, COURSE_STATUS_MAP, CourseStatus } from '../../../types/course.types';

interface EditCourseDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (courseData: Partial<Course>) => void;
  courseData: Course;
}

const EditCourseDialog: React.FC<EditCourseDialogProps> = ({
  open,
  onClose,
  onSubmit,
  courseData: initialCourseData,
}) => {
  const [courseData, setCourseData] = React.useState(initialCourseData);

  useEffect(() => {
    setCourseData(initialCourseData);
  }, [initialCourseData]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Chỉnh sửa môn học</DialogTitle>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(courseData);
      }}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mã môn học"
                required
                value={courseData.code}
                onChange={(e) => setCourseData({...courseData, code: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tên môn học"
                required
                value={courseData.name}
                onChange={(e) => setCourseData({...courseData, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số tín chỉ"
                type="number"
                required
                value={courseData.credits}
                onChange={(e) => setCourseData({...courseData, credits: Number(e.target.value)})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Học phí"
                type="number"
                required
                value={courseData.fee}
                onChange={(e) => setCourseData({...courseData, fee: Number(e.target.value)})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Loại môn học</InputLabel>
                <Select
                  value={courseData.type}
                  label="Loại môn học"
                  required
                  onChange={(e) => setCourseData({...courseData, type: e.target.value as 'basic' | 'advanced' | 'specialized'})}
                >
                  <MenuItem value="basic">Cơ bản</MenuItem>
                  <MenuItem value="advanced">Nâng cao</MenuItem>
                  <MenuItem value="specialized">Chuyên ngành</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  value={courseData.status}
                  label="Trạng thái"
                  required
                  onChange={(e) => setCourseData({...courseData, status: e.target.value as CourseStatus})}
                >
                  {Object.entries(COURSE_STATUS_MAP).map(([key, value]) => (
                    <MenuItem key={key} value={key}>{value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả môn học"
                multiline
                rows={4}
                value={courseData.description}
                onChange={(e) => setCourseData({...courseData, description: e.target.value})}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="submit" variant="contained">Lưu thay đổi</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditCourseDialog;