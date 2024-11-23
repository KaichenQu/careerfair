"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/common/Layout";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import {
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Description as DescriptionIcon,
  Analytics as AnalyticsIcon,
} from "@mui/icons-material";

interface CareerFair {
  fair_id: string;
  name: string;
  date: string;
  location: string;
  description: string;
}

const staticCareerFairs = [
  {
    fair_id: "1",
    name: "Summer Career Fair",
    date: "2024-11-15",
    location: "Main Hall",
    description: "Annual career fair.",
  },
  {
    fair_id: "2",
    name: "Fall Tech Expo",
    date: "2024-09-20",
    location: "Engineering Building",
    description: "Technology focused career fair.",
  },
  {
    fair_id: "3",
    name: "Spring Job Fair",
    date: "2025-03-15",
    location: "Student Center",
    description: "Multi-industry career fair.",
  },
];

export default function AnalysisSelectionPage() {
  const router = useRouter();
  const [careerFairs] = useState<CareerFair[]>(staticCareerFairs);
  const [loading] = useState(false);

  const handleSelectFair = (fairId: string) => {
    router.push(`/admin/analysis/${fairId}`);
  };

  if (loading) {
    return (
      <Layout>
        <Box className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500" />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="lg" className="py-8">
        <Box className="text-center mb-8">
          <Typography
            variant="h3"
            className="font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
          >
            Career Fair Analysis
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Select a career fair to view detailed analytics and insights
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {careerFairs.map((fair) => (
            <Grid item xs={12} md={6} lg={4} key={fair.fair_id}>
              <Card
                className="h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                sx={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <CardContent className="p-6">
                  <Box className="mb-4">
                    <AnalyticsIcon
                      sx={{ fontSize: 40, color: "#3b82f6", mb: 2 }}
                    />
                    <Typography
                      variant="h5"
                      className="font-bold mb-2 text-gray-800"
                    >
                      {fair.name}
                    </Typography>
                  </Box>

                  <Box className="space-y-3 mb-6">
                    <Box className="flex items-center text-gray-600">
                      <CalendarIcon className="mr-2" />
                      <Typography>
                        {new Date(fair.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box className="flex items-center text-gray-600">
                      <LocationIcon className="mr-2" />
                      <Typography>{fair.location}</Typography>
                    </Box>
                    <Box className="flex items-center text-gray-600">
                      <DescriptionIcon className="mr-2" />
                      <Typography>{fair.description}</Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleSelectFair(fair.fair_id)}
                    sx={{
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                      textTransform: "none",
                      py: 1.5,
                      fontSize: "1rem",
                    }}
                  >
                    View Analysis
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
}
