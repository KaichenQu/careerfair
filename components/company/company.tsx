'use client';

import Layout from '@/components/common/Layout';
import { useEffect, useState } from 'react';
import { companyAPI, type CompanyProfile } from '@/services/api';
import { useRouter } from 'next/navigation';
import {
  Container,
  Typography,
  Grid,
  Box,
  Chip,
  Skeleton,
  Card,
  Button,
} from '@mui/material';
import {
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Description as DescriptionIcon,
  Edit as EditIcon,
  Dashboard as DashboardIcon,
  WorkOutline as PublishIcon,
} from '@mui/icons-material';

const CompanyDashboard = ({id}: {id: number}) => {
  const router = useRouter();
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await companyAPI.getCompanyById(id);
        console.log('Received profile data:', data);
        setProfile(data);
      } catch (err) {
        console.error('Failed to load company profile');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [id]);

  const handleCareerFairClick = () => {
    console.log('Current profile state:', profile);
    
    const storedUserId = id;
    console.log('Stored user ID:', storedUserId);

    if (storedUserId) {
      console.log('Using stored user ID:', storedUserId);
      router.push(`/company/${storedUserId}/careerfair`);
    } else {
      console.error('No company ID available');
    }
  };

  const handlePositionsClick = () => {
    const storedUserId = id;
    if (storedUserId) {
      router.push(`/company/${storedUserId}/positions`);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Container maxWidth="lg" className="py-8">
          <Skeleton variant="rectangular" height={200} className="mb-4 rounded-lg" />
          <Skeleton variant="rectangular" height={400} className="rounded-lg" />
        </Container>
      </Layout>
    );
  }

  if (!profile) return <div>No profile found</div>;

  return (
    <Layout>
      <Box className="min-h-screen bg-gray-50">
        <Container maxWidth="lg" className="py-8">
          {/* Hero Section */}
          <Card className="mb-8 overflow-hidden">
            <Box className="relative h-[200px] bg-gradient-to-r from-blue-600 to-purple-600">
              <Box className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <Typography variant="h3" className="font-bold mb-2">
                  {profile.name}
                </Typography>
                <Box className="flex gap-2">
                  <Chip
                    icon={<BusinessIcon className="text-blue-200" />}
                    label={profile.industry}
                    className="bg-white/20 text-white"
                  />
                  <Chip
                    icon={<LocationIcon className="text-blue-200" />}
                    label={profile.location}
                    className="bg-white/20 text-white"
                  />
                </Box>
              </Box>
            </Box>
          </Card>

          {/* Action Buttons */}
          <Grid container spacing={3} className="mb-8">
          <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<PublishIcon />}
                onClick={handlePositionsClick}
                className="bg-indigo-600 hover:bg-indigo-700 py-3 text-lg normal-case"
              >
                Publish Position
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<DashboardIcon />}
                onClick={handleCareerFairClick}
                className="bg-blue-600 hover:bg-blue-700 py-3 text-lg normal-case"
              >
                Career Fair
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => router.push(`/company/${id}/edit`)}
                className="bg-purple-600 hover:bg-purple-700 py-3 text-lg normal-case"
              >
                Edit Profile
              </Button>
            </Grid>
            
          </Grid>

          {/* Main Content */}
          <Grid container spacing={4}>
            {/* Left Column - Contact Information */}
            <Grid item xs={12} md={4}>
              <Card className="p-6 h-full">
                <Typography variant="h6" className="font-bold mb-4 flex items-center">
                  <PersonIcon className="mr-2 text-blue-500" />
                  Contact Information
                </Typography>
                
                <Box className="space-y-4">
                  <Box className="p-4 bg-gray-50 rounded-lg">
                    <Typography variant="subtitle2" className="text-gray-600">Contact Name</Typography>
                    <Typography variant="h6">{profile.contact_name}</Typography>
                  </Box>
                  
                  <Box className="p-4 bg-gray-50 rounded-lg">
                    <Typography variant="subtitle2" className="text-gray-600">Contact Phone</Typography>
                    <Typography variant="h6">{profile.contact_phone}</Typography>
                  </Box>
                  
                  <Box className="p-4 bg-gray-50 rounded-lg">
                    <Typography variant="subtitle2" className="text-gray-600">Contact Email</Typography>
                    <Typography variant="h6">{profile.contact_email || 'Not provided'}</Typography>
                  </Box>

                  <Box className="p-4 bg-gray-50 rounded-lg">
                    <Typography variant="subtitle2" className="text-gray-600">Company Email</Typography>
                    <Typography variant="h6">{profile.email}</Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>

            {/* Right Column - Company Info */}
            <Grid item xs={12} md={8}>
              <Card className="p-6 h-full">
                <Typography variant="h6" className="font-bold mb-4 flex items-center">
                  <DescriptionIcon className="mr-2 text-blue-500" />
                  Company Information
                </Typography>
                
                <Box className="mb-6">
                  <Box 
                    component="img"
                    src="https://picsum.photos/800/400"
                    alt="Company Image"
                    className="w-full h-[300px] object-cover rounded-lg mb-6"
                  />
                  <Typography className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {profile.profile}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

    </Layout>
  );
};

export default CompanyDashboard; 