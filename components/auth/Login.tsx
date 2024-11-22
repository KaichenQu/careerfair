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
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material";
import Layout from "../common/Layout";
import { loginUser } from "../../services/api";
import {
  School as SchoolIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "",
  });
  const [error, setError] = useState<string>("");

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

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setMousePosition({ x: -100, y: -100 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.userType) {
      setError("Please select a user type");
      return;
    }

    try {
      console.log("Submitting with data:", {
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
      });

      const loginData = await loginUser({
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
      });

      if (loginData) {
        localStorage.setItem("company_profile", JSON.stringify(loginData));
        console.log(loginData);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(error instanceof Error ? error.message : "Login failed");
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
          <Box className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
            <Typography
              component="h1"
              className="text-2xl font-bold text-center"
            >
              Welcome Back
            </Typography>
            <Typography className="mt-1 text-center text-gray-100 opacity-90">
              Please sign in to your account
            </Typography>
          </Box>

          {error && (
            <Box className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <Typography>{error}</Typography>
            </Box>
          )}

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-4">
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                required
                className="login-input"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#6366f1",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#6366f1",
                    },
                  },
                }}
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
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                required
                className="login-input"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "#6366f1",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#6366f1",
                    },
                  },
                }}
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
              className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 rounded-lg transform transition-all duration-200 hover:scale-[1.02]"
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
              Sign In
            </Button>

            <Box className="text-center">
              <Typography variant="body2" className="text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Sign up
                </a>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Container>
    </Layout>
  );
};

export default LoginPage;
