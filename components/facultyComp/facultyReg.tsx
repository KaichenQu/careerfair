"use client";

import React, { useEffect, useState } from "react";
import { Container, Typography, Card, Box, Button, Chip, Snackbar, Alert } from "@mui/material";
import {
  Event as EventIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
import { facultyAPI, type FacultyDashboardData, type FacultyCareerFair } from "@/services/api";
import BackToTop from "@/components/common/BackToTop";
import Layout from "@/components/common/Layout";
import Loading from "@/components/common/Loading";

export default function RegisteredCareerFairPage() {
  const [loading, setLoading] = React.useState(true);
  const [registeredFairs, setRegisteredFairs] = useState<FacultyCareerFair[]>([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  useEffect(() => {
    const loadRegisteredFairs = () => {
      try {
        const storedFairs = localStorage.getItem('registeredFairs');
        if (storedFairs) {
          setRegisteredFairs(JSON.parse(storedFairs));
        }
      } catch (error) {
        console.error("Error loading registered fairs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRegisteredFairs();
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleWithdrawal = async (fairId: number) => {
    try {
      console.log('All localStorage items:', { ...localStorage });
      const userId = localStorage.getItem('user_id');
      console.log('Retrieved userId:', userId);
      
      if (!userId) {
        throw new Error('User ID not found in localStorage');
      }

      console.log('Making API call with:', {
        fairId,
        userId,
        url: `http://127.0.0.1:8000/careerFair/${fairId}/cancelRegister/`
      });

      const response = await fetch(`http://127.0.0.1:8000/careerFair/${fairId}/cancelRegister/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          user_id: userId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to withdraw');
      }

      const data = await response.json();
      console.log('Withdrawal successful:', data);

      const updatedFairs = registeredFairs.filter(fair => fair.fair_id !== fairId);
      setRegisteredFairs(updatedFairs);
      localStorage.setItem('registeredFairs', JSON.stringify(updatedFairs));

      setSnackbar({
        open: true,
        message: data.message || 'Successfully withdrawn from career fair',
        severity: 'success'
      });
    } catch (err) {
      console.error('Withdrawal failed:', err);
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : 'Failed to withdraw from career fair',
        severity: 'error'
      });
    }
  };

  const handleConfirmAttendance = async (fairId: number) => {
    console.log('Attempting to confirm attendance for fair:', fairId);
    console.log('All localStorage items:', { ...localStorage });
    try {
      const userId = localStorage.getItem('user_id');
      console.log('Retrieved userId:', userId);
      if (!userId) {
        throw new Error('User ID not found');
      }

      // First mark as attended
      const attendResponse = await fetch(`http://127.0.0.1:8000/careerFair/${fairId}/attend/`, {
        method: 'POST',  // Make sure this matches your backend expectation
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          user_id: userId 
        }),
      });

      if (!attendResponse.ok) {
        const errorData = await attendResponse.json();
        throw new Error(errorData.message || 'Failed to mark attendance');
      }

      // Then cancel the registration
      const cancelResponse = await fetch(`http://127.0.0.1:8000/careerFair/${fairId}/cancelRegister/`, {
        method: 'DELETE',  // Changed from DELETE to POST - adjust based on your backend
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          user_id: userId 
        }),
      });

      if (!cancelResponse.ok) {
        const errorData = await cancelResponse.json();
        throw new Error(errorData.message || 'Failed to cancel registration');
      }

      // Update the UI and localStorage
      const updatedFairs = registeredFairs.filter(fair => fair.fair_id !== fairId);
      setRegisteredFairs(updatedFairs);
      localStorage.setItem('registeredFairs', JSON.stringify(updatedFairs));

      setSnackbar({
        open: true,
        message: 'Successfully confirmed attendance',
        severity: 'success'
      });

    } catch (err) {
      console.error('Failed to confirm attendance:', err);
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : 'Failed to confirm attendance',
        severity: 'error'
      });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <Container maxWidth="lg" className="py-12">
          <Typography
            variant="h3"
            component="h1"
            className="mb-8 text-center font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
          >
            My Registered Career Fairs
          </Typography>

          <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registeredFairs.map((fair) => (
              <div key={fair.fair_id} className="cursor-pointer group">
                <Card className="h-full p-6 relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-white">
                  <Box className="flex flex-col h-full">
                    <Typography variant="h5" className="font-bold text-gray-800 mb-4">
                      {fair.fair_name}
                    </Typography>

                    <Box className="flex items-center gap-2 mb-3 text-gray-600">
                      <EventIcon className="text-blue-500" />
                      <Typography>
                        {new Date(fair.careerfair_date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Typography>
                    </Box>

                    <Box className="flex items-center gap-2 mb-4 text-gray-600">
                      <LocationIcon className="text-blue-500" />
                      <Typography>{fair.location}</Typography>
                    </Box>

                    <Box className="mt-auto">
                      <Box className="flex gap-2">
                        <Button
                          variant="contained"
                          color="error"
                          className="hover:bg-red-700"
                          onClick={() => handleWithdrawal(fair.fair_id)}
                        >
                          Withdraw
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          className="hover:bg-green-700"
                          onClick={() => handleConfirmAttendance(fair.fair_id)}
                        >
                          Confirm Attendance
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </div>
            ))}
          </Box>

          {registeredFairs.length === 0 && (
            <Card className="p-8 text-center">
              <Typography variant="h6" className="text-gray-600">
                You haven't registered for any career fairs yet.
              </Typography>
              <Typography className="text-gray-500 mt-2">
                Browse available career fairs to register.
              </Typography>
            </Card>
          )}

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
        </Container>
        <BackToTop />
      </div>
    </Layout>
  );
}
