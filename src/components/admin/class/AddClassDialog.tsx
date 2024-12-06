import React from 'react';
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

interface AddClassDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (classData: any) => void;
}

const AddClassDialog: React.FC<AddClassDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [classData, setClassData] = React.useState({
    code: '',
    courseId: '',
    instructorId: '',
    schedule: '',
    startDate: '',
    endDate: '',
    maxStudents: '',
    room: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(classData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Thêm lớp học mới</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mã lớp"
                required
                value={classData.code}
                onChange={(e) => setClassData({...classData, code: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Môn học</InputLabel>
                <Select
                  value={classData.courseId}
                  label="Môn học"
                  onChange={(e) => setClassData({...classData, courseId: e.target.value})}
                >
                  <MenuItem value="CS101">Lập trình cơ bản</MenuItem>
                  <MenuItem value="CS102">Cấu trúc dữ liệu</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Giảng viên</InputLabel>
                <Select
                  value={classData.instructorId}
                  label="Giảng viên"
                  onChange={(e) => setClassData({...classData, instructorId: e.target.value})}
                >
                  <MenuItem value="INS001">Nguyễn Văn A</MenuItem>
                  <MenuItem value="INS002">Trần Thị B</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phòng học"
                required
                value={classData.room}
                onChange={(e) => setClassData({...classData, room: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Lịch học"
                required
                placeholder="T2,T4 (7:30-9:30)"
                value={classData.schedule}
                onChange={(e) => setClassData({...classData, schedule: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số học viên tối đa"
                type="number"
                required
                value={classData.maxStudents}
                onChange={(e) => setClassData({...classData, maxStudents: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ngày bắt đầu"
                type="date"
                required
                InputLabelProps={{ shrink: true }}
                value={classData.startDate}
                onChange={(e) => setClassData({...classData, startDate: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ngày kết thúc"
                type="date"
                required
                InputLabelProps={{ shrink: true }}
                value={classData.endDate}
                onChange={(e) => setClassData({...classData, endDate: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả"
                multiline
                rows={4}
                value={classData.description}
                onChange={(e) => setClassData({...classData, description: e.target.value})}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="submit" variant="contained">Thêm lớp học</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddClassDialog; 