"use client";

import React, { useEffect, useState } from "react";
import { Container, Typography, Card, Box, Button, Chip } from "@mui/material";
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
                          fullWidth
                          color="error"
                          className="hover:bg-red-700"
                        >
                          Withdraw
                        </Button>
                        <Button 
                          variant="outlined" 
                          fullWidth 
                          color="primary"
                        >
                          Details
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
        </Container>
        <BackToTop />
      </div>
    </Layout>
  );
}
