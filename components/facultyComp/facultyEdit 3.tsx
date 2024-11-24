import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { facultyAPI } from '@/services/api';

interface FacultyEditForm {
  email: string;
  name: string;
  password: string;
}

const FacultyEdit = () => {
  const router = useRouter();
  const { userId } = router.query; // If using route like /facultyEdit/[userId]
  // OR const userId = router.query.userId; // If using query parameters

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [facultyData, setFacultyData] = useState<FacultyEditForm | null>(null);

  // Fetch current faculty data
  useEffect(() => {
    const fetchFacultyData = async () => {
      if (!userId) return;
      
      try {
        const data = await facultyAPI.getProfile(userId);
        setFacultyData({
          name: data.name,
          email: data.email,
          password: '', // Password field starts empty
        });
      } catch (err) {
        setError('Failed to fetch faculty data');
      }
    };

    fetchFacultyData();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return;

    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data: FacultyEditForm = {
      email: formData.get('email') as string,
      name: formData.get('name') as string,
      password: formData.get('password') as string,
    };

    try {
      await facultyAPI.updateProfile(userId as string, data);
      alert('Profile updated successfully');
      router.push('/facultyDashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!facultyData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={facultyData.name}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={facultyData.email}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-2">
            New Password (leave empty to keep current)
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border rounded"
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white rounded ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default FacultyEdit;
