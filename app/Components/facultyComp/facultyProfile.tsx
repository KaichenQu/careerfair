"use client";

import React from "react";
import { Container, Typography, Box, Button, Paper, Grid } from "@mui/material";
import Layout from "../common/Layout";
import { Person, WorkHistory } from "@mui/icons-material";
import { facultyData } from "../../data/facultyData";

const FacultyProfile = () => {
  return (
    <Layout>
      <Container maxWidth="md" className="py-12">
        <Paper elevation={3} className="p-8 rounded-xl">
          <Grid container spacing={4}>
            {/* Faculty Info Section */}
            <Grid item xs={12}>
              <Typography
                variant="h4"
                className="text-center font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
              >
                Faculty Profile
              </Typography>
            </Grid>

            {/* Faculty Details */}
            <Grid item xs={12} md={6}>
              <Box className="space-y-4">
                <Typography
                  variant="h6"
                  className="font-semibold text-gray-800"
                >
                  Faculty Name: {facultyData.faculty_name}
                </Typography>
                <Typography
                  variant="h6"
                  className="font-semibold text-gray-800"
                >
                  Name: {facultyData.name}
                </Typography>
                <Typography
                  variant="h6"
                  className="font-semibold text-gray-800"
                >
                  Major: {facultyData.major}
                </Typography>
              </Box>
            </Grid>

            {/* Photo Placeholder */}
            <Grid item xs={12} md={6}>
              <Box
                className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center"
                sx={{ minHeight: "200px" }}
              >
                <Typography className="text-gray-500">
                  Photo Placeholder
                </Typography>
              </Box>
            </Grid>

            {/* Action Buttons */}
            <Grid item xs={12}>
              <Box className="flex justify-center space-x-4 mt-6">
                <Button
                  variant="contained"
                  startIcon={<Person />}
                  className="bg-blue-500 hover:bg-blue-600 px-6 py-2"
                  onClick={() => (window.location.href = "/student/profile")}
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

export default FacultyProfile;