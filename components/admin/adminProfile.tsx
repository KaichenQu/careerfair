"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Layout from "@/components/common/Layout";
import { useRouter } from "next/navigation";
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Divider,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";

interface AdminProfileData {
  id: string;
  name: string;
  email: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const AdminProfile = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<AdminProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordEdit, setShowPasswordEdit] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwords, setPasswords] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<AdminProfileData | null>(
    null
  );

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const admin_id = localStorage.getItem("admin_id");
      if (!admin_id) {
        toast.error("Admin ID not found");
        router.push("/login");
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:8000/admin/${admin_id}/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to fetch profile");
      const data = await response.json();
      setProfile({
        id: data.admin_id.toString(),
        name: data.admin_name,
        email: data.email,
      });
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwords.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const admin_id = localStorage.getItem("admin_id");
      const response = await fetch(`/api/admin/${admin_id}/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify({
          current_password: passwords.currentPassword,
          new_password: passwords.newPassword,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update password");
      }

      toast.success("Password updated successfully");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordEdit(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update password"
      );
      console.error(error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!editedProfile) return;

    try {
      const admin_id = localStorage.getItem("admin_id");
      const response = await fetch(
        `http://127.0.0.1:8000/admin/${admin_id}/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
          body: JSON.stringify({
            admin_name: editedProfile.name,
            email: editedProfile.email,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedData = await response.json();
      setProfile({
        id: updatedData.admin_id.toString(),
        name: updatedData.admin_name,
        email: updatedData.email,
      });
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <Layout>
        <Box className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500" />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="md" className="py-8">
        <Paper elevation={3} className="p-8">
          <Box className="flex flex-col items-center mb-8">
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: "primary.main",
                mb: 3,
              }}
            >
              <PersonIcon sx={{ fontSize: 64 }} />
            </Avatar>
            <Typography variant="h4" className="font-bold mb-2">
              {profile?.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              System Administrator
            </Typography>
          </Box>

          <Divider className="my-6" />

          <Box className="space-y-6">
            <Box className="bg-gray-50 p-6 rounded-lg">
              <Box className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="font-semibold">
                  Profile Information
                </Typography>
                <Button
                  startIcon={<EditIcon />}
                  onClick={() => {
                    if (isEditing) {
                      handleUpdateProfile();
                    } else {
                      setEditedProfile(profile);
                      setIsEditing(true);
                    }
                  }}
                  color="primary"
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
              </Box>
              <Box className="space-y-3">
                <Box className="flex items-center">
                  <Typography variant="body1" className="font-medium w-24">
                    Admin ID:
                  </Typography>
                  <Typography>{profile?.id}</Typography>
                </Box>
                {isEditing ? (
                  <>
                    <TextField
                      fullWidth
                      label="Name"
                      value={editedProfile?.name || ""}
                      onChange={(e) =>
                        setEditedProfile((prev) =>
                          prev ? { ...prev, name: e.target.value } : null
                        )
                      }
                      className="mb-4"
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      value={editedProfile?.email || ""}
                      onChange={(e) =>
                        setEditedProfile((prev) =>
                          prev ? { ...prev, email: e.target.value } : null
                        )
                      }
                    />
                  </>
                ) : (
                  <>
                    <Box className="flex items-center">
                      <Typography variant="body1" className="font-medium w-24">
                        Name:
                      </Typography>
                      <Typography>{profile?.name}</Typography>
                    </Box>
                    <Box className="flex items-center">
                      <Typography variant="body1" className="font-medium w-24">
                        Email:
                      </Typography>
                      <Typography>{profile?.email}</Typography>
                    </Box>
                  </>
                )}
              </Box>
            </Box>

            <Box className="bg-gray-50 p-6 rounded-lg">
              <Box className="flex justify-between items-center mb-4">
                <Typography variant="h6" className="font-semibold">
                  Password Settings
                </Typography>
                <Button
                  startIcon={<EditIcon />}
                  onClick={() => setShowPasswordEdit(!showPasswordEdit)}
                  color="primary"
                >
                  {showPasswordEdit ? "Cancel" : "Change Password"}
                </Button>
              </Box>

              {showPasswordEdit && (
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  {Object.entries({
                    current: "Current Password",
                    new: "New Password",
                    confirm: "Confirm New Password",
                  }).map(([key, label]) => (
                    <Box key={key}>
                      <TextField
                        fullWidth
                        label={label}
                        type={
                          showPassword[key as keyof typeof showPassword]
                            ? "text"
                            : "password"
                        }
                        value={
                          passwords[
                            `${
                              key === "current"
                                ? "current"
                                : key === "new"
                                ? "new"
                                : "confirm"
                            }Password` as keyof PasswordForm
                          ]
                        }
                        onChange={(e) =>
                          setPasswords((prev) => ({
                            ...prev,
                            [`${
                              key === "current"
                                ? "current"
                                : key === "new"
                                ? "new"
                                : "confirm"
                            }Password`]: e.target.value,
                          }))
                        }
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              onClick={() =>
                                setShowPassword((prev) => ({
                                  ...prev,
                                  [key]:
                                    !prev[key as keyof typeof showPassword],
                                }))
                              }
                            >
                              {showPassword[
                                key as keyof typeof showPassword
                              ] ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          ),
                        }}
                      />
                    </Box>
                  ))}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                  >
                    Update Password
                  </Button>
                </form>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default AdminProfile;
