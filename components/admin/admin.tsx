"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/common/Layout";
import { Container, Typography, Box, Card, Grid, Button } from "@mui/material";
import {
  Person as PersonIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

const AdminPage = () => {
  const [adminData, setAdminData] = useState({
    admin_id: "",
    admin_name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initializeAdmin = async () => {
      try {
        const admin_id = localStorage.getItem("admin_id");
        const admin_token = localStorage.getItem("admin_token");
        const admin_name = localStorage.getItem("admin_name");
        const admin_email = localStorage.getItem("admin_email");

        if (!admin_id || !admin_token) {
          throw new Error("No credentials found");
        }

        const response = await fetch("http://127.0.0.1:8000/admin/verify", {
          headers: {
            Authorization: `Bearer ${admin_token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Invalid token");
        }

        const data = await response.json();

        setAdminData({
          admin_id,
          admin_name: admin_name || "",
          email: admin_email || "",
        });
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Verification error:", err);
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_id");
        localStorage.removeItem("admin_name");
        localStorage.removeItem("admin_email");
        window.location.href = "/admin/login";
      } finally {
        setIsLoading(false);
      }
    };

    initializeAdmin();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return null; // 不渲染任何内容，等待重定向完成
  }

  return (
    <Layout>
      <Container maxWidth="lg" className="py-12">
        <Typography
          variant="h3"
          component="h1"
          className="text-center font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
        >
          Welcome, {adminData.admin_name}
        </Typography>
        <Typography
          variant="subtitle1"
          className="text-center text-gray-600 mb-12"
        >
          {adminData.email}
        </Typography>

        <Grid container spacing={4}>
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <div className="cursor-pointer group">
              <Card className="h-full p-6 relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                {/* Folded corner effect */}
                <div className="absolute top-0 right-0 w-24 h-24 transition-transform duration-300 origin-top-right group-hover:scale-110">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/20 to-transparent transform rotate-45" />
                  <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[141%] h-[141%] bg-white transform origin-top-right -rotate-45 translate-x-2 -translate-y-2 shadow-lg" />
                  </div>
                </div>

                <Box className="flex flex-col h-full">
                  <PersonIcon
                    className="text-blue-500 mb-4"
                    sx={{ fontSize: 40 }}
                  />
                  <Typography
                    variant="h5"
                    className="font-bold text-gray-800 mb-4"
                  >
                    Profile Management
                  </Typography>
                  <Typography className="text-gray-600 mb-4">
                    Manage your admin profile and account settings
                  </Typography>
                  <Button
                    variant="contained"
                    className="mt-auto bg-blue-500 hover:bg-blue-600"
                    onClick={() => (window.location.href = "/admin/profile")}
                  >
                    View Profile
                  </Button>
                </Box>
              </Card>
            </div>
          </Grid>

          {/* Data Analysis Card */}
          <Grid item xs={12} md={4}>
            <div className="cursor-pointer group">
              <Card className="h-full p-6 relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                {/* Folded corner effect */}
                <div className="absolute top-0 right-0 w-24 h-24 transition-transform duration-300 origin-top-right group-hover:scale-110">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/20 to-transparent transform rotate-45" />
                  <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[141%] h-[141%] bg-white transform origin-top-right -rotate-45 translate-x-2 -translate-y-2 shadow-lg" />
                  </div>
                </div>

                <Box className="flex flex-col h-full">
                  <AnalyticsIcon
                    className="text-purple-500 mb-4"
                    sx={{ fontSize: 40 }}
                  />
                  <Typography
                    variant="h5"
                    className="font-bold text-gray-800 mb-4"
                  >
                    Data Analysis
                  </Typography>
                  <Typography className="text-gray-600 mb-4">
                    View and analyze system data and statistics
                  </Typography>
                  <Button
                    variant="contained"
                    className="mt-auto bg-purple-500 hover:bg-purple-600"
                    onClick={() => (window.location.href = "/admin/analysis")}
                  >
                    View Analysis
                  </Button>
                </Box>
              </Card>
            </div>
          </Grid>

          {/* System Management Card */}
          <Grid item xs={12} md={4}>
            <div className="cursor-pointer group">
              <Card className="h-full p-6 relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                {/* Folded corner effect */}
                <div className="absolute top-0 right-0 w-24 h-24 transition-transform duration-300 origin-top-right group-hover:scale-110">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/20 to-transparent transform rotate-45" />
                  <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[141%] h-[141%] bg-white transform origin-top-right -rotate-45 translate-x-2 -translate-y-2 shadow-lg" />
                  </div>
                </div>

                <Box className="flex flex-col h-full">
                  <SettingsIcon
                    className="text-green-500 mb-4"
                    sx={{ fontSize: 40 }}
                  />
                  <Typography
                    variant="h5"
                    className="font-bold text-gray-800 mb-4"
                  >
                    System Management
                  </Typography>
                  <Typography className="text-gray-600 mb-4">
                    Configure and manage system settings and permissions
                  </Typography>
                  <Button
                    variant="contained"
                    className="mt-auto bg-green-500 hover:bg-green-600"
                    onClick={() =>
                      (window.location.href = "/adminPage/careerFair")
                    }
                  >
                    Manage System
                  </Button>
                </Box>
              </Card>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default AdminPage;
