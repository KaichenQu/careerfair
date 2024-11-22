"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/common/Layout";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

interface CareerFair {
  fair_id: string;
  name: string;
  date: string;
  location: string;
  description: string;
}

const AdminCareerFair = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [careerFairs, setCareerFairs] = useState<CareerFair[]>([
    {
      fair_id: "CF2024-1",
      name: "Spring Career Fair 2024",
      date: "2024-03-15T10:00",
      location: "Student Union Building",
      description: "Annual spring career fair for all majors",
    },
    {
      fair_id: "CF2024-2",
      name: "Tech Career Fair 2024",
      date: "2024-04-20T09:00",
      location: "Engineering Building",
      description: "Career fair focused on technology and engineering roles",
    },
  ]);

  const filteredFairs = careerFairs.filter(
    (fair) =>
      fair.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fair.fair_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (fairId: string) => {
    try {
      // Here you would make an API call to delete the career fair
      // await deleteFair(fairId);

      setCareerFairs((prevFairs) =>
        prevFairs.filter((fair) => fair.fair_id !== fairId)
      );
      toast.success("Career fair deleted successfully");
    } catch (error) {
      toast.error("Failed to delete career fair");
      console.error("Error deleting career fair:", error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Career Fairs Management</h1>
            <button
              onClick={() => router.push("/adminPage/careerFair/addcareerFair")}
              className="bg-blue-500 text-white px-4 py-2 rounded-md 
                       hover:bg-blue-600 transition-colors duration-200
                       flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>Add New Fair</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by fair name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Career Fairs List */}
          <div className="space-y-4">
            {filteredFairs.length === 0 ? (
              <p className="text-center text-gray-500 py-4">
                No career fairs found
              </p>
            ) : (
              filteredFairs.map((fair) => (
                <div
                  key={fair.fair_id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-semibold">{fair.name}</h2>
                        <span className="text-sm text-gray-500">
                          ({fair.fair_id})
                        </span>
                      </div>

                      <div className="text-gray-600 space-y-1">
                        <p className="flex items-center space-x-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>{format(new Date(fair.date), "PPpp")}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>{fair.location}</span>
                        </p>
                      </div>
                      <p className="text-gray-600 mt-2">{fair.description}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          router.push(
                            `/adminPage/careerFair/update/${fair.fair_id}`
                          )
                        }
                        className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md
                                 hover:bg-blue-50 transition-colors duration-200"
                        title="Edit"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/admin/career-fair/${fair.fair_id}`)
                        }
                        className="text-gray-600 hover:text-gray-800 px-3 py-1 rounded-md
                                 hover:bg-gray-50 transition-colors duration-200"
                        title="View Details"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(fair.fair_id)}
                        className="text-red-600 hover:text-red-800 px-3 py-1 rounded-md
                                 hover:bg-red-50 transition-colors duration-200"
                        title="Delete"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCareerFair;
