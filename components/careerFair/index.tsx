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
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getCareerFairs } from "../../services/careerFairService";
import Layout from "../common/Layout";
import Loading from "../common/Loading";

interface CareerFair {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  attendees: number;
}

const careerFairPage = () => {
  const [loading, setLoading] = useState(true);
  const [careerFairs, setCareerFairs] = useState<CareerFair[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCareerFairs = async () => {
      try {
        setLoading(true);
        const data = await getCareerFairs();
        setCareerFairs(data);
      } catch (error) {
        console.error("Error fetching career fairs:", error);
        toast.error("Failed to fetch career fairs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCareerFairs();
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
              {careerFairs.map((fair: CareerFair) => (
                <Grid item xs={12} md={6} lg={4} key={fair.id}>
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
                            <Typography>
                              {new Date(fair.date).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </Typography>
                          </Box>

                          <Box className="flex items-center space-x-2 text-gray-600">
                            <LocationOn className="text-blue-500" />
                            <Typography>{fair.location}</Typography>
                          </Box>

                          <Box className="flex items-center space-x-2 text-gray-600">
                            <People className="text-blue-500" />
                            <Typography>
                              {fair.attendees > 0
                                ? `${fair.attendees}+ Registered`
                                : "Registration Open"}
                            </Typography>
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
          )}
        </Container>
      </div>
    </Layout>
  );
};

export default careerFairPage;
