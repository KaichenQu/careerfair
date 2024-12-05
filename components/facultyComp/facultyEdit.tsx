"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { facultyAPI } from "@/services/api";
import Loading from "@/components/common/Loading";

interface FacultyEditForm {
  faculty_id: number;
  email: string;
  name: string;
  department: string;
}

const FacultyEdit = () => {
  const router = useRouter();
  const params = useParams();
  const userId = params.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [facultyData, setFacultyData] = useState<any>(null);

  useEffect(() => {
    const fetchFacultyData = async () => {
      if (!userId) return; // Wait for userId to be available

      try {
        setLoading(true);
        const data = await facultyAPI.getProfile();
        setFacultyData({
          name: data.name,
          email: data.email,
          department: data.department,
          faculty_id: data.faculty_id?.toString() ?? 'null',
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch faculty data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, [userId]); // Run when userId is available

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return;

    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data: FacultyEditForm = {
      email: formData.get("email") as string,
      name: formData.get("name") as string,
      department: formData.get("department") as string,
      faculty_id: parseInt(formData.get("faculty_id") as string)
    };

    try {
      await facultyAPI.updateProfile(userId as string, data);
      alert("Profile updated successfully");
      router.push(`/faculty/${userId}/`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!facultyData) {
    return <Loading />;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
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
            defaultValue={facultyData.name ?? 'null'}
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
            defaultValue={facultyData.email ?? 'null'}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="faculty_id" className="block mb-2">
            Faculty ID
          </label>
          <input
            type="text"
            id="faculty_id"
            name="faculty_id"
            defaultValue={facultyData.faculty_id}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="department" className="block mb-2">
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            defaultValue={facultyData.department ?? 'null'}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white rounded ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default FacultyEdit;
