"use client";

import React from "react";
import { Container, Typography, Card, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import Layout from "../common/Layout";
import {
  AccountCircle as ProfileIcon,
  EventAvailable as RegisterIcon,
  Groups as AttendIcon,
} from "@mui/icons-material";

const FacultyPage = () => {
  const router = useRouter();

  const menuItems = [
    {
      title: "Profile",
      icon: <ProfileIcon className="text-5xl text-blue-500" />,
      path: "/faculty/profile",
      description: "View and edit your faculty profile",
    },
    {
      title: "Register Career Fair",
      icon: <RegisterIcon className="text-5xl text-blue-500" />,
      path: "/faculty/register-career-fair",
      description: "Create and manage career fair events",
    },
    {
      title: "Attend Career Fair",
      icon: <AttendIcon className="text-5xl text-blue-500" />,
      path: "/faculty/attend-career-fair",
      description: "View and participate in upcoming career fairs",
    },
  ];

  return (
    <Layout>
      <Container maxWidth="lg" className="py-12">
        <Typography
          variant="h3"
          component="h1"
          className="mb-8 text-center font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
        >
          Faculty Dashboard
        </Typography>

        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => router.push(item.path)}
              className="cursor-pointer group"
            >
              <Card className="h-full p-6 relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                {/* Folded corner effect */}
                <div className="absolute top-0 right-0 w-24 h-24 transition-transform duration-300 origin-top-right group-hover:scale-110 pointer-events-none">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/20 to-transparent transform rotate-45" />
                  <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[141%] h-[141%] bg-white transform origin-top-right -rotate-45 translate-x-2 -translate-y-2 shadow-lg" />
                  </div>
                  <div className="absolute top-3 right-3 transform rotate-45 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Typography variant="caption" className="font-semibold">
                      View
                    </Typography>
                  </div>
                </div>

                <Box className="flex flex-col items-center space-y-4 relative z-10">
                  {item.icon}
                  <Typography
                    variant="h5"
                    className="font-bold text-gray-800 text-center"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-gray-600 text-center"
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Card>
            </div>
          ))}
        </Box>
      </Container>
    </Layout>
  );
};

export default FacultyPage;
