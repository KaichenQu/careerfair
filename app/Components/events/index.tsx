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

// Sample data
const sampleCareerFairs = [
  {
    name: "Tech Innovation Fair 2024",
    date: "April 15, 2024",
    location: "University Center Grand Hall",
    description:
      "Connect with leading tech companies and explore opportunities in software development, AI, and data science.",
    companies: ["Google", "Microsoft", "Amazon", "Meta", "Apple"],
    attendees: 500,
  },
  {
    name: "Engineering Career Expo",
    date: "May 1, 2024",
    location: "Engineering Building Complex",
    description:
      "Meet top engineering firms and discover internship and full-time positions across all engineering disciplines.",
    companies: ["Boeing", "SpaceX", "Tesla", "Intel", "AMD"],
    attendees: 350,
  },
  {
    name: "Business & Finance Summit",
    date: "May 20, 2024",
    location: "Business School Auditorium",
    description:
      "Network with financial institutions and consulting firms for roles in banking, consulting, and finance.",
    companies: ["Goldman Sachs", "JP Morgan", "McKinsey", "Deloitte", "KPMG"],
    attendees: 400,
  },
];

const EventsPage = () => {
  const [loading, setLoading] = useState(true);
  const [careerFairs, setCareerFairs] = useState(sampleCareerFairs);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <Container maxWidth="lg" className="py-12">
        <Typography
          variant="h3"
          component="h1"
          className="mb-8 text-center font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
        >
          Upcoming Career Fairs
        </Typography>

        <Grid container spacing={4}>
          {(loading ? Array(3).fill(null) : careerFairs).map((fair, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              {loading ? (
                <Card className="h-full">
                  <CardContent className="space-y-4">
                    <Skeleton variant="text" height={40} />
                    <Skeleton variant="text" height={24} />
                    <Skeleton variant="text" height={24} />
                    <Skeleton variant="rectangular" height={100} />
                    <Skeleton variant="rectangular" height={60} />
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 transform rotate-45 translate-x-16 -translate-y-16" />
                  <CardContent className="space-y-4">
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

                    <Typography className="text-gray-600 min-h-[80px]">
                      {fair.description}
                    </Typography>

                    <Box>
                      <Typography
                        variant="subtitle2"
                        className="mb-2 font-semibold flex items-center text-gray-700"
                      >
                        <Business className="mr-2 text-blue-500" />
                        Participating Companies
                      </Typography>
                      <Box className="flex flex-wrap gap-2">
                        {fair.companies.map((company: string, idx: number) => (
                          <Chip
                            key={idx}
                            label={company}
                            size="small"
                            className="bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 border border-gray-200"
                          />
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default EventsPage;
