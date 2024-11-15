"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
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

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const menuItems = [
    { text: "Home", icon: <Home />, href: "/" },
    { text: "Events", icon: <Event />, href: "/events" },
    { text: "Companies", icon: <Business />, href: "/companies" },
    { text: "Students", icon: <People />, href: "/students" },
    { text: "Login", icon: <Login />, href: "/login" },
  ];

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem
          key={item.text}
          onClick={() => (window.location.href = item.href)}
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Career Fair Registration System
        </Typography>
        {isMobile ? (
          <>
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
          </>
        ) : (
          <div className="hidden md:flex">
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                startIcon={item.icon}
                component={Link}
                href={item.href}
              >
                {item.text}
              </Button>
            ))}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
