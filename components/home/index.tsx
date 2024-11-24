"use client";

import React, { useRef, useEffect } from "react";
import { Typography, Container, Button, Grid } from "@mui/material";
import Layout from "../common/Layout";
import BusinessCategories from "./BusinessCategories";
import { useRouter } from "next/navigation";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";

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
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const secondPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('Home Page Auth State:', { user, isAuthenticated });
  }, [user, isAuthenticated]);

  const scrollToNextSection = () => {
    secondPageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
      <div
        id="homeContainer"
        className="h-[calc(100vh-64px)] snap-y snap-mandatory overflow-y-auto scroll-smooth"
      >
        {/* First Page - Hero Section */}
        <div className="snap-start h-[calc(100vh-64px)] relative flex items-center">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute inset-0 bg-grid-gray-900/[0.04] bg-[size:20px_20px]" />
          </div>

          <Container maxWidth="lg" className="relative z-10">
            <div className="text-center">
              {isAuthenticated && user && (
                <Typography variant="h6" className="mb-4 text-blue-600">
                  Welcome, {user.email}!
                </Typography>
              )}

              <Typography
                variant="h4"
                component="h1"
                className="text-4xl md:text-6xl font-bold mb-12 text-gray-900"
              >
                Career Fair
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                  Registration System
                </span>
              </Typography>

              <p className="text-2xl font-medium text-gray-800 mb-8 max-w-3xl mx-auto leading-relaxed">
                "Connecting talented students with leading companies through{" "}
                <span className="text-blue-600 font-semibold">
                  seamless career fair experiences
                </span>
                . Your future starts here."
              </p>

              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                Join thousands of students and hundreds of companies who have
                already found their perfect match through our platform.
              </p>

              <div className="flex justify-center gap-4 mt-8">
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => router.push("/careerFair")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                >
                  Browse Fairs
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => router.push("/login")}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  Sign In
                </Button>
              </div>

              <div className="mt-12">
                <Button
                  onClick={scrollToNextSection}
                  className="animate-bounce"
                  sx={{
                    color: "rgba(59, 130, 246, 0.8)",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "rgba(59, 130, 246, 1)",
                    },
                  }}
                >
                  <KeyboardArrowDown fontSize="large" />
                </Button>
              </div>
              <br />
              <br />
            </div>
          </Container>
        </div>

        {/* Second Page - Stats Section */}
        <div ref={secondPageRef} className="snap-start h-[calc(100vh-64px)]">
          <div className="bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30 py-10">
            <Container maxWidth="lg">
              <Typography
                variant="h3"
                className="text-center text-2xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text pb-1"
                style={{
                  paddingBottom: "0.15em",
                  lineHeight: "1.3",
                }}
              >
                Our Growing Community
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-3">
                {[
                  { number: "30+", label: "Colleges", icon: "🎓" },
                  { number: "1000+", label: "Students Registered", icon: "👥" },
                  { number: "200+", label: "Partner Companies", icon: "🏢" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center group cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="mb-4 text-4xl">{stat.icon}</div>
                    <Typography
                      variant="h3"
                      className="font-bold text-5xl md:text-6xl text-transparent bg-clip-text mb-3 group-hover:scale-105 transition-transform duration-300"
                      style={{
                        background:
                          "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                        WebkitBackgroundClip: "text",
                        textShadow: "4px 4px 8px rgba(59, 130, 246, 0.2)",
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      className="text-gray-600 text-lg md:text-xl font-medium tracking-wide"
                      style={{
                        textShadow: "0 2px 4px rgba(0,0,0,0.05)",
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </div>
                ))}
              </div>
              <BusinessCategories />
            </Container>
          </div>
        </div>

        {/* Features section */}
        <section
          id="features-section"
          className="snap-start h-[calc(100vh-64px)] py-20 bg-gradient-to-b from-white to-gray-50"
        >
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
                  <div className="h-full group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-12 h-12 mb-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl">
                        {feature.icon}
                      </div>
                      <Typography
                        variant="h5"
                        className="font-bold mb-4 text-gray-800"
                      >
                        {feature.title}
                      </Typography>
                      <Typography className="text-gray-600 flex-grow">
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
