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

interface EditClassDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (classData: any) => void;
  classData: any;
}

const EditClassDialog: React.FC<EditClassDialogProps> = ({
  open,
  onClose,
  onSubmit,
  classData: initialClassData,
}) => {
  const [classData, setClassData] = React.useState(initialClassData);

  useEffect(() => {
    setClassData(initialClassData);
  }, [initialClassData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(classData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Chỉnh sửa lớp học</DialogTitle>
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

export default EditClassDialog; 