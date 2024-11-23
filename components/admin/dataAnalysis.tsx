"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/common/Layout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ReportData {
  fair_id: number;
  fair_name: string;
  careerfair_date: string;
  location: string;
  description: string;
  admin_id: number;
  total_registered_students: number;
  total_attended_students: number;
  total_registered_companies: number;
  total_attended_companies: number;
  total_students: number;
  total_companies: number;
  registered_students_rate: number;
  attended_students_rate: number;
  registered_companies_rate: number;
  attended_companies_rate: number;
}

const DataAnalysis = ({
  adminId,
  fairId,
}: {
  adminId: string;
  fairId: string;
}) => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/admin/${adminId}/report/${fairId}`
        );
        const data = await response.json();
        setReportData(data);
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [adminId, fairId]);

  if (loading || !reportData) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPercentage = (rate: number) => {
    return (rate * 100).toFixed(1) + "%";
  };

  const attendanceData = [
    {
      name: "Students",
      total: reportData.total_students,
      registered: reportData.total_registered_students,
      attended: reportData.total_attended_students,
    },
    {
      name: "Companies",
      total: reportData.total_companies,
      registered: reportData.total_registered_companies,
      attended: reportData.total_attended_companies,
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {reportData.fair_name}
            </h1>
            <p className="text-gray-600">
              {formatDate(reportData.careerfair_date)} | {reportData.location}
            </p>
            <p className="text-gray-500 mt-2">{reportData.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Students Statistics */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                Student Participation
              </h3>
              <div className="space-y-3">
                <p className="text-gray-700">
                  Total Students: {reportData.total_students}
                </p>
                <p className="text-gray-700">
                  Registered: {reportData.total_registered_students}
                </p>
                <p className="text-gray-700">
                  Attended: {reportData.total_attended_students}
                </p>
                <div className="pt-2 border-t border-blue-200">
                  <p className="text-blue-700">
                    Registration Rate:{" "}
                    {formatPercentage(reportData.registered_students_rate)}
                  </p>
                  <p className="text-blue-700">
                    Attendance Rate:{" "}
                    {formatPercentage(reportData.attended_students_rate)}
                  </p>
                </div>
              </div>
            </div>

            {/* Companies Statistics */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-green-800 mb-4">
                Company Participation
              </h3>
              <div className="space-y-3">
                <p className="text-gray-700">
                  Total Companies: {reportData.total_companies}
                </p>
                <p className="text-gray-700">
                  Registered: {reportData.total_registered_companies}
                </p>
                <p className="text-gray-700">
                  Attended: {reportData.total_attended_companies}
                </p>
                <div className="pt-2 border-t border-green-200">
                  <p className="text-green-700">
                    Registration Rate:{" "}
                    {formatPercentage(reportData.registered_companies_rate)}
                  </p>
                  <p className="text-green-700">
                    Attendance Rate:{" "}
                    {formatPercentage(reportData.attended_companies_rate)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Chart */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">
              Participation Overview
            </h2>
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={attendanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#94a3b8" name="Total" />
                  <Bar dataKey="registered" fill="#3b82f6" name="Registered" />
                  <Bar dataKey="attended" fill="#22c55e" name="Attended" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DataAnalysis;
