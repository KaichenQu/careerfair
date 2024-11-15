"use client";

import React, { useState, useEffect } from "react";
import { IconButton, Fade } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fade in={isVisible}>
      <IconButton
        onClick={scrollToTop}
        aria-label="scroll to top"
        sx={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 1000,
          backgroundColor: "rgba(99, 102, 241, 0.9)",
          color: "white",
          width: 45,
          height: 45,
          borderRadius: "12px",
          boxShadow: "0 4px 14px 0 rgba(0,0,0,0.15)",
          "&:hover": {
            backgroundColor: "rgba(99, 102, 241, 1)",
            transform: "translateY(-2px)",
          },
          transition: "all 0.2s ease-in-out",
        }}
      >
        <KeyboardArrowUp fontSize="medium" />
      </IconButton>
    </Fade>
  );
};

export default BackToTop;
