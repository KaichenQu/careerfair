'use client';
import { useState, useEffect } from 'react';
import { studentAPI } from '@/services/api';
import { Box, Typography, Card, CardContent, Grid, Container } from '@mui/material';

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

  const CareerFairCard = ({ fair }: { fair: CareerFair }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{fair.fair_name}</Typography>
        <Typography color="textSecondary">Date: {fair.careerfair_date}</Typography>
        <Typography color="textSecondary">Location: {fair.location}</Typography>
        <Typography>{fair.description}</Typography>
      </CardContent>
    </Card>
  );

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>Career Fairs Dashboard</Typography>
        
        <Grid container spacing={4}>
          {/* Registered Fairs Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ mb: 2 }}>Registered Career Fairs</Typography>
            {registeredFairs.length > 0 ? (
              registeredFairs.map((fair) => (
                <CareerFairCard key={fair.fair_id} fair={fair} />
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
  );
}
