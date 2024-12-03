"use client";

import React, { useRef, useEffect, useState } from "react";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const welcomeMessage =
    mounted && isAuthenticated && user?.email ? (
      <Typography variant="h6" className="mb-4 text-blue-600">
        Welcome, {user.email}!
      </Typography>
    ) : null;

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
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50/20" />
            <div className="absolute inset-0 bg-grid-gray-900/[0.03] bg-[size:20px_20px]" />
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl" />
          </div>

          <Container maxWidth="lg" className="relative z-10">
            <div className="text-center">
              <Typography
                variant="h4"
                component="h1"
                className="text-1xl md:text-7xl font-bold mb-12 text-gray-900 text-center"
              >
                <span
                  className="font-extrabold bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-transparent bg-clip-text animate-gradient block text-6xl md:text-8xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)] filter drop-shadow-lg"
                  style={{
                    textShadow: "4px 4px 8px rgba(59, 130, 246, 0.3)",
                    WebkitTextStroke: "1px rgba(59, 130, 246, 0.1)",
                  }}
                >
                  Career Fair
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text font-extrabold text-3xl md:text-4xl">
                  Registration System
                </span>
              </Typography>

              <p className="text-2xl font-medium text-gray-800 mb-8 max-w-3xl mx-auto leading-relaxed text-center">
                <span className="italic text-gray-700">"</span>
                <span className="text-gray-700">
                  Connecting talented students with leading companies through{" "}
                </span>
                <span className="text-blue-600 font-semibold relative inline-block">
                  seamless career fair experiences
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600/30"></span>
                </span>
                <span className="text-gray-700">
                  . Your future starts here.
                </span>
                <span className="italic text-gray-700">"</span>
              </p>

              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in text-center">
                Join{" "}
                <span className="font-semibold text-blue-600">
                  thousands of students
                </span>{" "}
                and{" "}
                <span className="font-semibold text-purple-600">
                  hundreds of companies
                </span>{" "}
                who have already found their perfect match through our platform.
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
                {!isAuthenticated && (
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => router.push("/login")}
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-all duration-300"
                  >
                    Sign In
                  </Button>
                )}
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
                className="font-bold text-center text-3xl md:text-6xl font-bold mb-16 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-transparent bg-clip-text animate-gradient"
                style={{
                  paddingBottom: "0.15em",
                  lineHeight: "1.3",
                }}
              >
                What we offer
              </Typography>

              <Grid container spacing={6}>
                {features.map((feature, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <div className="h-full group relative p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="w-16 h-16 mb-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl transform group-hover:rotate-12 transition-transform duration-300">
                          {feature.icon}
                        </div>
                        <Typography
                          variant="h5"
                          className="font-bold text-3xl mb-4 text-gray-800 group-hover:text-blue-600 transition-colors duration-300 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
                        >
                          {feature.title}
                        </Typography>
                        <Typography className="text-gray-600 text-lg flex-grow leading-relaxed tracking-wide">
                          {feature.description}
                        </Typography>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
              <BusinessCategories />
            </Container>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
