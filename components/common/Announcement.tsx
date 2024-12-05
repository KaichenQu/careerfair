"use client";

import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Campaign as CampaignIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

interface Announcement {
  id: number;
  message: string;
  timestamp: string;
}

const adminOptions = [
  { id: "1", name: "ADMIN1" },
  { id: "2", name: "ADMIN2" },
  { id: "3", name: "ADMIN3" },
  { id: "4", name: "ADMIN4" },
];

const Announcement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState("1");
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const fetchAnnouncements = async (adminId: string) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/admin/${adminId}/announcement`
      );
      const data = await response.json();
      const formattedAnnouncements = data
        .map((item: any[]) => ({
          id: item[0],
          message: item[1],
          timestamp: item[2],
        }))
        .sort(
          (a: Announcement, b: Announcement) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      setAnnouncements(formattedAnnouncements);
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAnnouncements(selectedAdmin);
    }
  }, [isOpen, selectedAdmin]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <>
      <Box
        sx={{ position: "fixed", left: "20px", bottom: "20px", zIndex: 1000 }}
      >
        <IconButton
          onClick={() => setIsOpen(true)}
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": { backgroundColor: "primary.dark" },
            width: 56,
            height: 56,
            boxShadow: 3,
          }}
        >
          <CampaignIcon />
        </IconButton>
      </Box>

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            width: 320,
            p: 2,
            backgroundColor: "#f8fafc",
          },
        }}
      >
        <Box className="flex justify-between items-center mb-4">
          <Typography variant="h6" className="font-bold text-gray-800">
            Announcements
          </Typography>
          <IconButton onClick={() => setIsOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <FormControl fullWidth size="small" className="mb-4">
          <InputLabel>Select Admin</InputLabel>
          <Select
            value={selectedAdmin}
            label="Select Admin"
            onChange={(e) => setSelectedAdmin(e.target.value)}
          >
            {adminOptions.map((admin) => (
              <MenuItem key={admin.id} value={admin.id}>
                {admin.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider className="mb-4" />

        <List className="space-y-2">
          {announcements.map((announcement) => (
            <ListItem
              key={announcement.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <ListItemText
                primary={announcement.message}
                secondary={formatDate(announcement.timestamp)}
                primaryTypographyProps={{
                  className: "text-gray-700 font-medium",
                }}
                secondaryTypographyProps={{
                  className: "text-gray-500 text-sm",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Announcement;
