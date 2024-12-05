"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  AdminPanelSettings as AdminIcon,
  Lock,
  Email,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Layout from "@/components/common/Layout";

const AdminLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

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
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid credentials");
      }

      const data = await response.json();

      if (!data.admin || !data.admin.admin_id || !data.csrf_token) {
        throw new Error("Invalid response data");
      }

      localStorage.setItem("admin_token", data.csrf_token);
      localStorage.setItem("admin_id", String(data.admin.admin_id));
      localStorage.setItem("admin_name", data.admin.admin_name);
      localStorage.setItem("admin_email", data.admin.email);

      toast.success(data.message);

      window.location.href = data.redirect_url;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      } else {
        setError("Invalid email or password");
        toast.error("Invalid email or password");
      }
      console.error("Login error:", err);
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
          <Box className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
            <AdminIcon sx={{ fontSize: 48 }} className="mb-4" />
            <Typography component="h1" className="text-2xl font-bold">
              Admin Login
            </Typography>
            <Typography className="mt-2 text-gray-100 opacity-90">
              Please sign in to access the admin dashboard
            </Typography>
          </Box>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <TextField
              fullWidth
              label="Email"
              type="email"
              required
              className="login-input"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email className="text-gray-400" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              required
              className="login-input"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              InputProps={{
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
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg transform transition-all duration-200 hover:scale-[1.02]"
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
          </form>
        </Paper>
      </Container>
    </Layout>
  );
};

export default AdminLogin;
