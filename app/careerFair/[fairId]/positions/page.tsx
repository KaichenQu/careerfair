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
} from "@mui/material";
import Layout from "@/components/common/Layout";
import {
  AttachMoney,
  LocationOn,
  Business,
  Description,
} from "@mui/icons-material";
import Loading from "@/components/common/Loading";
import axios from "axios";

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
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
}
