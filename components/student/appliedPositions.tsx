"use client";

import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, CircularProgress } from '@mui/material';
import Layout from '@/components/common/Layout';
import { studentAPI, type AppliedPosition } from '@/services/api';

interface AppliedPositionsProps {
  studentId: number;
}

const AppliedPositions = ({ studentId }: AppliedPositionsProps) => {
  const [positions, setPositions] = useState<AppliedPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadApplications = async () => {
      try {
        console.log('Fetching applications for student:', studentId);
        const data = await studentAPI.getAppliedPositions(studentId);
        console.log('API Response:', data);
        setPositions(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading applications:', err);
        setError('Failed to load applications');
        setLoading(false);
      }
    };

    loadApplications();
  }, [studentId]);

  console.log('Rendering with positions:', positions);

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;

  return (
    <Layout>
      <Container maxWidth="md" className="py-8">
        <Typography variant="h4" className="mb-6 text-center font-bold">
          Applied Positions
        </Typography>

        {positions?.length === 0 ? (
          <Paper className="p-6 text-center">
            <Typography>No applications found.</Typography>
          </Paper>
        ) : (
          positions?.map((position) => (
            <Paper key={position.position_id} className="p-6 mb-4 hover:shadow-lg transition-shadow">
              <Box className="space-y-2">
                <Typography variant="h6" className="font-bold text-blue-600">
                  {position.position_name} at {position.company_name}
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                  {position.position_description}
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  Applied on: {new Date(position.submission_time).toLocaleDateString()}
                </Typography>
              </Box>
            </Paper>
          ))
        )}
      </Container>
    </Layout>
  );
};

export default AppliedPositions;