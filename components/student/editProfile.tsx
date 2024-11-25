"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/common/Layout";
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
import { Grade, Book, Edit as EditIcon } from "@mui/icons-material";
import { studentAPI } from "@/services/api";

interface StudentProfile {
  name: string;
  email: string;
  major: string;
  academic_year: string;
  gpa: number;
  profile_content: string;
}

interface InfoFieldProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  onEdit: (value: string) => Promise<void>;
  isEditable?: boolean;
}

const InfoField = ({ label, value, icon, onEdit, isEditable = true }: InfoFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [error, setError] = useState<string | null>(null);

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
    
    <Box className="p-6 rounded-xl bg-white hover:shadow-md transition-shadow">
      <Box className="flex items-center space-x-4">
        <Box className="text-blue-500">{icon}</Box>
        <Box className="flex-1">
          <Box className="flex items-center justify-between">
            <Typography variant="caption" className="text-gray-500">
              {label}
            </Typography>
            {isEditable && (
              <EditIcon
                className="cursor-pointer text-gray-400 hover:text-blue-500"
                onClick={() => setIsEditing(true)}
                sx={{ fontSize: 18 }}
              />
            )}
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
              {value || "Not set"}
            </Typography>
          )}
        </Box>
        </Box>
      </Box>

  );
};

interface UpdateStudentProfile {
  gpa?: number;
  profile_content?: string;
}

export default function EditProfile({ studentId }: { studentId: number }) {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await studentAPI.getProfile(studentId);
        setProfile(data);
      } catch (err) {
        setError("Failed to load profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [studentId]);

  const handleUpdateField = async (field: keyof UpdateStudentProfile, value: string | number) => {
    try {
      if (!value && value !== 0) {
        throw new Error("Value cannot be empty");
      }

      const updates = {
        [field]: field === 'gpa' ? Number(value) : value
      } as UpdateStudentProfile;
      
      const response = await studentAPI.updateProfile(studentId, updates);
      setProfile(prev => prev ? { ...prev, [field]: value } : null);
      return response;
    } catch (error) {
      console.error('Update error:', error);
      throw new Error(`Failed to update ${field}. Please try again.`);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!profile) return <Typography>No profile found</Typography>;

  return (
    <Layout>
    <Container maxWidth="lg" className="py-12">
      <Paper elevation={3} className="p-8 rounded-xl">
        <Typography variant="h4" className="text-center font-bold mb-8">
          Edit Profile
        </Typography>

        <Grid container spacing={4}>
          {/* Editable Fields */}
          <Grid item xs={12} md={6}>
            <InfoField
              label="GPA"
              value={profile.gpa.toString()}
              icon={<Grade />}
              onEdit={(value) => handleUpdateField('gpa', parseFloat(value))}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoField
              label="Profile Content"
              value={profile.profile_content}
              icon={<Book />}
              onEdit={(value) => handleUpdateField('profile_content', value)}
            />
          </Grid>

          {/* Read-only Fields */}
          <Grid item xs={12}>
            <Typography variant="h6" className="mb-4 text-gray-600">
              Profile Information
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoField
              label="Name"
              value={profile.name}
              icon={<Book />}
              onEdit={() => Promise.resolve()}
              isEditable={false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoField
              label="Email"
              value={profile.email}
              icon={<Book />}
              onEdit={() => Promise.resolve()}
              isEditable={false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoField
              label="Major"
              value={profile.major}
              icon={<Book />}
              onEdit={() => Promise.resolve()}
              isEditable={false}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InfoField
              label="Academic Year"
              value={profile.academic_year}
              icon={<Book />}
              onEdit={() => Promise.resolve()}
              isEditable={false}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
    </Layout>
  );
}
