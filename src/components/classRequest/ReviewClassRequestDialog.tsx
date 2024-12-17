import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
} from '@mui/material';
import { ClassRequest } from '../../types/classRequest.types';
import AddClassDialog from '../admin/class/AddClassDialog';
import { CreateClassDTO } from '../../types/class.types';
import dayjs from 'dayjs';

interface ReviewClassRequestDialogProps {
  open: boolean;
  onClose: () => void;
  request: ClassRequest;
  onApprove: (request: ClassRequest, notes: string, classData: CreateClassDTO) => Promise<void>;
  onReject: (request: ClassRequest, notes: string) => void;
}

const ReviewClassRequestDialog: React.FC<ReviewClassRequestDialogProps> = ({
  open,
  onClose,
  request,
  onApprove,
  onReject,
}) => {
  const [notes, setNotes] = useState('');
  const [showAddClass, setShowAddClass] = useState(false);

  const handleApproveClick = () => {
    setShowAddClass(true);
  };

  const handleAddClass = async (classData: CreateClassDTO) => {
    try {
      await onApprove(request, notes, classData);
      setShowAddClass(false);
      onClose();
    } catch (error) {
      // Error is handled by parent component
    }
  };

  const getInitialClassData = () => ({
    course_id: request.course.id,
    instructor_id: request.instructor.id,
    start_date: dayjs(request.desired_start_date),
    end_date: null,
    schedule: request.schedule_note,
    room: '',
    capacity: request.expected_students.toString(),
    status: 'upcoming'
  });

  return (
    <>
      <Dialog open={open && !showAddClass} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Xem xét yêu cầu mở lớp</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Môn học</Typography>
              <Typography>
                {request.course.name} ({request.course.code})
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2">Giảng viên</Typography>
              <Typography>{request.instructor.full_name}</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ghi chú"
                multiline
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button
            onClick={() => onReject(request, notes)}
            variant="contained"
            color="error"
          >
            Từ chối
          </Button>
          <Button
            onClick={handleApproveClick}
            variant="contained"
            color="primary"
          >
            Tiếp tục phê duyệt
          </Button>
        </DialogActions>
      </Dialog>

      <AddClassDialog
        open={showAddClass}
        onClose={() => setShowAddClass(false)}
        onSubmit={handleAddClass}
        defaultValues={getInitialClassData()}
      />
    </>
  );
};

export default ReviewClassRequestDialog;
