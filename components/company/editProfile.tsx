"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { companyAPI, UpdateProfileData } from "@/services/api";
import { Container, TextField, Button, Box, Typography } from "@mui/material";

const CompanyEdit = () => {
  const router = useRouter();
  const params = useParams();
  const companyId = parseInt(params.id as string, 10);

  if (isNaN(companyId)) {
    router.push("/error");
    return null;
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    industry: "",
    contact_name: "",
    contact_phone: "",
    location: "",
    profile_content: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await companyAPI.getCompanyById(companyId);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          industry: data.industry || "",
          contact_name: data.contact_name || "",
          contact_phone: data.contact_phone || "",
          contact_email: data.contact_email || "",
          location: data.location || "",
          profile_content: data.profile || "",
        });
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };
    loadProfile();
  }, [companyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Sending update:', { ...formData, id: companyId });
      
      const response = await companyAPI.updateProfile(companyId, { 
        ...formData
      });
      console.log('Update response:', response);
      
      router.push(`/company/${companyId}`);
    } catch (error) {
      console.error("Failed to update profile:", error);
      if (error instanceof Error) {
        console.error("Error details:", error.message);
      }
    }
  };

  return (
    <Container maxWidth="md" className="py-8">
      <Typography variant="h4" className="mb-6">
        Edit Company Profile
      </Typography>
      <Box component="form" onSubmit={handleSubmit} className="space-y-4">
        <TextField
          fullWidth
          label="Company Name"
          value={formData.name ?? 'null'}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <TextField
          fullWidth
          label="Email"
          value={formData.email ?? 'null'}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <TextField
          fullWidth
          label="Industry"
          value={formData.industry ?? 'null'}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, industry: e.target.value }))
          }
        />
        <TextField
          fullWidth
          label="Contact Name"
          value={formData.contact_name ?? 'null'}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, contact_name: e.target.value }))
          }
        />
        <TextField
          fullWidth
          label="Contact Phone"
          value={formData.contact_phone ?? 'null'}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, contact_phone: e.target.value }))
          }
        />
        <TextField
          fullWidth
          label="Location"
          value={formData.location ?? 'null'}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, location: e.target.value }))
          }
        />
        <TextField
          fullWidth
          label="Company Profile"
          value={formData.profile_content ?? 'null'}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, profile_content: e.target.value }))
          }
          multiline
          rows={4}
        />
        <Box className="pt-4">
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CompanyEdit;
