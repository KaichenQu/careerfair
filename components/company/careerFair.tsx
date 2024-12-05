'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Layout from '@/components/common/Layout';
import { companyAPI, type CompanyDashboardData } from '@/services/api';
import { Button, Snackbar, Alert } from '@mui/material';
import { parseISO, isBefore, startOfDay } from 'date-fns';

const CareerFair = () => {
  const router = useRouter();
  const userId = typeof window !== 'undefined' 
    ? window.location.pathname.split('/')[2]
    : null;

  console.log('Current user ID from URL:', userId);
  const [fairs, setFairs] = useState<CompanyDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userId) return;
      
      setLoading(true);

      console.log(userId);
      try {
        console.log('Fetching dashboard for user ID:', userId);
        const data = await companyAPI.getDashboard(userId);
        console.log('Dashboard data received:', data);
        setFairs(data);
        setError(null);
      } catch (error: any) {
        console.error('Error fetching dashboard data:', error);
        setError(error.response?.data?.message || 'Failed to load career fairs');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId]);

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleWithdrawal = async (fairId: number) => {
    try {
      console.log(`Attempting to withdraw from fair ID: ${fairId}`);
      const response = await fetch(`http://127.0.0.1:8000/careerFair/${fairId}/cancelRegister/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to withdraw');
      }

      const data = await response.json();
      console.log('Withdrawal successful:', data);

      setFairs(prev => prev ? {
        ...prev,
        registered_fairs: prev.registered_fairs.filter(fair => fair.fair_id !== fairId)
      } : null);

      setSnackbar({
        open: true,
        message: data.message || 'Successfully withdrawn from career fair',
        severity: 'success'
      });
    } catch (err) {
      console.error('Withdrawal failed:', err);
      setSnackbar({
        open: true,
        message: 'Failed to withdraw from career fair',
        severity: 'error'
      });
    }
  };

  const handleConfirmAttendance = async (fairId: number) => {
    try {
      const userId = typeof window !== 'undefined' 
        ? window.location.pathname.split('/')[2]
        : null;

      if (!userId) {
        throw new Error('User ID not found');
      }
      
      console.log(userId);
      // First mark as attended
      const attendResponse = await fetch(`http://127.0.0.1:8000/careerFair/${fairId}/attend/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          user_id: userId 
        }),
      });

      if (!attendResponse.ok) {
        const errorData = await attendResponse.json();
        throw new Error('Updated career fair');
      }
      console.log(fairId);
      // Then cancel the registration
      const cancelResponse = await fetch(`http://127.0.0.1:8000/careerFair/${fairId}/cancelRegister/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          user_id: userId 
        }),
      });

      if (!cancelResponse.ok) {
        const errorData = await cancelResponse.json();
        throw new Error('Updated career fair');
      }

      // Update the UI
      setFairs(prev => {
        if (!prev) return null;
        
        const confirmedFair = prev.registered_fairs.find(fair => fair.fair_id === fairId);
        
        return {
          ...prev,
          registered_fairs: prev.registered_fairs.filter(fair => fair.fair_id !== fairId),
          attended_fairs: confirmedFair 
            ? [...prev.attended_fairs, confirmedFair]
            : prev.attended_fairs
        };
      });

      setSnackbar({
        open: true,
        message: 'Successfully confirmed attendance',
        severity: 'success'
      });
    } catch (err) {
      console.error('Failed to confirm attendance:', err);
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : 'Failed to confirm attendance',
        severity: 'error'
      });
    }
  };

  // Split attended fairs into upcoming and history
  const splitAttendedFairs = (fairs: CompanyDashboardData['attended_fairs']) => {
    const today = startOfDay(new Date());
    return {
      upcoming: fairs.filter(fair => !isBefore(parseISO(fair.careerfair_date), today)),
      history: fairs.filter(fair => isBefore(parseISO(fair.careerfair_date), today))
    };
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-6">Loading career fairs...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-6 text-red-500">{error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Career Fairs</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Registered Fairs Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Registered Fairs</h2>
            {fairs?.registered_fairs?.length ? (
              fairs.registered_fairs.map((fair) => (
                <div key={fair.fair_id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <h3 className="text-xl font-semibold mb-2">{fair.fair_name}</h3>
                  <p className="text-gray-600 mb-1">Date: {fair.careerfair_date}</p>
                  <p className="text-gray-600 mb-1">Location: {fair.location}</p>
                  <p className="text-gray-600 mb-3">{fair.description}</p>
                  <div className="flex gap-2">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleWithdrawal(fair.fair_id)}
                    >
                      Withdraw Registration
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleConfirmAttendance(fair.fair_id)}
                    >
                      Confirm Attendance
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No registered fairs found.</p>
            )}
          </div>

          {/* Upcoming Attended Fairs Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Upcoming Attended Fairs</h2>
            {fairs?.attended_fairs && splitAttendedFairs(fairs.attended_fairs).upcoming.length > 0 ? (
              splitAttendedFairs(fairs.attended_fairs).upcoming.map((fair) => (
                <div key={fair.fair_id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <h3 className="text-xl font-semibold mb-2">{fair.fair_name}</h3>
                  <p className="text-gray-600 mb-1">Date: {fair.careerfair_date}</p>
                  <p className="text-gray-600 mb-1">Location: {fair.location}</p>
                  <p className="text-gray-600">{fair.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No upcoming attended fairs found.</p>
            )}
          </div>

          {/* Historical Attended Fairs Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Past Attended Fairs</h2>
            {fairs?.attended_fairs && splitAttendedFairs(fairs.attended_fairs).history.length > 0 ? (
              splitAttendedFairs(fairs.attended_fairs).history.map((fair) => (
                <div key={fair.fair_id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <h3 className="text-xl font-semibold mb-2">{fair.fair_name}</h3>
                  <p className="text-gray-600 mb-1">Date: {fair.careerfair_date}</p>
                  <p className="text-gray-600 mb-1">Location: {fair.location}</p>
                  <p className="text-gray-600">{fair.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No past attended fairs found.</p>
            )}
          </div>
        </div>

        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </Layout>
  );
};

export default CareerFair; 