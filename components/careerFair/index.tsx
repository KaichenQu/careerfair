"use client";

import { Event as EventIcon, LocationOn, People } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Layout from "../common/Layout";

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
  const router = useRouter();

  const handleCardClick = (fairId: number) => {
    if (fairId === 1) {
      router.push(`/careerFair/${fairId}/positions`);
    } else {
      // Show "Not Shown" message for other fairs
      alert("Details not available for this career fair.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Container maxWidth="lg" className="py-16">
          <div className="text-center mb-16">
            <Typography
              variant="h3"
              component="h1"
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
            >
              Upcoming Career Fairs
            </Typography>
            <Typography
              variant="h6"
              className="text-gray-600 font-normal max-w-2xl mx-auto"
            >
              Discover our upcoming career fairs and connect with your dream
              companies. Register early to secure your spot.
            </Typography>
          </div>

          <Grid container spacing={4}>
            {staticCareerFairs.map((fair) => (
              <Grid item xs={12} md={6} lg={4} key={fair.fair_id}>
                <div
                  onClick={() => handleCardClick(fair.fair_id)}
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
                      </Box>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </Layout>
  );
};

export default CareerFairPage;
