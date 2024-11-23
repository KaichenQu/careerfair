"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  School,
  Badge,
  Grade,
  CalendarToday,
  Edit as EditIcon,
  Email,
} from "@mui/icons-material";
import { studentAPI } from "@/services/api";

interface StudentProfile {
  name: string;
  email: string;
  major: string;
  academic_year: string;
  gpa: number;
}

interface InfoFieldProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  onEdit: (value: string) => Promise<void>;
}

const InfoField = ({ label, value, icon, onEdit }: InfoFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleEdit = async () => {
    try {
      await onEdit(tempValue);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update");
    }
  };

  return (
    <Box
      className={`p-6 rounded-xl transition-all duration-300 ${
        isHovered ? "shadow-md bg-gray-50" : "bg-white"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box className="flex items-center space-x-4">
        <Box className="text-blue-500">{icon}</Box>
        <Box className="flex-1">
          <Box className="flex items-center justify-between">
            <Typography variant="caption" className="text-gray-500">
              {label}
            </Typography>
            <EditIcon
              className="cursor-pointer text-gray-400 hover:text-blue-500"
              onClick={() => setIsEditing(true)}
              sx={{ fontSize: 18 }}
            />
          </Box>
          
          {isEditing ? (
            <Box className="mt-2 space-y-2">
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
            <Typography variant="h6" className="font-semibold text-gray-800">
              {value}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

interface EditProfileProps {
  studentId: number;
}

export default function EditProfile({ studentId }: EditProfileProps) {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get userId from localStorage
  const userId = localStorage.getItem('user_id');
  console.log('userId from localStorage:', userId); 

  useEffect(() => {
    const loadProfile = async () => {
      console.log('loadProfile called with userId:', userId); // Debug log
      if (!userId) {
        console.log('No userId found in localStorage'); // Debug log
        setError("No user ID found");
        setLoading(false);
        return;
      }

      try {
        console.log('Attempting to load profile for userId:', userId, 'type:', typeof userId); // Debug log
        const data = await studentAPI.getProfile(Number(userId));
        setProfile(data);
      } catch (err) {
        console.error('Profile load error:', err); // Debug log
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  const handleUpdateField = async (field: keyof StudentProfile, value: string | number) => {
    try {
      await studentAPI.updateProfile(Number(userId), { [field]: value });
      // Update local state if needed
    } catch (error) {
      throw new Error(`Failed to update ${field}. Please try again.`);
    }
  };

  return (
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
              label="Name"
              value={profile?.name || ""}
              icon={<Badge />}
              onEdit={(value) => handleUpdateField('name', value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoField
              label="Email"
              value={profile?.email || ""}
              icon={<Email />}
              onEdit={(value) => handleUpdateField('email', value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoField
              label="Major"
              value={profile?.major || ""}
              icon={<School />}
              onEdit={(value) => handleUpdateField('major', value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoField
              label="Academic Year"
              value={profile?.academic_year || ""}
              icon={<CalendarToday />}
              onEdit={(value) => handleUpdateField('academic_year', value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoField
              label="GPA"
              value={profile?.gpa.toString() || ""}
              icon={<Grade />}
              onEdit={(value) => handleUpdateField('gpa', parseFloat(value))}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
