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
import { ReportContent } from "@/app/../data/reports";
import { getCareerFairReport } from "@/services/careerFairService";
import { toast } from "react-hot-toast";

interface Props {
  careerFairId: string;
  adminId: string;
}

const DataAnalysis = ({ careerFairId, adminId }: Props) => {
  const [reportData, setReportData] = useState<ReportContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const data = await getCareerFairReport(adminId, careerFairId);
        setReportData(data);
      } catch (error) {
        toast.error("Failed to fetch report data");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [careerFairId, adminId]);

  // Prepare data for the charts
  const attendanceData = [
    {
      name: "Students",
      registered: reportData?.total_registered_students || 0,
      attended: reportData?.total_attended_students || 0,
    },
    {
      name: "Companies",
      registered: reportData?.total_registered_companies || 0,
      attended: reportData?.total_attended_companies || 0,
    },
  ];

  const calculateAttendanceRate = (attended: number, registered: number) => {
    return registered ? ((attended / registered) * 100).toFixed(1) : "0";
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">
            Career Fair Analysis Report
          </h1>
          <p className="text-gray-600 mb-6">Career Fair ID: {careerFairId}</p>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Students Card */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Students</h3>
              <div className="space-y-2">
                <p>Registered: {reportData?.total_registered_students || 0}</p>
                <p>Attended: {reportData?.total_attended_students || 0}</p>
                <p className="text-blue-600">
                  Attendance Rate:
                  {calculateAttendanceRate(
                    reportData?.total_attended_students || 0,
                    reportData?.total_registered_students || 0
                  )}
                  %
                </p>
              </div>
            </div>

            {/* Companies Card */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Companies</h3>
              <div className="space-y-2">
                <p>Registered: {reportData?.total_registered_companies || 0}</p>
                <p>Attended: {reportData?.total_attended_companies || 0}</p>
                <p className="text-green-600">
                  Attendance Rate:
                  {calculateAttendanceRate(
                    reportData?.total_attended_companies || 0,
                    reportData?.total_registered_companies || 0
                  )}
                  %
                </p>
              </div>
            </div>

            {/* Positions Card */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Positions</h3>
              <div className="space-y-2">
                <p>Total Positions: {reportData?.total_positions || 0}</p>
                <p>
                  Average Positions per Company:
                  {(
                    reportData?.total_positions ||
                    0 / reportData?.total_registered_companies ||
                    0
                  ).toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          {/* Attendance Chart */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Attendance Comparison
            </h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={attendanceData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="registered" fill="#4F46E5" name="Registered" />
                  <Bar dataKey="attended" fill="#10B981" name="Attended" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Key Insights */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Key Insights</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>
                Student attendance rate:{" "}
                {calculateAttendanceRate(
                  reportData?.total_attended_students || 0,
                  reportData?.total_registered_students || 0
                )}
                %
              </li>
              <li>
                Company attendance rate:{" "}
                {calculateAttendanceRate(
                  reportData?.total_attended_companies || 0,
                  reportData?.total_registered_companies || 0
                )}
                %
              </li>
              <li>
                Average positions per company:{" "}
                {(
                  reportData?.total_positions ||
                  0 / reportData?.total_registered_companies ||
                  0
                ).toFixed(1)}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DataAnalysis;
