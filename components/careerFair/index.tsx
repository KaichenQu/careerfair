"use client";

import { useState, useEffect, useRef } from 'react';
import { Event as EventIcon, LocationOn, People } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Button,
  Alert,
  Snackbar,
  AlertColor,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Layout from "../common/Layout";
import { useAuth } from '../contexts/AuthContext';
import axios, { AxiosError } from 'axios';
import { loginUser } from '@/services/api';
import AuthLayout from '../layouts/AuthLayout';

let BaseURL = "http://127.0.0.1:8000";

// Define the static career fair data array
const staticCareerFairs = [
  {
    fair_id: 1,
    fair_name: "Summer Career Fair",
    careerfair_date: "2024-11-15",
    location: "Main Hall",
    description: "Annual career fair.",
    attendees: 0,
  },
  {
    fair_id: 2,
    fair_name: "Fall Tech Expo",
    careerfair_date: "2024-09-20",
    location: "Engineering Building",
    description: "Technology focused career fair.",
    attendees: 0,
  },
  {
    fair_id: 3,
    fair_name: "Spring Job Fair",
    careerfair_date: "2025-03-15",
    location: "Student Center",
    description: "Multi-industry career fair.",
    attendees: 0,
  },
];

const CareerFairPage = () => {
  const auth = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Add state for snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' as AlertColor
  });

  const handleRegister = async (fairId: number) => {
    if (!auth.isAuthenticated || !auth.user?.id) {
      router.push('/login');
      return;
    }

    try {
      const url = `${BaseURL}/careerFair/${fairId}/register/`;
      const payload = {
        user_id: auth.user.id,
        career_fair_id: fairId
      };

      const response = await axios.post(url, payload);
      setSnackbar({
        open: true,
        message: response.data.message,
        severity: 'success'
      });
      console.log('Registration details:', response.data.data);
      console.log('Full response:', response.data);
      console.log('Message:', response.data.message);
      console.log('Data:', response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Error details:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          url: error.config?.url,
          payload: error.config?.data
        });
        setSnackbar({
          open: true,
          message: error.response?.data?.error || 'Failed to register for the career fair',
          severity: 'error'
        });
      }
    }
  };

  // Add snackbar close handler
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <AuthLayout>
      <Layout>
        {!isLoading && (
          <>
            {auth.isAuthenticated ? (
              <div>Welcome!</div>
            ) : (
              <div>Please log in</div>
            )}
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
              <Container maxWidth="lg" className="py-16">
                <Box className="text-center mb-16">
                  <Typography
                    variant="h3"
                    component="h1"
                    className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mx-auto"
                    align="center"
                  >
                    Upcoming Career Fairs
                  </Typography>
                  <Typography
                    variant="h6"
                    className="text-gray-600 font-normal max-w-2xl mx-auto"
                    align="center"
                    paragraph
                  >
                    Discover our upcoming career fairs and connect with your dream
                    companies. Register early to secure your spot.
                  </Typography>
                </Box>

                <Grid container spacing={4}>
                  {staticCareerFairs.map((fair) => (
                    <Grid item xs={12} md={6} lg={4} key={fair.fair_id}>
                      <div
                        className="group h-full"
                      >
                        <Card className="h-full relative transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-white/80 backdrop-blur-sm border border-gray-100">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] to-purple-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity" />
                          <CardContent className="space-y-4 p-6">
                            <Typography
                              variant="h5"
                              className="font-bold text-gray-800"
                            >
                              {fair.fair_name}
                            </Typography>

                            <Box className="space-y-3">
                              <Box className="flex items-center space-x-2 text-gray-600">
                                <EventIcon className="text-blue-500" />
                                <Typography>
                                  {new Date(fair.careerfair_date).toLocaleDateString(
                                    "en-US",
                                    {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
                                </Typography>
                              </Box>

                              <Box className="flex items-center space-x-2 text-gray-600">
                                <LocationOn className="text-blue-500" />
                                <Typography>{fair.location}</Typography>
                              </Box>

                              <Box className="flex items-center space-x-2 text-gray-600">
                                <People className="text-blue-500" />
                                <Typography>Registration Open</Typography>
                              </Box>

                              <Typography variant="body2" color="textSecondary">
                                {fair.description}
                              </Typography>

                              <Button
                                variant="contained"
                                color="primary"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent card click when clicking button
                                  handleRegister(fair.fair_id);
                                }}
                                className="mt-4 w-full"
                              >
                                Register
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </div>
          </>
        )}
      </Layout>
      
      {/* Add Snackbar at the bottom of the return statement */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AuthLayout>
  );
};

export default CareerFairPage;
