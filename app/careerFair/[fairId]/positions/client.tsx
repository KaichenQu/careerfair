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
} from "@mui/material";
import Layout from "../../../Components/common/Layout";
import {
  AttachMoney,
  LocationOn,
  Business,
  Description,
} from "@mui/icons-material";
import Loading from "../../../Components/common/Loading";

interface Position {
  id: string | number;
  // Add other position properties as needed
}

export default function PositionsClient({
  positions,
  fairId,
}: {
  positions: Position[];
  fairId: string;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Grid container spacing={3}>
            {positions.map((position) => (
              <Grid item xs={12} sm={6} md={4} key={position.id}>
                <Card>
                  <CardContent>{/* Position content here */}</CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </Layout>
  );
}
