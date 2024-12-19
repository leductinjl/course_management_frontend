import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import { tuitionService } from '../../services/tuition.service';

const VNPayReturn: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePaymentReturn = async () => {
      try {
        // Convert URLSearchParams to plain object
        const params = Object.fromEntries(searchParams.entries());
        const response = await tuitionService.handleVNPayReturn(params);

        if (response.success) {
          enqueueSnackbar('Thanh toán thành công', { variant: 'success' });
        } else {
          enqueueSnackbar('Thanh toán thất bại', { variant: 'error' });
        }
      } catch (error: any) {
        console.error('Payment return error:', error);
        enqueueSnackbar(error.message || 'Có lỗi xảy ra', { variant: 'error' });
      } finally {
        setLoading(false);
        // Redirect về trang học phí sau 2 giây
        setTimeout(() => {
          navigate('/student-info');
        }, 2000);
      }
    };

    handlePaymentReturn();
  }, [searchParams, navigate, enqueueSnackbar]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2
      }}
    >
      {loading ? (
        <>
          <CircularProgress />
          <Typography>Đang xử lý kết quả thanh toán...</Typography>
        </>
      ) : (
        <Typography>
          Đang chuyển hướng về trang học phí...
        </Typography>
      )}
    </Box>
  );
};

export default VNPayReturn; 