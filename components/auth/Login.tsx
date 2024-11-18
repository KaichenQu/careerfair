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

/**
 * LoginPage Component
 * Provides a user interface for authentication
 * Features:
 * - Email and password input fields
 * - Show/hide password toggle
 * - Interactive button with hover effects
 * - Responsive design
 */
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", formData);
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

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-4">
              <TextField
                fullWidth
                label="Email Address"
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

              <FormControl component="fieldset">
                <FormLabel component="legend" className="text-gray-700">
                  User Type
                </FormLabel>
                <RadioGroup
                  row
                  value={formData.userType}
                  onChange={(e) =>
                    setFormData({ ...formData, userType: e.target.value })
                  }
                >
                  <FormControlLabel
                    value="student"
                    control={<Radio />}
                    label="Student"
                  />
                  <FormControlLabel
                    value="company"
                    control={<Radio />}
                    label="Company"
                  />
                  <FormControlLabel
                    value="faculty"
                    control={<Radio />}
                    label="Faculty"
                  />
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
