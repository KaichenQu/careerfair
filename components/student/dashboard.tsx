'use client';
import Layout from '@/components/common/Layout';
import { useState, useEffect } from 'react';
import { studentAPI } from '@/services/api';
import { Box, Typography, Card, CardContent, Grid, Container, Button, Snackbar, Alert } from '@mui/material';

interface DashboardProps {
  userId: number;
}

interface CareerFair {
  fair_id: number;
  fair_name: string;
  careerfair_date: string;
  location: string;
  description: string;
  admin: number;
}

export default function Dashboard({ userId }: DashboardProps) {
  const [registeredFairs, setRegisteredFairs] = useState<CareerFair[]>([]);
  const [attendedFairs, setAttendedFairs] = useState<CareerFair[]>([]);
  const [error, setError] = useState<string>('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  useEffect(() => {
    const fetchCareerFairs = async () => {
      try {
        const data = await studentAPI.getCareerFair(userId);
        setRegisteredFairs(data.registered_fairs);
        setAttendedFairs(data.attended_fairs);
      } catch (err) {
        setError('Failed to fetch career fairs');
        console.error(err);
      }
    };

    fetchCareerFairs();
  }, [userId]);

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleWithdrawal = async (fairId: number) => {
    try {
      console.log(`Attempting to withdraw from fair ID: ${fairId}`);
      const response = await studentAPI.cancelRegisterCareerFair(fairId, userId);
      console.log('Withdrawal successful');
      
      // Update the registered fairs list after successful withdrawal
      setRegisteredFairs(registeredFairs.filter(fair => fair.fair_id !== fairId));
      console.log('Updated registered fairs list');
      
      // Show success message
      setSnackbar({
        open: true,
        message: response.message || 'Successfully withdrawn from career fair',
        severity: 'success'
      });
    } catch (err) {
      console.error('Withdrawal failed:', err);
      setError('Failed to withdraw from career fair');
      // Show error message
      setSnackbar({
        open: true,
        message: 'Failed to withdraw from career fair',
        severity: 'error'
      });
    }
  };

  const CareerFairCard = ({ fair, showWithdraw = false }: { fair: CareerFair, showWithdraw?: boolean }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{fair.fair_name}</Typography>
        <Typography color="textSecondary">Date: {fair.careerfair_date}</Typography>
        <Typography color="textSecondary">Location: {fair.location}</Typography>
        <Typography>{fair.description}</Typography>
        {showWithdraw && (
          <Button 
            variant="contained" 
            color="error" 
            sx={{ mt: 2 }}
            onClick={() => handleWithdrawal(fair.fair_id)}
          >
            Withdraw Registration
          </Button>
        )}
      </CardContent>
    </Card>
  );

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Layout>
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Career Fairs Dashboard</Typography>
        
        <Grid container spacing={4}>
          {/* Registered Fairs Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ mb: 2 }}>Registered Career Fairs</Typography>
            {registeredFairs.length > 0 ? (
              registeredFairs.map((fair) => (
                <CareerFairCard key={fair.fair_id} fair={fair} showWithdraw={true} />
              ))
            ) : (
              <Typography>No registered career fairs</Typography>
            )}
          </Grid>

          {/* Attended Fairs Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ mb: 2 }}>Attended Career Fairs</Typography>
            {attendedFairs.length > 0 ? (
              attendedFairs.map((fair) => (
                <CareerFairCard key={fair.fair_id} fair={fair} />
              ))
            ) : (
              <Typography>No attended career fairs</Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
    
    <Snackbar 
      open={snackbar.open} 
      autoHideDuration={6000} 
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert 
        onClose={handleCloseSnackbar} 
        severity={snackbar.severity}
        sx={{ width: '100%' }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
    </Layout>
  );
}
