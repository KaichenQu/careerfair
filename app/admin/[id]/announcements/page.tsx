"use client";
import Layout from "@/components/common/Layout";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface Announcement {
  id: number;
  message: string;
  timestamp: string;
}

export default function AnnouncementManagement() {
  const params = useParams();
  const router = useRouter();
  const adminId = params.id as string;
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] =
    useState<Announcement | null>(null);
  const [announcementText, setAnnouncementText] = useState("");

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/admin/${adminId}/announcement`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to fetch announcements");
      const data = await response.json();
      const formattedAnnouncements = data
        .map((item: any[]) => ({
          id: item[0],
          message: item[1],
          timestamp: item[2],
        }))
        // Sort by timestamp in descending order (newest first)
        .sort(
          (a: Announcement, b: Announcement) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      setAnnouncements(formattedAnnouncements);
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
      toast.error("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [adminId]);

  const handleSave = async () => {
    try {
      const url = editingAnnouncement
        ? `http://127.0.0.1:8000/admin/${adminId}/announcement/${editingAnnouncement.id}`
        : `http://127.0.0.1:8000/admin/${adminId}/announcement`;

      const response = await fetch(url, {
        method: editingAnnouncement ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify({
          announcement_content: announcementText,
        }),
      });

      if (!response.ok) throw new Error("Failed to save announcement");

      toast.success(
        editingAnnouncement ? "Announcement updated" : "Announcement created"
      );
      setOpenDialog(false);
      setAnnouncementText("");
      setEditingAnnouncement(null);
      fetchAnnouncements();
    } catch (error) {
      toast.error("Failed to save announcement");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/admin/${adminId}/announcement/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to delete announcement");
      toast.success("Announcement deleted");
      fetchAnnouncements();
    } catch (error) {
      toast.error("Failed to delete announcement");
    }
  };

  return (
    <Layout>
      <Container maxWidth="lg" className="py-8">
        <Box className="flex justify-between items-center mb-6">
          <Typography
            variant="h4"
            className="font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Announcements Dashboard
          </Typography>
          <Fab
            color="primary"
            onClick={() => {
              setEditingAnnouncement(null);
              setAnnouncementText("");
              setOpenDialog(true);
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            <AddIcon />
          </Fab>
        </Box>

        <Grid container spacing={3}>
          {announcements.map((announcement) => (
            <Grid item xs={12} key={announcement.id}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent>
                  <Box className="flex justify-between items-start">
                    <Box className="flex-grow">
                      <Typography
                        variant="body1"
                        className="font-medium mb-2 text-gray-800"
                      >
                        {announcement.message}
                      </Typography>
                      <Typography variant="caption" className="text-gray-500">
                        {new Date(announcement.timestamp).toLocaleString()}
                      </Typography>
                    </Box>
                    <Box className="flex space-x-2">
                      <IconButton
                        onClick={() => {
                          setEditingAnnouncement(announcement);
                          setAnnouncementText(announcement.message);
                          setOpenDialog(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(announcement.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            {editingAnnouncement
              ? "Edit Announcement"
              : "Create New Announcement"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              fullWidth
              multiline
              rows={4}
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="Enter your announcement here..."
              className="mt-4"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              className="bg-gradient-to-r from-blue-600 to-purple-600"
              disabled={!announcementText.trim()}
            >
              {editingAnnouncement ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
}
