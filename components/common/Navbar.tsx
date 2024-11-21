"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import {
  Home,
  Event,
  Business,
  People,
  Login,
  Menu as MenuIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Navbar Component
 * Main navigation component for the application
 * Features:
 * - Responsive design with mobile drawer
 * - Dynamic menu items
 * - Material-UI integration
 * - Automatic mobile/desktop view switching
 */
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (href: string) => {
    if (href === "/" && window.location.pathname === "/") {
      const mainContainer = document.querySelector(".snap-y");
      if (mainContainer) {
        mainContainer.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      router.push(href);
    }
  };

  const menuItems = [
    { text: "Home", icon: <Home />, href: "/" },
    { text: "Career Fairs", icon: <Event />, href: "/careerFair" },
    { text: "Companies", icon: <Business />, href: "/companies" },
    { text: "Students", icon: <People />, href: "/student" },
    { text: "Login", icon: <Login />, href: "/login" },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          key={item.text}
          onClick={() => handleNavigation(item.href)}
          className="transition-colors duration-200 hover:bg-blue-50"
          sx={{
            cursor: "pointer",
            "&:hover": {
              "& .MuiListItemIcon-root": {
                color: "#1976d2",
              },
              "& .MuiListItemText-primary": {
                color: "#1976d2",
              },
            },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Box
          className="ml-2 flex items-center cursor-pointer"
          sx={{ flexGrow: 2 }}
          onClick={() => handleNavigation("/")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/6427/6427283.png"
            alt="Career Fair Logo"
            style={{
              height: "40px",
              width: "auto",
              marginRight: "16px",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontFamily: "var(--font-geist-sans)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "white",
              position: "relative",
              textShadow:
                "2px 2px 4px rgba(0,0,0,0.2), 0 0 1em rgba(255,255,255,0.2)",
              WebkitTextFillColor: "white",
              filter: "drop-shadow(0 0 2px rgba(0,0,0,0.3))",
            }}
          >
            Career Fair
          </Typography>
        </Box>
        <div className="hidden lg:flex">
          {menuItems.map((item) => (
            <Button
              key={item.text}
              color="inherit"
              startIcon={item.icon}
              onClick={() => handleNavigation(item.href)}
            >
              {item.text}
            </Button>
          ))}
        </div>
        <div className="lg:hidden">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
          >
            {drawer}
          </Drawer>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
