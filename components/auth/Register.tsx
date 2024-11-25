"use client";

import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  Email,
  School,
  School as SchoolIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";
import Layout from "../common/Layout";
import { registerUser } from "../../services/api";

let API_BASE_URL = "http://127.0.0.1:8000";

/**
 * RegisterPage Component
 * Provides user registration interface
 * Features:
 * - Full name, email, student ID, and password input fields
 * - Password visibility toggle
 * - Interactive button with hover effects
 * - Form validation
 * - Responsive design
 */
const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    verifyPassword: "",
    userType: "student",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    verifyPassword: "",
    general: "",
  });

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      email: "",
      password: "",
      verifyPassword: "",
      general: "",
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.password !== formData.verifyPassword) {
      newErrors.verifyPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isHovering) {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      requestAnimationFrame(() => {
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      });
    }
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: -100, y: -100 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Format the data according to the API requirements
      const registrationData = {
        user_type: formData.userType,
        full_name: formData.fullName,
        email: formData.email,
        password: formData.password
      };

      console.log('Submitting registration data:', registrationData);
      
      const response = await fetch(`${API_BASE_URL}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      console.log('Registration successful:', data);

      // Store the user_id in localStorage
      localStorage.setItem('userId', data.user_id.toString());

      // Show success message (you might want to add a Snackbar for this)
      alert(data.message || 'Registration successful');

      // Redirect based on user type
      switch(formData.userType) {
        case 'student':
          window.location.href = `/login`;
          break;
        case 'company':
          window.location.href = `/login`;
          break;
        case 'faculty':
          window.location.href = `/login`;
          break;
        case 'admin':
          window.location.href = `/login`;
          break;
        default:
          window.location.href = '/login';
      }

    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({
        ...errors,
        general: error instanceof Error ? error.message : 'Registration failed'
      });
    }
  };

  return (
    <Layout>
      <Container
        component="main"
        maxWidth="sm"
        className="flex min-h-[calc(100vh-64px)] items-center justify-center py-12 px-4"
      >
        <Paper
          elevation={6}
          className="w-full max-w-md rounded-2xl overflow-hidden border border-gray-100"
          sx={{
            background: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 text-white">
            <Typography
              component="h1"
              className="text-2xl font-bold text-center"
            >
              Create Account
            </Typography>
          </Box>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-4">
              <TextField
                fullWidth
                label="Full Name"
                required
                className="login-input"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person className="text-gray-400" />
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />

              <TextField
                fullWidth
                label="Email Address"
                type="email"
                required
                className="login-input"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email className="text-gray-400" />
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                required
                className="login-input"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock className="text-gray-400" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <TextField
                fullWidth
                label="Verify Password"
                type={showPassword ? "text" : "password"}
                required
                className="login-input"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock className="text-gray-400" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={(e) =>
                  setFormData({ ...formData, verifyPassword: e.target.value })
                }
                error={
                  formData.password !== formData.verifyPassword &&
                  formData.verifyPassword !== ""
                }
                helperText={
                  formData.password !== formData.verifyPassword &&
                  formData.verifyPassword !== ""
                    ? "Passwords do not match"
                    : ""
                }
              />

              <FormControl component="fieldset" className="w-full">
                <FormLabel component="legend" className="text-gray-700 mb-3">
                  Select User Type
                </FormLabel>
                <RadioGroup
                  value={formData.userType}
                  onChange={(e) =>
                    setFormData({ ...formData, userType: e.target.value })
                  }
                  className="grid grid-cols-2 gap-4"
                >
                  <Paper
                    elevation={formData.userType === "student" ? 8 : 1}
                    className={`relative cursor-pointer transition-all duration-200 ${
                      formData.userType === "student"
                        ? "bg-blue-50 border-blue-500"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <FormControlLabel
                      value="student"
                      control={<Radio />}
                      label={
                        <Box className="flex items-center p-2">
                          <SchoolIcon className="text-blue-500 mr-2" />
                          <Typography>Student</Typography>
                        </Box>
                      }
                      className="m-0 w-full"
                    />
                  </Paper>

                  <Paper
                    elevation={formData.userType === "company" ? 8 : 1}
                    className={`relative cursor-pointer transition-all duration-200 ${
                      formData.userType === "company"
                        ? "bg-purple-50 border-purple-500"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <FormControlLabel
                      value="company"
                      control={<Radio />}
                      label={
                        <Box className="flex items-center p-2">
                          <BusinessIcon className="text-purple-500 mr-2" />
                          <Typography>Company</Typography>
                        </Box>
                      }
                      className="m-0 w-full"
                    />
                  </Paper>

                  <Paper
                    elevation={formData.userType === "faculty" ? 8 : 1}
                    className={`relative cursor-pointer transition-all duration-200 ${
                      formData.userType === "faculty"
                        ? "bg-green-50 border-green-500"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <FormControlLabel
                      value="faculty"
                      control={<Radio />}
                      label={
                        <Box className="flex items-center p-2">
                          <PersonIcon className="text-green-500 mr-2" />
                          <Typography>Faculty</Typography>
                        </Box>
                      }
                      className="m-0 w-full"
                    />
                  </Paper>

                  <Paper
                    elevation={formData.userType === "admin" ? 8 : 1}
                    className={`relative cursor-pointer transition-all duration-200 ${
                      formData.userType === "admin"
                        ? "bg-red-50 border-red-500"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label={
                        <Box className="flex items-center p-2">
                          <AdminIcon className="text-red-500 mr-2" />
                          <Typography>Admin</Typography>
                        </Box>
                      }
                      className="m-0 w-full"
                    />
                  </Paper>
                </RadioGroup>
              </FormControl>
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative overflow-hidden bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3 rounded-lg transform transition-all duration-200 hover:scale-[1.02] mt-6"
              sx={{
                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: "100px",
                  height: "100px",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)",
                  transform: "translate(-50%, -50%)",
                  left: mousePosition.x,
                  top: mousePosition.y,
                  opacity: isHovering ? 1 : 0,
                  transition: "opacity 0.2s ease",
                  pointerEvents: "none",
                },
              }}
            >
              Sign Up
            </Button>

            <Box className="text-center mt-4">
              <Typography variant="body2" className="text-gray-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Sign In
                </a>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Container>
    </Layout>
  );
};

export default RegisterPage;
