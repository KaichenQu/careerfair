'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Layout from '@/components/common/Layout';
import { companyAPI, type CompanyDashboardData } from '@/services/api';

const CareerFair = () => {
  const router = useRouter();
  const userId = typeof window !== 'undefined' 
    ? window.location.pathname.split('/')[2]
    : null;

  console.log('Current user ID from URL:', userId);
  const [fairs, setFairs] = useState<CompanyDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userId) return;
      
      setLoading(true);
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Registered Fairs Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Registered Fairs</h2>
            {fairs?.registered_fairs?.length ? (
              fairs.registered_fairs.map((fair) => (
                <div key={fair.fair_id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <h3 className="text-xl font-semibold mb-2">{fair.fair_name}</h3>
                  <p className="text-gray-600 mb-1">Date: {fair.careerfair_date}</p>
                  <p className="text-gray-600 mb-1">Location: {fair.location}</p>
                  <p className="text-gray-600">{fair.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No registered fairs found.</p>
            )}
          </div>

          {/* Attended Fairs Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Attended Fairs</h2>
            {fairs?.attended_fairs?.length ? (
              fairs.attended_fairs.map((fair) => (
                <div key={fair.fair_id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <h3 className="text-xl font-semibold mb-2">{fair.fair_name}</h3>
                  <p className="text-gray-600 mb-1">Date: {fair.careerfair_date}</p>
                  <p className="text-gray-600 mb-1">Location: {fair.location}</p>
                  <p className="text-gray-600">{fair.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No attended fairs found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CareerFair; 