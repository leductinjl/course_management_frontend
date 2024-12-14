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

interface AddCertificateDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (certificateData: any) => void;
}

const AddCertificateDialog: React.FC<AddCertificateDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [certificateData, setCertificateData] = React.useState({
    code: '',
    name: '',
    type: '',
    issue_date: '',
    expiryDate: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(certificateData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Thêm chứng chỉ mới</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mã chứng chỉ"
                required
                value={certificateData.code}
                onChange={(e) => setCertificateData({...certificateData, code: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tên chứng chỉ"
                required
                value={certificateData.name}
                onChange={(e) => setCertificateData({...certificateData, name: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Loại chứng chỉ</InputLabel>
                <Select
                  value={certificateData.type}
                  label="Loại chứng chỉ"
                  onChange={(e) => setCertificateData({...certificateData, type: e.target.value})}
                >
                  <MenuItem value="language">Ngoại ngữ</MenuItem>
                  <MenuItem value="it">Công nghệ thông tin</MenuItem>
                  <MenuItem value="professional">Chứng chỉ nghề</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ngày cấp"
                type="date"
                required
                InputLabelProps={{ shrink: true }}
                value={certificateData.issue_date}
                onChange={(e) => setCertificateData({...certificateData, issue_date: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ngày hết hạn"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={certificateData.expiryDate}
                onChange={(e) => setCertificateData({...certificateData, expiryDate: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả chứng chỉ"
                multiline
                rows={4}
                value={certificateData.description}
                onChange={(e) => setCertificateData({...certificateData, description: e.target.value})}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="submit" variant="contained">Thêm chứng chỉ</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddCertificateDialog; 