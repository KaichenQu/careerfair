"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Skeleton,
  Chip,
} from "@mui/material";
import Layout from "../../../../components/common/Layout";
import { useParams } from "next/navigation";
import {
  AttachMoney,
  LocationOn,
  Business,
  Description,
} from "@mui/icons-material";
import Loading from "../../../../components/common/Loading";

const samplePositions = {
  cf001: [
    {
      position_name: "Software Engineer",
      salary: "$120,000 - $150,000",
      location: "San Francisco, CA",
      description:
        "Looking for full-stack engineers to join our growing team...",
      company_id: "google",
      ng_flag: true,
      intern_flag: false,
      sponsor_flag: true,
    },
    {
      position_name: "Data Scientist Intern",
      salary: "$45/hour",
      location: "Seattle, WA",
      description: "Summer internship opportunity in our ML/AI team...",
      company_id: "microsoft",
      ng_flag: false,
      intern_flag: true,
      sponsor_flag: true,
    },
    {
      position_name: "Product Manager",
      salary: "$130,000 - $180,000",
      location: "New York, NY",
      description: "Lead product development for our enterprise solutions...",
      company_id: "amazon",
      ng_flag: true,
      intern_flag: false,
      sponsor_flag: false,
    },
  ],
  default: (
    <Box className="min-h-[60vh] flex items-center justify-center">
      <Typography variant="h3" className="text-gray-400 font-light">
        TBD...
      </Typography>
    </Box>
  ),
};

export default function PositionsPage() {
  const params = useParams();
  const fairId = params.fairId as string;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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

        {loading ? (
          <Loading />
        ) : fairId === "cf001" ? (
          <Grid container spacing={4}>
            {samplePositions.cf001.map((position, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  {loading ? (
                    <CardContent className="space-y-4">
                      <Skeleton variant="text" height={40} />
                      <Skeleton variant="text" height={24} />
                      <Skeleton variant="text" height={24} />
                      <Skeleton variant="rectangular" height={100} />
                    </CardContent>
                  ) : (
                    <CardContent className="space-y-4">
                      <Typography
                        variant="h5"
                        className="font-bold text-gray-800"
                      >
                        {position.position_name}
                      </Typography>

                      <Box className="space-y-2">
                        <Box className="flex items-center space-x-2 text-gray-600">
                          <AttachMoney className="text-green-500" />
                          <Typography>{position.salary}</Typography>
                        </Box>

                        <Box className="flex items-center space-x-2 text-gray-600">
                          <LocationOn className="text-blue-500" />
                          <Typography>{position.location}</Typography>
                        </Box>

                        <Box className="flex items-center space-x-2 text-gray-600">
                          <Business className="text-purple-500" />
                          <Typography>{position.company_id}</Typography>
                        </Box>

                        <Box className="flex items-center space-x-2 text-gray-600">
                          <Description className="text-orange-500" />
                          <Typography noWrap>{position.description}</Typography>
                        </Box>
                      </Box>

                      <Box className="flex flex-wrap gap-2 pt-2">
                        {position.ng_flag && (
                          <Chip
                            label="New Grad"
                            size="small"
                            className="bg-blue-100 text-blue-700"
                          />
                        )}
                        {position.intern_flag && (
                          <Chip
                            label="Internship"
                            size="small"
                            className="bg-green-100 text-green-700"
                          />
                        )}
                        {position.sponsor_flag && (
                          <Chip
                            label="Visa Sponsor"
                            size="small"
                            className="bg-purple-100 text-purple-700"
                          />
                        )}
                      </Box>
                    </CardContent>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          samplePositions.default
        )}
      </Container>
    </Layout>
  );
}
