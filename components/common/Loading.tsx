import React from "react";
import { Box, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
      <div className="flex space-x-2">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
            style={{
              animationDelay: `${index * 0.15}s`,
              animationDuration: "0.8s",
              backgroundColor: "rgb(59, 130, 246)", // Explicit blue color
            }}
          />
        ))}
      </div>
      <Typography className="text-gray-600 font-medium" variant="h6">
        Loading...
      </Typography>
    </Box>
  );
};

export default Loading;
