"use client";

import React from "react";
import { Container, Typography, Card, Box, Button, Chip } from "@mui/material";
import {
  Event as EventIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
} from "@mui/icons-material";

import Navbar from "@/Components/common/Navbar";

const attendedFairs = [
  {
    id: 1,
    name: "Spring Tech Career Fair 2024",
    date: "2024-04-15",
    time: "10:00 AM - 4:00 PM",
    location: "University Center Ballroom",
    status: "Attended",
  },
  {
    id: 2,
    name: "Engineering Career Expo",
    date: "2024-05-20",
    time: "9:00 AM - 3:00 PM",
    location: "Engineering Building",
    status: "Attended",
  },
  {
    id: 3,
    name: "Business & Finance Fair",
    date: "2024-06-10",
    time: "11:00 AM - 5:00 PM",
    location: "Business School Auditorium",
    status: "Attended",
  },
];

export default function AttendedCareerFairPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Container maxWidth="lg" className="py-12">
        <Typography
          variant="h3"
          component="h1"
          className="mb-8 text-center font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
        >
          Attended Career Fairs
        </Typography>

        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attendedFairs.map((fair) => (
            <div key={fair.id} className="cursor-pointer group">
              <Card className="h-full p-6 relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-white">
                {/* Folded corner effect */}
                <div className="absolute top-0 right-0 w-24 h-24 transition-transform duration-300 origin-top-right group-hover:scale-110">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/20 to-transparent transform rotate-45" />
                  <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[141%] h-[141%] bg-white transform origin-top-right -rotate-45 translate-x-2 -translate-y-2 shadow-lg" />
                  </div>
                </div>

                <Box className="flex flex-col h-full">
                  <Typography
                    variant="h5"
                    className="font-bold text-gray-800 mb-4"
                  >
                    {fair.name}
                  </Typography>

                  <Box className="flex items-center gap-2 mb-3 text-gray-600">
                    <EventIcon className="text-blue-500" />
                    <Typography>
                      {new Date(fair.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Typography>
                  </Box>

                  <Box className="flex items-center gap-2 mb-3 text-gray-600">
                    <TimeIcon className="text-blue-500" />
                    <Typography>{fair.time}</Typography>
                  </Box>

                  <Box className="flex items-center gap-2 mb-4 text-gray-600">
                    <LocationIcon className="text-blue-500" />
                    <Typography>{fair.location}</Typography>
                  </Box>

                  <Box className="mt-auto">
                    <Chip
                      label={fair.status}
                      color="success"
                      variant="outlined"
                      className="mb-4"
                    />

                    <Button variant="outlined" fullWidth color="primary">
                      View Details
                    </Button>
                  </Box>
                </Box>
              </Card>
            </div>
          ))}
        </Box>

        {attendedFairs.length === 0 && (
          <Card className="p-8 text-center">
            <Typography variant="h6" className="text-gray-600">
              You haven't attended any career fairs yet.
            </Typography>
            <Typography className="text-gray-500 mt-2">
              Check available career fairs to participate.
            </Typography>
          </Card>
        )}
      </Container>
    </div>
  );
}
