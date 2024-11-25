'use client';

import { useEffect, useState } from 'react';
import { facultyAPI, FacultyCareerFair } from '@/services/api';
import Layout from '@/components/common/Layout';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography,
  Box,
  Tabs,
  Tab
} from '@mui/material';
import { parseISO, isBefore, startOfDay } from 'date-fns';

export default function FacultyAttendance() {
  const [attendedFairs, setAttendedFairs] = useState<FacultyCareerFair[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          throw new Error('User ID not found');
        }

        const dashboardData = await facultyAPI.getDashboard(userId);
        setAttendedFairs(dashboardData.attended_fairs);
      } catch (error) {
        console.error('Error fetching attendance history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const splitAttendedFairs = () => {
    const today = startOfDay(new Date());
    
    return {
      upcoming: attendedFairs.filter(fair => 
        !isBefore(parseISO(fair.careerfair_date), today)
      ),
      history: attendedFairs.filter(fair => 
        isBefore(parseISO(fair.careerfair_date), today)
      )
    };
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  const { upcoming, history } = splitAttendedFairs();

  const AttendanceTable = ({ fairs }: { fairs: FacultyCareerFair[] }) => (
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
        {fairs.map((fair) => (
          <TableRow key={fair.fair_id}>
            <TableCell>{fair.fair_name}</TableCell>
            <TableCell>{new Date(fair.careerfair_date).toLocaleDateString()}</TableCell>
            <TableCell>{fair.location}</TableCell>
            <TableCell>{fair.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Layout>
      <Paper sx={{ p: 3, m: 2 }}>
        <Typography variant="h5" gutterBottom>
        Attendance History (Total: {attendedFairs.length} fairs)
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label={`Upcoming (${upcoming.length})`} />
          <Tab label={`History (${history.length})`} />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <Box>
          {upcoming.length === 0 ? (
            <Typography>No upcoming attended fairs.</Typography>
          ) : (
            <AttendanceTable fairs={upcoming} />
          )}
        </Box>
      )}

      {tabValue === 1 && (
        <Box>
          {history.length === 0 ? (
            <Typography>No past attended fairs.</Typography>
          ) : (
            <AttendanceTable fairs={history} />
          )}
        </Box>
      )}
    </Paper>
    </Layout>
  );
}