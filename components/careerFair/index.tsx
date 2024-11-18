"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Box,
  Skeleton,
} from "@mui/material";
import {
  Event as EventIcon,
  LocationOn,
  Business,
  People,
} from "@mui/icons-material";
import Layout from "../common/Layout";
import { useRouter } from "next/navigation";
import Loading from "../common/Loading";

// Sample data
const sampleCareerFairs = [
  {
    id: "cf001",
    name: "Tech Innovation Fair 2024",
    date: "April 15, 2024",
    location: "University Center Grand Hall",
    description:
      "Connect with leading tech companies and explore opportunities in software development, AI, and data science.",
    companies: ["Google", "Microsoft", "Amazon", "Meta", "Apple"],
    attendees: 500,
  },
  {
    id: "cf002",
    name: "Engineering Career Expo",
    date: "May 1, 2024",
    location: "Engineering Building Complex",
    description:
      "Meet top engineering firms and discover internship and full-time positions across all engineering disciplines.",
    companies: ["Boeing", "SpaceX", "Tesla", "Intel", "AMD"],
    attendees: 350,
  },
  {
    id: "cf003",
    name: "Business & Finance Summit",
    date: "May 20, 2024",
    location: "Business School Auditorium",
    description:
      "Network with financial institutions and consulting firms for roles in banking, consulting, and finance.",
    companies: ["Goldman Sachs", "JP Morgan", "McKinsey", "Deloitte", "KPMG"],
    attendees: 400,
  },
];

const careerFairPage = () => {
  const [loading, setLoading] = useState(true);
  const [careerFairs, setCareerFairs] = useState(sampleCareerFairs);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (fairId: string) => {
    router.push(`/careerFair/${fairId}/positions`);
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
              Discover upcoming career fairs and connect with your dream
              companies. Register early to secure your spot.
            </Typography>
          </div>

          {loading ? (
            <Loading />
          ) : (
            <Grid container spacing={4}>
              {careerFairs.map((fair, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <div
                    onClick={() => handleCardClick(fair.id)}
                    className="group h-full"
                  >
                    <Card className="h-full relative transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-white/80 backdrop-blur-sm border border-gray-100">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] to-purple-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardContent className="space-y-4 p-6">
                        <Typography
                          variant="h5"
                          className="font-bold text-gray-800"
                        >
                          {fair.name}
                        </Typography>

                        <Box className="space-y-3">
                          <Box className="flex items-center space-x-2 text-gray-600">
                            <EventIcon className="text-blue-500" />
                            <Typography>{fair.date}</Typography>
                          </Box>

                          <Box className="flex items-center space-x-2 text-gray-600">
                            <LocationOn className="text-blue-500" />
                            <Typography>{fair.location}</Typography>
                          </Box>

                          <Box className="flex items-center space-x-2 text-gray-600">
                            <People className="text-blue-500" />
                            <Typography>
                              {fair.attendees}+ Expected Attendees
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </div>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default careerFairPage;
