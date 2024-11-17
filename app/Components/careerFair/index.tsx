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
      <Container maxWidth="lg" className="py-12">
        <Typography
          variant="h3"
          component="h1"
          className="mb-8 text-center font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
        >
          Upcoming Career Fairs
        </Typography>

        {loading ? (
          <Loading />
        ) : (
          <Grid container spacing={4}>
            {careerFairs.map((fair, index) => (
              <Grid item xs={12} md={6} lg={4} key={index} className="flex">
                <div
                  onClick={() => handleCardClick(fair.id)}
                  className="cursor-pointer group w-full"
                >
                  <Card className="h-full relative transform transition-all duration-300 hover:-translate-y-2">
                    {/* Folded corner effect */}
                    <div className="absolute top-0 right-0 w-24 h-24 transition-transform duration-300 origin-top-right group-hover:scale-110">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/20 to-transparent transform rotate-45" />
                      <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                        <div className="absolute top-0 right-0 w-[141%] h-[141%] bg-white transform origin-top-right -rotate-45 translate-x-2 -translate-y-2 shadow-lg" />
                      </div>
                      <div className="absolute top-3 right-3 transform rotate-45 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Typography variant="caption" className="font-semibold">
                          View
                        </Typography>
                      </div>
                    </div>

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
    </Layout>
  );
};

export default careerFairPage;
