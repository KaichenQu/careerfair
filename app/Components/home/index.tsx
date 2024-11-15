"use client";

import React from "react";
import { Typography, Container } from "@mui/material";
import Layout from "../common/Layout";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <Container maxWidth="lg" className="text-center">
          <Typography
            variant="h4"
            component="h1"
            className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 antialiased leading-normal"
          >
            Welcome to the Career Fair Registration System
          </Typography>
          <Typography
            variant="body1"
            className="text-xl md:text-2xl text-gray-700 mb-8 md:text-center lg:px-24 antialiased leading-relaxed"
          >
            This platform allows students to register for career fairs, view
            participating companies, and learn about upcoming events.
          </Typography>
          <Typography
            variant="body1"
            className="text-lg md:text-xl text-gray-800 antialiased leading-relaxed"
          >
            Join us to explore exciting opportunities and connect with potential
            employers!
          </Typography>
        </Container>
      </div>
    </Layout>
  );
};

export default HomePage;
