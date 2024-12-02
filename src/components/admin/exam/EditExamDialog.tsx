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

interface EditExamDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (examData: any) => void;
  examData: any;
}

const EditExamDialog: React.FC<EditExamDialogProps> = ({
  open,
  onClose,
  onSubmit,
  examData: initialExamData,
}) => {
  const [examData, setExamData] = React.useState(initialExamData);

  useEffect(() => {
    setExamData(initialExamData);
  }, [initialExamData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(examData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Chỉnh sửa kỳ thi</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mã kỳ thi"
                required
                value={examData.code}
                onChange={(e) => setExamData({...examData, code: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tên kỳ thi"
                required
                value={examData.name}
                onChange={(e) => setExamData({...examData, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Môn học"
                required
                value={examData.course}
                onChange={(e) => setExamData({...examData, course: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ngày thi"
                type="date"
                required
                InputLabelProps={{ shrink: true }}
                value={examData.date}
                onChange={(e) => setExamData({...examData, date: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Thời gian"
                type="time"
                required
                InputLabelProps={{ shrink: true }}
                value={examData.time}
                onChange={(e) => setExamData({...examData, time: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Thời gian làm bài"
                required
                value={examData.duration}
                onChange={(e) => setExamData({...examData, duration: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Địa điểm"
                required
                value={examData.location}
                onChange={(e) => setExamData({...examData, location: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Loại kỳ thi</InputLabel>
                <Select
                  value={examData.type}
                  label="Loại kỳ thi"
                  onChange={(e) => setExamData({...examData, type: e.target.value})}
                >
                  <MenuItem value="online">Online</MenuItem>
                  <MenuItem value="offline">Offline</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả"
                multiline
                rows={4}
                value={examData.description}
                onChange={(e) => setExamData({...examData, description: e.target.value})}
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

export default EditExamDialog; 