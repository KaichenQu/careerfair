"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import {
  AttachMoney,
  LocationOn,
  Business,
  Description,
} from "@mui/icons-material";
import Loading from "@/components/common/Loading";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from '@/components/contexts/AuthContext';
import Layout from '@/components/common/Layout';

interface Position {
  position_id: number;
  position_name: string;
  salary: number;
  location: string;
  description: string;
  company_id: number;
  ng_flag: number;
  intern_flag: number;
  sponsor_flag: number;
  company_name: string;
}

export default function PositionsPage() {
  const auth = useAuth();
  console.log('Auth Context:', auth);
  const router = useRouter();
  
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' as AlertColor
  });

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/careerFair/position"
        );
        setPositions(response.data);
      } catch (error) {
        console.error("Failed to fetch positions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  const uniqueCompanies = Array.from(
    new Set(positions.map((p) => p.company_name))
  );
  const uniqueLocations = Array.from(new Set(positions.map((p) => p.location)));

  const filteredPositions = positions.filter((position) => {
    const matchesSearch =
      position.position_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany =
      companyFilter === "all" || position.company_name === companyFilter;
    const matchesLocation =
      locationFilter === "all" || position.location === locationFilter;
    return matchesSearch && matchesCompany && matchesLocation;
  });

  const formatSalary = (salary: number) => {
    if (salary >= 1000) {
      return `$${salary.toLocaleString()}/year`;
    } else {
      return `$${salary}/hour`;
    }
  };

  const handleApply = async (positionId: number) => {
    // Debug logs for auth state
    console.log('Auth State:', {
      isAuthenticated: auth.isAuthenticated,
      user: auth.user,
      fullAuth: auth
    });

    if (!auth.isAuthenticated || !auth.user) {
      setSnackbar({
        open: true,
        message: 'Please login to apply for positions',
        severity: 'warning'
      });
      return;
    }

    // Add user type check
    if (auth.user.userType !== 'student') {
      setSnackbar({
        open: true,
        message: 'Only students can apply for positions',
        severity: 'error'
      });
      return;
    }

    try {
      const userId = auth.user.id;
      console.log('Applying with data:', {
        userId,
        positionId,
        userType: auth.user.userType
      });

      const response = await axios.post('http://127.0.0.1:8000/careerFair/position/apply/', {
        user_id: userId,
        position_id: positionId
      });

      console.log('Application Response:', response.data);
      
      setSnackbar({
        open: true,
        message: 'Successfully applied for the position!',
        severity: 'success'
      });

    } catch (error: any) {
      console.error('Application error:', {
        error,
        response: error.response,
        data: error.response?.data
      });
      
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Failed to apply for the position',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading) return <Loading />;

  return (
    <Layout>
    <Container maxWidth="lg" className="py-12">
      <Typography
        variant="h3"
        component="h1"
        className="mb-8 text-center font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
      >
        Available Positions
      </Typography>

      <Box className="mb-6 space-y-4">
        <TextField
          fullWidth
          label="Search positions or companies"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Box className="flex gap-4">
          <FormControl fullWidth>
            <InputLabel>Company</InputLabel>
            <Select
              value={companyFilter}
              label="Company"
              onChange={(e) => setCompanyFilter(e.target.value)}
            >
              <MenuItem value="all">All Companies</MenuItem>
              {uniqueCompanies.map((company) => (
                <MenuItem key={company} value={company}>
                  {company}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Location</InputLabel>
            <Select
              value={locationFilter}
              label="Location"
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <MenuItem value="all">All Locations</MenuItem>
              {uniqueLocations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {filteredPositions.map((position) => (
          <Grid item xs={12} md={6} lg={4} key={position.position_id}>
            <Card className="h-full hover:shadow-xl transition-shadow duration-300">
              <CardContent className="space-y-4">
                <Typography variant="h5" className="font-bold text-gray-800">
                  {position.position_name}
                </Typography>

                <Box className="space-y-2">
                  <Box className="flex items-center space-x-2 text-gray-600">
                    <AttachMoney className="text-green-500" />
                    <Typography>{formatSalary(position.salary)}</Typography>
                  </Box>

                  <Box className="flex items-center space-x-2 text-gray-600">
                    <LocationOn className="text-blue-500" />
                    <Typography>{position.location}</Typography>
                  </Box>

                  <Box className="flex items-center space-x-2 text-gray-600">
                    <Business className="text-purple-500" />
                    <Typography>{position.company_name}</Typography>
                  </Box>

                  <Box className="flex items-center space-x-2 text-gray-600">
                    <Description className="text-orange-500" />
                    <Typography noWrap>{position.description}</Typography>
                  </Box>
                </Box>

                <Box className="flex flex-wrap gap-2 pt-2">
                  {position.ng_flag === 1 && (
                    <Chip
                      label="New Grad"
                      size="small"
                      className="bg-blue-100 text-blue-700"
                    />
                  )}
                  {position.intern_flag === 1 && (
                    <Chip
                      label="Internship"
                      size="small"
                      className="bg-green-100 text-green-700"
                    />
                  )}
                  {position.sponsor_flag === 1 && (
                    <Chip
                      label="Visa Sponsor"
                      size="small"
                      className="bg-purple-100 text-purple-700"
                    />
                  )}
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleApply(position.position_id)}
                  className="mt-4"
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
    </Layout>
  );
}
