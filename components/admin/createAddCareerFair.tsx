"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/app/Components/common/layout';
import { toast } from 'react-hot-toast';

interface CareerFair {
  fair_id: string;
  name: string;
  date: string;
  location: string;
  description: string;
}

interface CareerFairResponse {
  success: boolean;
  data?: CareerFair;
  error?: string;
}

const CreateCareerFair = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CareerFair>({
    fair_id: '',
    name: '',
    date: '',
    location: '',
    description: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.fair_id.trim()) {
      toast.error('Fair ID is required');
      return false;
    }
    if (!formData.name.trim()) {
      toast.error('Fair name is required');
      return false;
    }
    if (!formData.date) {
      toast.error('Date is required');
      return false;
    }
    if (!formData.location.trim()) {
      toast.error('Location is required');
      return false;
    }
    if (!formData.description.trim()) {
      toast.error('Description is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      
      // Here's how you would structure the API call to create and return the career fair data
      // const response = await fetch('/api/career-fairs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const result: CareerFairResponse = await response.json();
      
      // Simulating API call with response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate API response
      const result: CareerFairResponse = {
        success: true,
        data: {
          ...formData,
          fair_id: formData.fair_id.trim(),
          name: formData.name.trim(),
          location: formData.location.trim(),
          description: formData.description.trim()
        }
      };

      if (result.success && result.data) {
        // Log the created career fair data
        console.log('Created Career Fair:', result.data);
        
        // You can also store it in localStorage or state management if needed
        localStorage.setItem('lastCreatedCareerFair', JSON.stringify(result.data));
        
        toast.success('Career fair created successfully');
        
        // Pass the created data as query params or state when redirecting
        router.push({
          pathname: '/admin/career-fairs',
          query: { newFairId: result.data.fair_id }
        });
      } else {
        throw new Error(result.error || 'Failed to create career fair');
      }
    } catch (error) {
      toast.error('Failed to create career fair');
      console.error('Error creating career fair:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preview section to show the data being created
  const renderPreview = () => {
    const hasData = Object.values(formData).some(value => value.trim() !== '');
    
    if (!hasData) return null;

    return (
      <div className="mt-8 p-4 bg-gray-50 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Career Fair Preview</h2>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Fair ID:</span> {formData.fair_id}</p>
          <p><span className="font-medium">Name:</span> {formData.name}</p>
          <p><span className="font-medium">Date:</span> {formData.date}</p>
          <p><span className="font-medium">Location:</span> {formData.location}</p>
          <p><span className="font-medium">Description:</span> {formData.description}</p>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Create New Career Fair</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Fair ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fair ID
              </label>
              <input
                type="text"
                name="fair_id"
                value={formData.fair_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter fair ID"
                required
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
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter fair name"
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
                value={formData.date}
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
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter location"
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
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter fair description"
                required
              />
            </div>

            {/* Preview Section */}
            {renderPreview()}

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 bg-blue-500 text-white py-2 px-4 rounded-md 
                         hover:bg-blue-600 transition-colors duration-200
                         ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Creating...' : 'Create Career Fair'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
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

export default CreateCareerFair;
