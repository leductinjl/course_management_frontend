import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

export interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (item?: any) => void;
  title: string;
  message: React.ReactNode;
  item?: any;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  item
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title || 'Xác nhận xóa'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {typeof message === 'string' ? (
            message
          ) : (
            message
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={() => onConfirm(item)} color="error" variant="contained">
          Xác nhận xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog; 