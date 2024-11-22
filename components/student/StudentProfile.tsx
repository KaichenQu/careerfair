"use client";

import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Paper, Grid, CircularProgress } from "@mui/material";
import Layout from "../common/Layout";
import { Person, WorkHistory, Edit } from "@mui/icons-material";
import { studentAPI, type StudentProfile } from "@/services/api";

const StudentProfile = ({ id }: { id: number }) => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await studentAPI.getStudentById(id);
        setProfile(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Failed to load student profile');
        setLoading(false);
      }
    };

    loadProfile();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <Layout>
      <Container maxWidth="md" className="py-12">
        <Paper elevation={3} className="p-8 rounded-xl">
          <Grid container spacing={4}>
            {/* Student Info Section */}
            <Grid item xs={12}>
              <Typography
                variant="h4"
                className="text-center font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
              >
                Student Profile
              </Typography>
            </Grid>

            {/* Student Details */}
            <Grid item xs={12} md={6}>
              <Box className="space-y-4">
                <Typography variant="h6" className="font-semibold text-gray-800">
                  Student ID: {profile.student_id}
                </Typography>
                <Typography variant="h6" className="font-semibold text-gray-800">
                  Name: {profile.name}
                </Typography>
                <Typography variant="h6" className="font-semibold text-gray-800">
                  Email: {profile.email}
                </Typography>
                <Typography variant="h6" className="font-semibold text-gray-800">
                  Major: {profile.major}
                </Typography>
                <Typography variant="h6" className="font-semibold text-gray-800">
                  Academic Year: {profile.academic_year}
                </Typography>
                <Typography variant="h6" className="font-semibold text-gray-800">
                  GPA: {profile.gpa}
                </Typography>
                <Typography variant="h6" className="font-semibold text-gray-800">
                  Resume: {profile.resume_uploaded ? "Uploaded" : "Not Uploaded"}
                </Typography>
              </Box>
            </Grid>

            {/* Photo Placeholder */}
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://picsum.photos/400/400"
                alt="Profile Image"
                className="w-full h-[400px] object-cover rounded-lg shadow-md"
              />
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box className="flex justify-center space-x-4 mt-6">
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  className="bg-green-500 hover:bg-green-600 px-6 py-2"
                  onClick={() => window.location.href = `/student/${profile.student_id}/edit`}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Person />}
                  className="bg-blue-500 hover:bg-blue-600 px-6 py-2"
                >
                  Profile
                </Button>
                <Button
                  variant="contained"
                  startIcon={<WorkHistory />}
                  className="bg-purple-500 hover:bg-purple-600 px-6 py-2"
                >
                  Applied Positions
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};

export default StudentProfile;
