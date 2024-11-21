'use client';

import { Company } from '@/data/company';
import Link from 'next/link';
import Layout from '@/components/common/Layout';

interface CompanyDashboardProps {
  company: Company;
}

const CompanyDashboard = ({ company }: CompanyDashboardProps) => {
  if (!company) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">{company.company_name}</h1>
            <p className="text-gray-600">{company.industry}</p>
          </div>
          <Link 
            href={`/${company.id}/company/edit`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Edit Profile
          </Link>
        </div>

        <div className="grid gap-4">
          <div className="border-b pb-4">
            <h2 className="font-semibold mb-2">Location</h2>
            <p className="text-gray-700">{company.location.city}, {company.location.country}</p>
          </div>

          <div className="border-b pb-4">
            <h2 className="font-semibold mb-2">Contact Information</h2>
            <div className="space-y-1 text-gray-700">
              <p>Contact Person: {company.contact.name}</p>
              <p>Position: {company.contact.position}</p>
              <p>Email: {company.contact.email}</p>
              <p>Phone: {company.contact.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Link 
          href={`/${company.id}/company/positions`}
          className="flex items-center justify-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
        >
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Published Positions</h2>
            <p className="text-gray-600">
              {company.positions_offered.filter(p => p.status === 'open').length} Open Positions
            </p>
          </div>
        </Link>

        <Link 
          href={`/${company.id}/company/new-position`}
          className="flex items-center justify-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
        >
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Post New Position</h2>
            <p className="text-gray-600">Create a new job listing</p>
          </div>
        </Link>
      </div>
    </div>
    </Layout>
  );
};

export default CompanyDashboard; 