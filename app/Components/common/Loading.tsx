import React from "react";
import { Box, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animate-wave1" />
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 animate-wave2" />
        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 animate-wave3" />
      </div>
      <Typography
        variant="h6"
        className="text-gray-600 animate-pulse font-light tracking-wider"
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default Loading;
