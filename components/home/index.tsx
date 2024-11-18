"use client";

import React from "react";
import { Typography, Container, Button, Grid } from "@mui/material";
import Layout from "../common/Layout";
import BusinessCategories from "./BusinessCategories";

/**
 * HomePage Component
 * Landing page of the application
 * Features:
 * - Welcome message
 * - Platform description
 * - Responsive typography
 * - Gradient text effects
 */
const HomePage: React.FC = () => {
  const features = [
    {
      icon: "🎯",
      title: "Easy Registration",
      description:
        "Simple and streamlined process for both students and employers to register for career fairs.",
    },
    {
      icon: "🤝",
      title: "Direct Connections",
      description:
        "Connect directly with potential employers or candidates through our platform.",
    },
    {
      icon: "📊",
      title: "Smart Matching",
      description:
        "Advanced algorithms to match students with relevant job opportunities and companies.",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-grid-gray-900/[0.04] bg-[size:20px_20px]" />
          </div>

          <div className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8">
            <Container maxWidth="lg" className="text-center">
              <div className="relative z-10 mb-16">
                <Typography
                  variant="h4"
                  component="h1"
                  className="text-4xl md:text-7xl font-extrabold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 leading-tight"
                >
                  Career Fair
                  <br />
                  Registration System
                  <br />
                  <br />
                </Typography>

                <Typography
                  variant="body1"
                  className="text-xl md:text-2xl text-gray-600 mb-8 md:text-center lg:px-24 font-light"
                >
                  Connect with leading companies, explore opportunities, and
                  launch your career journey.
                </Typography>

                <div className="flex justify-center gap-4">
                  <Button
                    variant="contained"
                    size="large"
                    className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                  >
                    Browse Fairs
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-3"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </Container>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-16">
          <Container maxWidth="lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: "50+", label: "Career Fairs" },
                { number: "1000+", label: "Students Registered" },
                { number: "200+", label: "Partner Companies" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <Typography
                    variant="h3"
                    className="font-bold text-4xl md:text-5xl text-blue-600 mb-2"
                  >
                    {stat.number}
                  </Typography>
                  <Typography className="text-gray-600 text-lg">
                    {stat.label}
                  </Typography>
                </div>
              ))}
            </div>
          </Container>
        </div>

        <BusinessCategories />

        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <Container maxWidth="lg">
            <div className="text-center mb-16">
              <Typography
                variant="h3"
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
              >
                Why Choose Our Platform?
              </Typography>
              <Typography
                variant="h6"
                className="text-gray-600 max-w-2xl mx-auto"
              >
                Discover the advantages of our career fair registration system
              </Typography>
            </div>

            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <div className="group relative p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl">
                        {feature.icon}
                      </div>
                      <Typography
                        variant="h5"
                        className="font-bold mb-3 text-gray-800"
                      >
                        {feature.title}
                      </Typography>
                      <Typography className="text-gray-600">
                        {feature.description}
                      </Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
