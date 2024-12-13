import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import AddCertificateDialog from './certificate/AddCertificateDialog';
import { useDeleteConfirmation } from '../../hooks/useDeleteConfirmation';
import DeleteConfirmDialog from './common/DeleteConfirmDialog';
import EditCertificateDialog from './certificate/EditCertificateDialog';

const CertificateManagement = () => {
  const [certificates, setCertificates] = useState([
    { 
      id: 1, 
      code: 'CERT001', 
      name: 'Chứng chỉ Tiếng Anh B1', 
      type: 'Ngoại ngữ',
      issue_date: '2024-03-15',
      expiryDate: '2026-03-15',
      status: 'Có hiệu lực' 
    },
    { 
      id: 2, 
      code: 'CERT002', 
      name: 'Chứng chỉ Tin học văn phòng', 
      type: 'Công nghệ thông tin',
      issue_date: '2024-02-20',
      expiryDate: '2026-02-20',
      status: 'Có hiệu lực' 
    },
  ]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);

  const handleAddCertificate = (certificateData: any) => {
    setCertificates([...certificates, {
      id: certificates.length + 1,
      ...certificateData,
      status: 'Có hiệu lực'
    }]);
  };

  const handleDeleteCertificate = async (certificate: any) => {
    try {
      // await certificateApi.delete(certificate.id);
      setCertificates(certificates.filter(c => c.id !== certificate.id));
    } catch (error) {
      console.error('Failed to delete certificate:', error);
    }
  };

  const handleEditCertificate = (certificateData: any) => {
    setCertificates(certificates.map(cert => 
      cert.id === selectedCertificate.id ? { ...cert, ...certificateData } : cert
    ));
    setOpenEditDialog(false);
  };

  const openEdit = (certificate: any) => {
    setSelectedCertificate(certificate);
    setOpenEditDialog(true);
  };

  const { dialogProps, handleOpen: openDelete } = useDeleteConfirmation({
    onDelete: handleDeleteCertificate,
    getMessage: (cert) => `Bạn có chắc chắn muốn xóa chứng chỉ "${cert.name}" không?`,
    getTitle: () => "Xóa chứng chỉ"
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Quản lý chứng chỉ</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
        >
          Thêm chứng chỉ
        </Button>
      </Box>

      <AddCertificateDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        onSubmit={handleAddCertificate}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã chứng chỉ</TableCell>
              <TableCell>Tên chứng chỉ</TableCell>
              <TableCell>Loại</TableCell>
              <TableCell>Ngày cấp</TableCell>
              <TableCell>Ngày hết hạn</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certificates.map((certificate) => (
              <TableRow key={certificate.id}>
                <TableCell>{certificate.code}</TableCell>
                <TableCell>{certificate.name}</TableCell>
                <TableCell>
                  <Chip 
                    label={certificate.type}
                    color={
                      certificate.type === 'Ngoại ngữ' ? 'primary' :
                      certificate.type === 'Công nghệ thông tin' ? 'secondary' : 'default'
                    }
                  />
                </TableCell>
                <TableCell>{certificate.issue_date}</TableCell>
                <TableCell>{certificate.expiryDate}</TableCell>
                <TableCell>
                  <Chip 
                    label={certificate.status}
                    color={certificate.status === 'Có hiệu lực' ? 'success' : 'error'}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => openEdit(certificate)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => openDelete(certificate)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedCertificate && (
        <EditCertificateDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          onSubmit={handleEditCertificate}
          certificateData={selectedCertificate}
        />
      )}

      <DeleteConfirmDialog {...dialogProps} />
    </Box>
  );
};

export default CertificateManagement; 