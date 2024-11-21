"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Layout from '@/app/Components/common/Layout';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

interface AdminProfileData {
  id: string;
  name: string;
  email: string;
}

const AdminProfile = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<AdminProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordEdit, setShowPasswordEdit] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get admin_id from localStorage (set during login)
        const admin_id = localStorage.getItem('admin_id');
        
        if (!admin_id) {
          toast.error('Admin ID not found');
          router.push('/login');
          return;
        }

        const response = await fetch(`/api/admin/${admin_id}/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include your authentication token if required
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          credentials: 'include', // Important for cookies
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwords.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    try {
      const admin_id = localStorage.getItem('admin_id');
      
      const response = await fetch(`/api/admin/${admin_id}/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          current_password: passwords.currentPassword,
          new_password: passwords.newPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update password');
      }
      
      toast.success('Password updated successfully');
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordEdit(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update password');
      console.error(error);
    }
  };

  // Rest of your component remains the same...
  // (Keep all the JSX rendering code as it was)

};

export default AdminProfile;