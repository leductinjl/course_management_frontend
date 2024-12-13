import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InstructorHeader from '../../components/instructor/InstructorHeader';
import Footer from '../../components/Footer';
import PersonalInfo from '../../components/instructor/PersonalInfo';
import { 
  Container, 
  Paper, 
  Grid, 
  Box, 
  Typography, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Button,
  IconButton,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VerifiedIcon from '@mui/icons-material/Verified';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { InstructorAchievement, InstructorCertificate, InstructorWorkHistory, CreateAchievementDTO, CreateCertificateDTO } from '../../types/instructor.types';
import { instructorService } from '../../services/instructor.service';
import { AchievementForm } from '../../components/instructor/AchievementForm';
import { CertificateForm } from '../../components/instructor/CertificateForm';
import { WorkHistoryForm } from '../../components/instructor/WorkHistoryForm';
import { CreateWorkHistoryDTO } from '../../types/instructor.types';
const InstructorInfo: React.FC = () => {
  const [instructor_id, setinstructor_id] = useState<string | null>(null);
  const [achievements, setAchievements] = useState<InstructorAchievement[]>([]);
  const [certificates, setCertificates] = useState<InstructorCertificate[]>([]);
  const [workHistory, setWorkHistory] = useState<InstructorWorkHistory[]>([]);
  const [openAchievementForm, setOpenAchievementForm] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<InstructorAchievement | null>(null);
  const [openCertificateForm, setOpenCertificateForm] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<InstructorCertificate | null>(null);
  const [openWorkHistoryForm, setOpenWorkHistoryForm] = useState(false);
  const [selectedWorkHistory, setSelectedWorkHistory] = useState<InstructorWorkHistory | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instructor = await instructorService.getCurrentInstructor();
        setinstructor_id(instructor.id);
        await loadData(instructor.id);
      } catch (error) {
        console.error('Error fetching instructor data:', error);
      }
    };

    fetchData();
  }, []);

  const loadData = async (id: string) => {
    try {
      const [achievementsData, certificatesData, workHistoryData] = await Promise.all([
        instructorService.getAchievements(id),
        instructorService.getCertificates(id),
        instructorService.getWorkHistory(id)
      ]);

      setAchievements(achievementsData);
      setCertificates(certificatesData);
      setWorkHistory(workHistoryData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleAchievementSubmit = async (data: CreateAchievementDTO) => {
    try {
      if (instructor_id) {
        if (selectedAchievement) {
          await instructorService.updateAchievement(instructor_id, selectedAchievement.id, data);
        } else {
          await instructorService.createAchievement(instructor_id, data);
        }
        await loadData(instructor_id);
        setOpenAchievementForm(false);
        setSelectedAchievement(null);
      }
    } catch (error) {
      console.error('Error handling achievement:', error);
    }
  };

  const handleDeleteAchievement = async (achievementId: string) => {
    try {
      if (instructor_id) {
        await instructorService.deleteAchievement(instructor_id, achievementId);
        await loadData(instructor_id);
      }
    } catch (error) {
      console.error('Error deleting achievement:', error);
    }
  };

  const handleCertificateSubmit = async (data: CreateCertificateDTO) => {
    try {
      if (instructor_id) {
        if (selectedCertificate) {
          await instructorService.updateCertificate(instructor_id, selectedCertificate.id, data);
        } else {
          await instructorService.createCertificate(instructor_id, data);
        }
        await loadData(instructor_id);
        setOpenCertificateForm(false);
        setSelectedCertificate(null);
      }
    } catch (error) {
      console.error('Error handling certificate:', error);
    }
  };

  const getInitialCertificateData = (cert: InstructorCertificate | null): CreateCertificateDTO | undefined => {
    if (!cert) return undefined;
    return {
      name: cert.name,
      issuer: cert.issuer,
      issue_year: cert.issue_year
    };
  };

  const getInitialWorkHistoryData = (history: InstructorWorkHistory | null): CreateWorkHistoryDTO | undefined => {
    if (!history) return undefined;
    return {
      position: history.position,
      department: history.department,
      start_date: history.start_date,
      end_date: history.end_date,
      responsibilities: history.responsibilities
    };
  };

  const getInitialAchievementData = (achievement: InstructorAchievement | null): CreateAchievementDTO | undefined => {
    if (!achievement) return undefined;
    return {
      title: achievement.title,
      description: achievement.description,
      achievementDate: achievement.achievementDate
    };
  };

  const handleDeleteCertificate = async (certificateId: string) => {
    try {
      if (instructor_id) {
        await instructorService.deleteCertificate(instructor_id, certificateId);
        await loadData(instructor_id);
      }
    } catch (error) {
      console.error('Error deleting certificate:', error);
    }
  };

  const handleWorkHistorySubmit = async (data: CreateWorkHistoryDTO) => {
    try {
      if (instructor_id) {
        if (selectedWorkHistory) {
          await instructorService.updateWorkHistory(instructor_id, selectedWorkHistory.id, data);
        } else {
          await instructorService.createWorkHistory(instructor_id, data);
        }
        await loadData(instructor_id);
        setOpenWorkHistoryForm(false);
        setSelectedWorkHistory(null);
      }
    } catch (error) {
      console.error('Error handling work history:', error);
    }
  };

  const handleDeleteWorkHistory = async (historyId: string) => {
    try {
      if (instructor_id) {
        await instructorService.deleteWorkHistory(instructor_id, historyId);
        await loadData(instructor_id);
      }
    } catch (error) {
      console.error('Error deleting work history:', error);
    }
  };

  return (
    <>
      <InstructorHeader />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <PersonalInfo />
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmojiEventsIcon color="primary" />
                  <Typography variant="h6">
                    Thành tích
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenAchievementForm(true)}
                >
                  Thêm thành tích
                </Button>
              </Box>
              <List>
                {achievements.map((achievement) => (
                  <ListItem
                    key={achievement.id}
                    secondaryAction={
                      <Box>
                        <IconButton onClick={() => {
                          setSelectedAchievement(achievement);
                          setOpenAchievementForm(true);
                        }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteAchievement(achievement.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={achievement.title}
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(achievement.achievementDate).toLocaleDateString()}
                          </Typography>
                          {achievement.description && (
                            <Typography variant="body2" color="text.secondary">
                              {achievement.description}
                            </Typography>
                          )}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SchoolIcon color="primary" />
                  <Typography variant="h6">
                    Chứng chỉ
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenCertificateForm(true)}
                >
                  Thêm chứng chỉ
                </Button>
              </Box>
              <List>
                {certificates.map((cert) => (
                  <ListItem
                    key={cert.id}
                    secondaryAction={
                      <Box>
                        <IconButton onClick={() => {
                          setSelectedCertificate(cert);
                          setOpenCertificateForm(true);
                        }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteCertificate(cert.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText
                      primary={cert.name}
                      secondary={`${cert.issuer} - ${cert.issue_year}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WorkHistoryIcon color="primary" />
                  <Typography variant="h6">
                    Quá trình công tác
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenWorkHistoryForm(true)}
                >
                  Thêm quá trình công tác
                </Button>
              </Box>
              {workHistory.map((history) => (
                <Box key={history.id} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {history.position}
                    </Typography>
                    <Box>
                      <IconButton onClick={() => {
                        setSelectedWorkHistory(history);
                        setOpenWorkHistoryForm(true);
                      }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteWorkHistory(history.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {history.department}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${new Date(history.start_date).toLocaleDateString()} - ${
                      history.end_date ? new Date(history.end_date).toLocaleDateString() : 'Hiện tại'
                    }`}
                  </Typography>
                  <List dense>
                    {history.responsibilities.map((resp, idx) => (
                      <ListItem key={idx}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <Box sx={{ width: 4, height: 4, bgcolor: 'primary.main', borderRadius: '50%' }} />
                        </ListItemIcon>
                        <ListItemText primary={resp} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
        
        <AchievementForm
          open={openAchievementForm}
          onClose={() => {
            setOpenAchievementForm(false);
            setSelectedAchievement(null);
          }}
          onSubmit={handleAchievementSubmit}
          initialData={getInitialAchievementData(selectedAchievement)}
        />
        
        <CertificateForm
          open={openCertificateForm}
          onClose={() => {
            setOpenCertificateForm(false);
            setSelectedCertificate(null);
          }}
          onSubmit={handleCertificateSubmit}
          initialData={getInitialCertificateData(selectedCertificate)}
        />

        <WorkHistoryForm
          open={openWorkHistoryForm}
          onClose={() => {
            setOpenWorkHistoryForm(false);
            setSelectedWorkHistory(null);
          }}
          onSubmit={handleWorkHistorySubmit}
          initialData={getInitialWorkHistoryData(selectedWorkHistory)}
        />
      </Container>
      <Footer />
    </>
  );
};

export default InstructorInfo; 