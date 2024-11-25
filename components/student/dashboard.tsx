'use client';
import Layout from '@/components/common/Layout';
import { useState, useEffect } from 'react';
import { studentAPI } from '@/services/api';
import { Box, Typography, Card, CardContent, Grid, Container, Button, Snackbar, Alert } from '@mui/material';
import { parseISO, isBefore, startOfDay } from 'date-fns';

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

  const handleConfirmAttendance = async (fairId: number) => {
    try {
      // First mark as attended
      console.log('Attempting to mark attendance for fair:', fairId);
      const attendResponse = await studentAPI.attendCareerFair(fairId, userId);
      console.log('Attendance marked successfully:', attendResponse);
      
      try {
        // Then cancel the registration
        console.log('Attempting to cancel registration for fair:', fairId);
        const cancelResponse = await studentAPI.cancelRegisterCareerFair(fairId, userId);
        console.log('Registration cancelled successfully:', cancelResponse);
      } catch (cancelErr) {
        console.error('Failed to cancel registration, but attendance was marked:', cancelErr);
        // Even if cancellation fails, we'll still update the UI since attendance was marked
      }
      
      // Update both lists
      const confirmedFair = registeredFairs.find(fair => fair.fair_id === fairId);
      if (confirmedFair) {
        setRegisteredFairs(prev => prev.filter(fair => fair.fair_id !== fairId));
        setAttendedFairs(prev => [...prev, confirmedFair]);
      }

      setSnackbar({
        open: true,
        message: 'Successfully confirmed attendance',
        severity: 'success'
      });
    } catch (err) {
      console.error('Failed to mark attendance:', err);
      setSnackbar({
        open: true,
        message: 'Failed to confirm attendance. Please try again or contact support.',
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
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => handleWithdrawal(fair.fair_id)}
            >
              Withdraw Registration
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              onClick={() => handleConfirmAttendance(fair.fair_id)}
            >
              Confirm Attendance
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  const splitAttendedFairs = (fairs: CareerFair[]) => {
    const today = startOfDay(new Date());
    
    return {
      upcoming: fairs.filter(fair => !isBefore(parseISO(fair.careerfair_date), today)),
      history: fairs.filter(fair => isBefore(parseISO(fair.careerfair_date), today))
    };
  };

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
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 2 }}>Registered Career Fairs</Typography>
            {registeredFairs.length > 0 ? (
              registeredFairs.map((fair) => (
                <CareerFairCard key={fair.fair_id} fair={fair} showWithdraw={true} />
              ))
            ) : (
              <Typography>No registered career fairs</Typography>
            )}
          </Grid>

          {/* Upcoming Attended Fairs Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ mb: 2 }}>Upcoming Attended Fairs</Typography>
            {splitAttendedFairs(attendedFairs).upcoming.length > 0 ? (
              splitAttendedFairs(attendedFairs).upcoming.map((fair) => (
                <CareerFairCard key={fair.fair_id} fair={fair} />
              ))
            ) : (
              <Typography>No upcoming attended career fairs</Typography>
            )}
          </Grid>

          {/* Historical Attended Fairs Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ mb: 2 }}>Past Attended Fairs</Typography>
            {splitAttendedFairs(attendedFairs).history.length > 0 ? (
              splitAttendedFairs(attendedFairs).history.map((fair) => (
                <CareerFairCard key={fair.fair_id} fair={fair} />
              ))
            ) : (
              <Typography>No past attended career fairs</Typography>
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
