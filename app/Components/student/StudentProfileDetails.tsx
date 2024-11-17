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
  Edit as EditIcon,
} from "@mui/icons-material";
import { studentData } from "../../data/studentData";
import axios from "axios";

const StudentProfileDetails = () => {
  const [isHovered, setIsHovered] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const InfoField = ({
    label,
    value,
    icon,
    onEdit,
  }: {
    label: string;
    value: string;
    icon: React.ReactNode;
    onEdit?: (newValue: string) => Promise<void>;
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);
    const [error, setError] = useState<string | null>(null);

    const handleEdit = async () => {
      try {
        if (onEdit) {
          await onEdit(tempValue);
          setIsEditing(false);
          setError(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update");
      }
    };

    return (
      <Box
        className={`p-6 rounded-xl transition-all duration-500 ease-in-out transform ${
          isHovered === label
            ? "bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 shadow-lg scale-105 -translate-y-1"
            : "bg-white hover:shadow-md"
        }`}
        onMouseEnter={() => setIsHovered(label)}
        onMouseLeave={() => setIsHovered("")}
        onClick={() => onEdit && setIsEditing(true)}
        sx={{
          cursor: onEdit ? "pointer" : "default",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "0.75rem",
            border: "2px solid transparent",
            background:
              "linear-gradient(45deg, #60a5fa, #a78bfa, #60a5fa) border-box",
            WebkitMask:
              "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "destination-out",
            maskComposite: "exclude",
            opacity: isHovered === label ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          },
        }}
      >
        <Box className="flex items-center space-x-4">
          <Box
            className={`text-blue-500 transition-transform duration-500 ${
              isHovered === label ? "scale-125" : ""
            }`}
          >
            {icon}
          </Box>
          <Box className="flex-1">
            <Box className="flex items-center space-x-2">
              <Typography
                variant="caption"
                className={`text-gray-500 transition-all duration-500 ${
                  isHovered === label ? "text-blue-600 font-medium" : ""
                }`}
              >
                {label}
              </Typography>
              {onEdit && (
                <EditIcon
                  sx={{
                    fontSize: 16,
                    color:
                      isHovered === label
                        ? "rgba(37, 99, 235, 0.6)"
                        : "rgba(156, 163, 175, 0.4)",
                    transition: "color 0.3s ease-in-out",
                  }}
                />
              )}
            </Box>
            {isEditing ? (
              <Box className="mt-1 space-y-2">
                <TextField
                  fullWidth
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  variant="outlined"
                  size="small"
                  error={!!error}
                  helperText={error}
                  autoFocus
                />
                <Box className="flex space-x-2">
                  <Button size="small" variant="contained" onClick={handleEdit}>
                    Save
                  </Button>
                  <Button
                    size="small"
                    onClick={() => {
                      setIsEditing(false);
                      setTempValue(value);
                      setError(null);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              <Typography
                variant="h6"
                className={`font-semibold transition-all duration-500 ${
                  isHovered === label ? "text-blue-800" : "text-gray-800"
                }`}
              >
                {value}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    );
  };

  const handleResumeUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size and type
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (file.size > maxSize) {
      setUploadError("File size must be less than 5MB");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setUploadError("Only PDF and Word documents are allowed");
      return;
    }

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
        timeout: 60000, // 60 second timeout
      });

      if (response.data?.filename) {
        studentData.resume = response.data.filename;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setUploadError(
          error.response?.data?.message ||
            "Failed to upload resume. Please try again later."
        );
      } else {
        setUploadError("An unexpected error occurred");
      }
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleEditGPA = async (newValue: string) => {
    try {
      const response = await axios.post("/profile/editGPA", {
        gpa: newValue,
      });

      if (response.status === 200) {
        // Update local state
        studentData.gpa = newValue;
      } else {
        throw new Error("Failed to update GPA");
      }
    } catch (error) {
      throw new Error("Failed to update GPA. Please try again.");
    }
  };

  const handleEditGraduateYear = async (newValue: string) => {
    try {
      const response = await axios.post("/profile/editGraduateYear", {
        graduateYear: newValue,
      });

      if (response.status === 200) {
        studentData.graduate_year = newValue;
      } else {
        throw new Error("Failed to update Graduate Year");
      }
    } catch (error) {
      throw new Error("Failed to update Graduate Year. Please try again.");
    }
  };

  const handleEditAcademicYear = async (newValue: string) => {
    try {
      const response = await axios.post("/profile/editAcademicYear", {
        academicYear: newValue,
      });

      if (response.status === 200) {
        studentData.academic_year = newValue;
      } else {
        throw new Error("Failed to update Academic Year");
      }
    } catch (error) {
      throw new Error("Failed to update Academic Year. Please try again.");
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
              <InfoField
                label="GPA"
                value={studentData.gpa}
                icon={<Grade />}
                onEdit={handleEditGPA}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoField
                label="Graduate Year"
                value={studentData.graduate_year}
                icon={<CalendarToday />}
                onEdit={handleEditGraduateYear}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoField
                label="Academic Year"
                value={studentData.academic_year}
                icon={<School />}
                onEdit={handleEditAcademicYear}
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
