import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Certificates: React.FC = () => {
  const certificates = [
    {
      id: 1,
      name: 'Chứng chỉ Tin học văn phòng',
      issue_date: '2024-01-20',
      grade: 'Khá',
      downloadUrl: '#',
      viewUrl: '#',
    },
    {
      id: 2,
      name: 'Chứng chỉ Tiếng Anh B1',
      issue_date: '2024-02-15',
      grade: 'Giỏi',
      downloadUrl: '#',
      viewUrl: '#',
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Chứng chỉ
      </Typography>
      <Grid container spacing={3}>
        {certificates.map((cert) => (
          <Grid item xs={12} md={6} key={cert.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {cert.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ngày cấp: {cert.issue_date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Xếp loại: {cert.grade}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={() => window.open(cert.viewUrl)}
                >
                  Xem
                </Button>
                <Button
                  size="small"
                  startIcon={<DownloadIcon />}
                  onClick={() => window.open(cert.downloadUrl)}
                >
                  Tải xuống
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Certificates; 