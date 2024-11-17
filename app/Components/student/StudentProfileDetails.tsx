"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  TextField,
  Button,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import Layout from "../common/Layout";
import {
  CloudUpload,
  School,
  Badge,
  Grade,
  CalendarToday,
  Class,
} from "@mui/icons-material";
import { studentData } from "../../data/studentData";
import axios from "axios";

const StudentProfileDetails = () => {
  const [isHovered, setIsHovered] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const InfoField = ({
    label,
    value,
    icon,
  }: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }) => (
    <Box
      className={`p-4 rounded-xl transition-all duration-200 ${
        isHovered === label
          ? "bg-gradient-to-r from-blue-50 to-purple-50 shadow-md transform -translate-y-1"
          : "bg-white"
      }`}
      onMouseEnter={() => setIsHovered(label)}
      onMouseLeave={() => setIsHovered("")}
    >
      <Box className="flex items-center space-x-3">
        <Box className="text-blue-500">{icon}</Box>
        <Box>
          <Typography variant="caption" className="text-gray-500">
            {label}
          </Typography>
          <Typography variant="h6" className="font-semibold">
            {value}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  const handleResumeUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post("/profile/uploadResume", formData, {
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });

      if (response.data?.filename) {
        studentData.resume = response.data.filename;
      }
    } catch (error) {
      setUploadError("Failed to upload resume. Please try again later.");
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Layout>
      <Container maxWidth="lg" className="py-12">
        <Paper elevation={3} className="p-8 rounded-xl">
          <Typography
            variant="h4"
            className="text-center font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
          >
            Student Profile Details
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <InfoField
                label="Student ID"
                value={studentData.student_id}
                icon={<Badge />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoField
                label="Student Name"
                value={studentData.student_name}
                icon={<School />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoField
                label="Major"
                value={studentData.major}
                icon={<Class />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoField label="GPA" value={studentData.gpa} icon={<Grade />} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoField
                label="Graduate Year"
                value={studentData.graduate_year}
                icon={<CalendarToday />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoField
                label="Academic Year"
                value={studentData.academic_year}
                icon={<School />}
              />
            </Grid>

            <Grid item xs={12}>
              <Box className="mt-6">
                <Box className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center transition-all duration-200 hover:border-blue-400 hover:bg-blue-50">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    style={{ display: "none" }}
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload">
                    <Button
                      component="span"
                      variant="outlined"
                      startIcon={uploading ? null : <CloudUpload />}
                      className="mb-2 bg-white hover:bg-blue-50"
                      disabled={uploading}
                    >
                      {uploading ? (
                        <Box className="flex items-center">
                          <CircularProgress size={20} className="mr-2" />
                          Uploading {uploadProgress}%
                        </Box>
                      ) : (
                        "Upload Resume"
                      )}
                    </Button>
                  </label>
                  {uploadError && (
                    <Typography color="error" className="mt-2 text-sm">
                      {uploadError}
                    </Typography>
                  )}
                  <Typography variant="body2" className="text-gray-500 mt-2">
                    {studentData.resume
                      ? `Current Resume: ${studentData.resume}`
                      : "Supported formats: PDF, DOC, DOCX"}
                  </Typography>
                  {uploading && (
                    <Box className="w-full mt-4">
                      <LinearProgress
                        variant="determinate"
                        value={uploadProgress}
                        className="rounded-full"
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};

export default StudentProfileDetails;
