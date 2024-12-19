import React from 'react';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { tuitionService } from '../../services/tuition.service';

interface VNPayButtonProps {
  tuitionId: string;
  amount: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

const VNPayButton: React.FC<VNPayButtonProps> = ({
  tuitionId,
  amount,
  onSuccess,
  onError
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = async () => {
    try {
      console.log('Initiating VNPay payment for tuition:', tuitionId);
      
      const { paymentUrl } = await tuitionService.createVNPayPayment(tuitionId);
      
      console.log('Received payment URL:', paymentUrl);
      
      if (paymentUrl) {
        window.location.href = paymentUrl;
        onSuccess?.();
      } else {
        throw new Error('Không nhận được URL thanh toán');
      }
    } catch (error) {
      console.error('Payment error:', error);
      enqueueSnackbar('Không thể tạo thanh toán', { variant: 'error' });
      onError?.(error as Error);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      sx={{
        backgroundColor: '#0071ba',
        '&:hover': {
          backgroundColor: '#005b95'
        }
      }}
    >
      Thanh toán VNPay
    </Button>
  );
};

export default VNPayButton; 