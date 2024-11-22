"use client";


import { useState } from "react";
import { adminProfile } from "@/app/../data/adminProfile";
import { toast } from "react-hot-toast";
import Layout from "@/components/common/Layout";
import { useRouter } from "next/navigation";


interface Props {
  id: string;
}

const AdminEditEmail = ({ id }: Props) => {
  const router = useRouter();
  const [newEmail, setNewEmail] = useState(adminProfile.email);

  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      toast.error("Please enter a valid email address");

      return;
    }

    try {
      // Here you would make an API call to update the email using the id
      // await updateEmail(id, newEmail, password);

      toast.success("Email updated successfully");
      router.push("/admin/profile"); // Redirect back to profile page
    } catch (error) {
      toast.error("Failed to update email");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Change Email Address</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ID Display */}
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm font-medium">
                Admin ID
              </label>
              <input
                type="text"
                value={id}
                className="mt-1 p-2 border rounded-md bg-gray-50"
                disabled
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 text-sm font-medium">
                Current Email
              </label>
              <input
                type="email"
                value={adminProfile.email}
                className="mt-1 p-2 border rounded-md bg-gray-50"
                disabled
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 text-sm font-medium">
                New Email Address
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="mt-1 p-2 border rounded-md"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-600 text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 border rounded-md"
                required
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md 
                         hover:bg-blue-600 transition-colors duration-200"
              >
                Save Changes
              </button>
              <button
                type="button"

                onClick={() => router.push('/admin/profile')}

                className="flex-1 bg-gray-100 text-gray-600 py-2 px-4 rounded-md 
                         hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AdminEditEmail; 
