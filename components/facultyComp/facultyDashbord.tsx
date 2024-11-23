"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  Box,
  Button,
  Grid,
  Divider,
  Skeleton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import {
  facultyAPI,
  type FacultyProfile,
  type FacultyCareerFair,
} from "@/services/api";
import Layout from "../common/Layout";
import {
  Dashboard as DashboardIcon,
  Edit as EditIcon,
  EventAvailable as RegisterIcon,
  History as HistoryIcon,
} from "@mui/icons-material";
import Image from "next/image";
import Loading from "@/components/common/Loading";

const FacultyProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<FacultyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await facultyAPI.getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const ProfileField = ({
    label,
    value,
  }: {
    label: string;
    value: string | undefined;
  }) => (
    <Box className="mb-6 text-center">
      <Typography variant="h6" className="text-gray-600 font-medium mb-2">
        {label}
      </Typography>
      <Typography variant="h5" className="text-gray-800">
        {value || "Not provided"}
      </Typography>
    </Box>
  );

  const handleAttendanceHistory = async () => {
    try {
      if (!profile?.faculty_id) return;
      const data = await facultyAPI.getDashboard(profile.faculty_id);
      localStorage.setItem("attendedFairs", JSON.stringify(data));
      router.push(`/faculty/${profile.faculty_id}/attend`);
    } catch (error) {
      console.error("Error fetching attendance history:", error);
    }
  };

  const handleRegisteredFairs = async () => {
    try {
      const storedUserId = localStorage.getItem("user_id");
      if (!storedUserId) return;

      const data = await facultyAPI.getDashboard(storedUserId);
      localStorage.setItem(
        "registeredFairs",
        JSON.stringify(data.registered_fairs)
      );
      router.push(`/faculty/${storedUserId}/register`);
    } catch (error) {
      console.error("Error fetching registered fairs:", error);
    }
  };

  const handleEditProfile = () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      console.error("No user ID found");
      return;
    }

    router.push(`/faculty/${userId}/edit`);
  };

  const handleAttendClick = () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      console.error("No user ID found");
      return;
    }
    router.push(`/faculty/${userId}/attend`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Container maxWidth="lg" className="py-12">
        <Card className="p-8 shadow-lg">
          {/* Header */}
          <Box className="mb-8 text-center">
            <Typography
              variant="h3"
              className="mb-2 font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
            >
              Faculty Profile
            </Typography>
            <Typography variant="subtitle1" className="text-gray-600">
              {profile?.department}
            </Typography>
          </Box>

          <Divider className="mb-8" />

          {/* Two-Column Layout */}
          <Grid container spacing={4}>
            {/* Left Column - Profile Information */}
            <Grid item xs={12} md={6}>
              <Box className="space-y-6 pr-4">
                <ProfileField
                  label="Faculty ID"
                  value={profile?.faculty_id.toString()}
                />
                <ProfileField label="Name" value={profile?.name} />
                <ProfileField label="Email" value={profile?.email} />
                <ProfileField label="Department" value={profile?.department} />
              </Box>
            </Grid>

            {/* Right Column - Image */}
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://picsum.photos/800/600"
                alt="Faculty Image"
                className="w-full h-[400px] object-cover rounded-lg shadow-md"
              />
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-200">
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={handleEditProfile}
                  className="bg-blue-600 hover:bg-blue-700 normal-case"
                >
                  Edit Profile
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<RegisterIcon />}
                  onClick={handleRegisteredFairs}
                  className="bg-purple-600 hover:bg-purple-700 normal-case"
                >
                  Registered Fairs
                </Button>
                {/* <Button
                  fullWidth
                  variant="contained"
                  startIcon={<HistoryIcon />}
                  onClick={handleAttendanceHistory}
                  className="bg-indigo-600 hover:bg-indigo-700 normal-case"
                >
                  Attendance History
                </Button> */}
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<HistoryIcon />}
                  onClick={handleAttendClick}
                  className="bg-blue-600 hover:bg-blue-700 normal-case"
                >
                  Attend Fair
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Layout>
  );
};

export default FacultyProfilePage;
