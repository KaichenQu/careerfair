'use client';

import { useEffect, useState } from 'react';
import { facultyAPI, FacultyCareerFair } from '@/services/api';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from '@mui/material';

export default function FacultyAttendance() {
  const [attendedFairs, setAttendedFairs] = useState<FacultyCareerFair[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          throw new Error('User ID not found');
        }

        console.log('Fetching data for user ID:', userId);
        const dashboardData = await facultyAPI.getDashboard(userId);
        console.log('Dashboard data:', dashboardData);
        
        setAttendedFairs(dashboardData.attended_fairs);
      } catch (error) {
        console.error('Error fetching attendance history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Typography variant="h5" gutterBottom>
        Attendance History ({attendedFairs.length} fairs)
      </Typography>
      {attendedFairs.length === 0 ? (
        <Typography>No attendance history found.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fair Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendedFairs.map((fair) => (
              <TableRow key={fair.fair_id}>
                <TableCell>{fair.fair_name}</TableCell>
                <TableCell>{fair.careerfair_date}</TableCell>
                <TableCell>{fair.location}</TableCell>
                <TableCell>{fair.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}