"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/common/Layout";
import { Container, Typography, Box, Card, Grid, Button } from "@mui/material";
import {
  Person as PersonIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Campaign as CampaignIcon,
} from "@mui/icons-material";

const AdminPage = ({ adminId }: { adminId: string }) => {
  const [adminData, setAdminData] = useState({
    admin_id: "",
    admin_name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const stored_admin_id = localStorage.getItem("admin_id");
        if (!stored_admin_id || stored_admin_id !== adminId) {
          router.push("/admin/login");
          return;
        }

        const response = await fetch(
          `http://127.0.0.1:8000/admin/${stored_admin_id}/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            credentials: "include",
          }
        );

        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();

        setAdminData({
          admin_id: data.admin_id.toString(),
          admin_name: data.admin_name,
          email: data.email,
        });
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminProfile();
  }, [adminId, router]);

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
    return null;
  }

  return (
    <Layout>
      <Box
        className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
        sx={{ paddingY: 8 }}
      >
        <Container maxWidth="lg">
          <Box className="text-center mb-16">
            <Typography
              variant="h2"
              component="h1"
              className="font-black mb-4"
              sx={{
                background: "linear-gradient(135deg, #1a365d 0%, #3b82f6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                textShadow: "0 2px 10px rgba(59, 130, 246, 0.1)",
              }}
            >
              Welcome Back, {adminData.admin_name}
            </Typography>
            <Typography
              variant="h6"
              className="text-slate-600 font-light"
              sx={{ letterSpacing: 1 }}
            >
              {adminData.email}
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card
                className="h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                sx={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <Box className="p-8">
                  <Box className="mb-6">
                    <PersonIcon sx={{ fontSize: 48, color: "#3b82f6" }} />
                  </Box>
                  <Typography
                    variant="h5"
                    className="font-bold mb-4 text-slate-800"
                  >
                    Profile Management
                  </Typography>
                  <Typography className="text-slate-600 mb-8">
                    Manage your admin profile and security settings
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => router.push("/admin/profile")}
                    sx={{
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                      textTransform: "none",
                      py: 1.5,
                      fontSize: "1rem",
                    }}
                  >
                    View Profile
                  </Button>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                className="h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                sx={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <Box className="p-8">
                  <Box className="mb-6">
                    <AnalyticsIcon sx={{ fontSize: 48, color: "#8b5cf6" }} />
                  </Box>
                  <Typography
                    variant="h5"
                    className="font-bold mb-4 text-slate-800"
                  >
                    Data Analysis
                  </Typography>
                  <Typography className="text-slate-600 mb-8">
                    View comprehensive system analytics and reports
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => router.push(`/admin/analysis`)}
                    sx={{
                      background:
                        "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                      textTransform: "none",
                      py: 1.5,
                      fontSize: "1rem",
                    }}
                  >
                    View Analysis
                  </Button>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                className="h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                sx={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <Box className="p-8">
                  <Box className="mb-6">
                    <SettingsIcon sx={{ fontSize: 48, color: "#22c55e" }} />
                  </Box>
                  <Typography
                    variant="h5"
                    className="font-bold mb-4 text-slate-800"
                  >
                    System Management
                  </Typography>
                  <Typography className="text-slate-600 mb-8">
                    Configure system settings and manage permissions
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => router.push("/adminPage/careerFair")}
                    sx={{
                      background:
                        "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                      textTransform: "none",
                      py: 1.5,
                      fontSize: "1rem",
                    }}
                  >
                    Manage System
                  </Button>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                className="h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                sx={{
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #fff1f2 100%)",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <Box className="p-8">
                  <Box className="mb-6">
                    <CampaignIcon sx={{ fontSize: 48, color: "#e11d48" }} />
                  </Box>
                  <Typography
                    variant="h5"
                    className="font-bold mb-4 text-slate-800"
                  >
                    Announcement Management
                  </Typography>
                  <Typography className="text-slate-600 mb-8">
                    Create and manage system announcements
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() =>
                      router.push(`/admin/${adminId}/announcements`)
                    }
                    sx={{
                      background:
                        "linear-gradient(135deg, #e11d48 0%, #be123c 100%)",
                      textTransform: "none",
                      py: 1.5,
                      fontSize: "1rem",
                    }}
                  >
                    Manage Announcements
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default AdminPage;
