import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Home, Event, Business, People, Login } from "@mui/icons-material";

const HomePage: React.FC = () => {
  //   const [userToken, setUserToken] = useState<string | null>(null);

  //   const handleLogin = async (username: string, password: string) => {
  //     const response = await fetch("/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });
  //     const data = await response.json();
  //     setUserToken(data.token);
  //   };

  //   const handleRegister = async (
  //     userType: string,
  //     name: string,
  //     email: string,
  //     password: string
  //   ) => {
  //     await fetch("/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ userType, name, email, password }),
  //     });
  //   };

  //   const fetchCareerFairInfo = async () => {
  //     const response = await fetch("/careerFair", {
  //       headers: {
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   };

  //   const registerCareerFair = async () => {
  //     await fetch("/careerFair/register", {
  //       headers: {
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //     });
  //   };

  //   const attendCareerFair = async () => {
  //     await fetch("/careerFair/attend", {
  //       headers: {
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //     });
  //   };

  //   const fetchPositions = async () => {
  //     const response = await fetch("/careerFair/position", {
  //       headers: {
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   };

  //   const applyForPosition = async (positionId: string) => {
  //     await fetch("/careerFair/position/apply", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //       body: JSON.stringify({ positionId }),
  //     });
  //   };

  return (
    <div className="bg-gray-100 text-white min-h-screen">
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Career Fair Registration System
          </Typography>
          <Button color="inherit" startIcon={<Home />} href="/">
            Home
          </Button>
          <Button color="inherit" startIcon={<Event />} href="/events">
            Events
          </Button>
          <Button color="inherit" startIcon={<Business />} href="/companies">
            Companies
          </Button>
          <Button color="inherit" startIcon={<People />} href="/students">
            Students
          </Button>
          <Button color="inherit" startIcon={<Login />} href="/login">
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <div className="bg-gray-100 min-h-screen">
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ color: "#000" }}
          >
            Welcome to the Career Fair Registration System
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: "#000" }}>
            This platform allows students to register for career fairs, view
            participating companies, and learn about upcoming events.
          </Typography>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
