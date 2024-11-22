"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/common/Layout";
import { toast } from "react-hot-toast";

interface CareerFair {
  fair_id: string;
  name: string;
  date: string;
  location: string;
  description: string;
}

interface Props {
  fairId: string;
  initialData?: CareerFair;
  onUpdateSuccess?: (updatedFair: CareerFair) => void;
}

const AdminUpdateCareer = ({ fairId, initialData, onUpdateSuccess }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [careerFair, setCareerFair] = useState<CareerFair>({
    fair_id: fairId,
    name: "",
    date: "",
    location: "",
    description: "",
  });

  // Fetch career fair data based on ID
  useEffect(() => {
    const fetchCareerFair = async () => {
      try {
        // Replace with your actual API call
        // const response = await fetch(`/api/career-fairs/${fairId}`);
        // const data = await response.json();

        // Simulated API response
        const data = {
          fair_id: fairId,
          name: "Spring Career Fair 2024",
          date: "2024-03-15T10:00",
          location: "Student Union Building",
          description: "Annual spring career fair for all majors",
        };

        setCareerFair(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching career fair:", error);
        toast.error("Failed to fetch career fair data");
      }
    };

    fetchCareerFair();
  }, [fairId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCareerFair((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your actual API call
      // const response = await fetch(`/api/career-fairs/${fairId}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(careerFair)
      // });
      // const updatedData = await response.json();

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Log the updated data
      console.log("Updated Career Fair:", careerFair);

      // Return the updated career fair data
      const updatedCareerFair: CareerFair = {
        fair_id: careerFair.fair_id,
        name: careerFair.name,
        date: careerFair.date,
        location: careerFair.location,
        description: careerFair.description,
      };

      // Store the updated data (optional)
      localStorage.setItem(
        "updatedCareerFair",
        JSON.stringify(updatedCareerFair)
      );

      toast.success("Career fair updated successfully");
      router.push("/admin/career-fairs");

      return updatedCareerFair;
    } catch (error) {
      console.error("Error updating career fair:", error);
      toast.error("Failed to update career fair");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Update Career Fair</h1>

          {/* Preview current data */}
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Current Information</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Fair ID:</span>{" "}
                {careerFair.fair_id}
              </p>
              <p>
                <span className="font-medium">Name:</span> {careerFair.name}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(careerFair.date).toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Location:</span>{" "}
                {careerFair.location}
              </p>
              <p>
                <span className="font-medium">Description:</span>{" "}
                {careerFair.description}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Fair ID (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fair ID
              </label>
              <input
                type="text"
                name="fair_id"
                value={careerFair.fair_id}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                disabled
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fair Name
              </label>
              <input
                type="text"
                name="name"
                value={careerFair.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="datetime-local"
                name="date"
                value={careerFair.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={careerFair.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={careerFair.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 bg-blue-500 text-white py-2 px-4 rounded-md 
                         hover:bg-blue-600 transition-colors duration-200
                         ${
                           isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                         }`}
              >
                {isSubmitting ? "Updating..." : "Update Career Fair"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/adminPage/careerFair")}
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

export default AdminUpdateCareer;
