import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

interface DeleteConfirmDialogProps {
  open: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  title,
  content,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog; 