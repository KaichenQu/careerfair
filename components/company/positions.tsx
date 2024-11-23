'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { companyAPI, type Position } from '@/services/api';
import Layout from '@/components/common/Layout';

type EditPositionData = {
  position_name: string;
  salary: number;
  location: string;
  description: string;
  ng_flag: boolean;
  intern_flag: boolean;
  sponsor_flag: boolean;
};

type PositionsProps = {
  userId: number;
};

const Positions = () => {
  const router = useRouter();
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPosition, setEditingPosition] = useState<EditPositionData | null>(null);
  const [isAddingPosition, setIsAddingPosition] = useState(false);
  const [newPosition, setNewPosition] = useState({
    position_name: '',
    salary: 0,
    location: '',
    description: '',
    ng_flag: 0,
    intern_flag: 0,
    sponsor_flag: 0,
  });
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  } | null>(null);

  const userId = typeof window !== 'undefined' 
    ? window.location.pathname.split('/')[2]
    : null;

  console.log('Current user ID from URL:', userId);

  useEffect(() => {
    const fetchPositions = async () => {
      if (!userId || isNaN(Number(userId))) {
        console.error('Invalid userId:', userId);
        setLoading(false);
        return;
      }

      try {
        const numericUserId = Number(userId);
        console.log('Fetching positions for userId:', numericUserId);
        const data = await companyAPI.getDashboard(numericUserId);
        setPositions(data.published_positions);
      } catch (error: any) {
        console.error('Error fetching positions:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, [userId]);

  const handlePositionClick = (position: Position) => {
    setSelectedPosition(position);
  };

  const handleCloseDetail = () => {
    setSelectedPosition(null);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPosition || !selectedPosition) return;

    try {
      if (!userId) throw new Error("User ID is required");
      
      const numericUserId = Number(userId);
      const positionId = Number(selectedPosition.position_id);
      console.log('Position ID:', positionId);
      
      console.log('Submitting edit with:', {
        userId: numericUserId,
        positionId: positionId,
        editingPosition
      });
      
      await companyAPI.updatePosition(numericUserId, positionId, editingPosition);
      
      const updatedPositions = positions.map(pos => 
        pos.position_id === selectedPosition.position_id 
          ? { ...pos, ...editingPosition }
          : pos
      );
      setPositions(updatedPositions);
      
      setIsEditing(false);
      setSelectedPosition(null);
    } catch (error) {
      console.error('Error updating position:', error);
    }
  };

  if (loading) {
    return <Layout><div>Loading positions...</div></Layout>;
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Published Positions</h1>
          <button
            onClick={() => setIsAddingPosition(!isAddingPosition)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            {isAddingPosition ? 'Cancel' : 'Add New Position'}
          </button>
        </div>

        {/* Add Position Form */}
        {isAddingPosition && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Add New Position</h2>
            
            {/* Status Message */}
            {submitStatus && (
              <div className={`mb-4 p-3 rounded ${
                submitStatus.type === 'success' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                if (!userId) throw new Error("User ID is required");
                
                const numericUserId = Number(userId);
                console.log('Submitting position with:', {
                  userId: numericUserId,
                  newPosition
                });
                
                const response = await companyAPI.createPosition(numericUserId, newPosition);
                console.log('Creation successful:', response);
                
                // Update local state and show success message
                setPositions([...positions, response]);
                setSubmitStatus({
                  type: 'success',
                  message: 'Position created successfully!'
                });
                
                // Reset form
                setTimeout(() => {
                  setNewPosition({
                    position_name: '',
                    salary: 0,
                    location: '',
                    description: '',
                    ng_flag: 0,
                    intern_flag: 0,
                    sponsor_flag: 0,
                  });
                  setSubmitStatus(null);
                  setIsAddingPosition(false);
                }, 2000);

              } catch (error) {
                console.error('Submission error details:', error);
                setSubmitStatus({
                  type: 'error',
                  message: error instanceof Error ? error.message : 'Failed to create position. Please try again.'
                });
              }
            }} className="space-y-4">
              <div>
                <label className="block mb-1">Position Name</label>
                <input
                  type="text"
                  value={newPosition.position_name}
                  onChange={(e) => setNewPosition({
                    ...newPosition,
                    position_name: e.target.value
                  })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Salary</label>
                <input
                  type="number"
                  value={newPosition.salary}
                  onChange={(e) => setNewPosition({
                    ...newPosition,
                    salary: Number(e.target.value)
                  })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Location</label>
                <input
                  type="text"
                  value={newPosition.location}
                  onChange={(e) => setNewPosition({
                    ...newPosition,
                    location: e.target.value
                  })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Description</label>
                <textarea
                  value={newPosition.description}
                  onChange={(e) => setNewPosition({
                    ...newPosition,
                    description: e.target.value
                  })}
                  className="w-full p-2 border rounded"
                  rows={4}
                  required
                />
              </div>
              <div className="flex gap-4">
                <label>
                  <input
                    type="checkbox"
                    checked={newPosition.ng_flag === 1}
                    onChange={(e) => setNewPosition({
                      ...newPosition,
                      ng_flag: e.target.checked ? 1 : 0
                    })}
                  /> New Grad
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={newPosition.intern_flag === 1}
                    onChange={(e) => setNewPosition({
                      ...newPosition,
                      intern_flag: e.target.checked ? 1 : 0
                    })}
                  /> Internship
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={newPosition.sponsor_flag === 1}
                    onChange={(e) => setNewPosition({
                      ...newPosition,
                      sponsor_flag: e.target.checked ? 1 : 0
                    })}
                  /> Sponsorship
                </label>
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Create Position
              </button>
            </form>
          </div>
        )}

        {/* Grid of position cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {positions.map((position) => (
            <div
              key={position.position_id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div onClick={() => handlePositionClick(position)} className="cursor-pointer">
                <h2 className="text-xl font-semibold mb-2">{position.position_name}</h2>
                <p className="text-gray-600 mb-1">Salary: ${position.salary.toLocaleString()}</p>
                <p className="text-gray-600 mb-1">Location: {position.location}</p>
                <p className="text-gray-600">{position.description}</p>
              </div>
              <button
                onClick={() => {
                  setEditingPosition({
                    position_name: position.position_name,
                    salary: position.salary,
                    location: position.location,
                    description: position.description,
                    ng_flag: position.ng_flag,
                    intern_flag: position.intern_flag,
                    sponsor_flag: position.sponsor_flag,
                  });
                  setSelectedPosition(position);
                  setIsEditing(true);
                }}
                className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          ))}
        </div>

        {/* Position Detail Modal */}
        {selectedPosition && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">
                  {isEditing ? 'Edit Position' : selectedPosition.position_name}
                </h2>
                <button
                  onClick={handleCloseDetail}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-1">Position Name</label>
                    <input
                      type="text"
                      value={editingPosition?.position_name}
                      onChange={(e) => setEditingPosition({
                        ...editingPosition!,
                        position_name: e.target.value
                      })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Salary</label>
                    <input
                      type="number"
                      value={editingPosition?.salary}
                      onChange={(e) => setEditingPosition({
                        ...editingPosition!,
                        salary: Number(e.target.value)
                      })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Location</label>
                    <input
                      type="text"
                      value={editingPosition?.location}
                      onChange={(e) => setEditingPosition({
                        ...editingPosition!,
                        location: e.target.value
                      })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Description</label>
                    <textarea
                      value={editingPosition?.description}
                      onChange={(e) => setEditingPosition({
                        ...editingPosition!,
                        description: e.target.value
                      })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="flex gap-4">
                    <label>
                      <input
                        type="checkbox"
                        checked={editingPosition?.ng_flag}
                        onChange={(e) => setEditingPosition({
                          ...editingPosition!,
                          ng_flag: e.target.checked
                        })}
                      /> New Grad
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={editingPosition?.intern_flag}
                        onChange={(e) => setEditingPosition({
                          ...editingPosition!,
                          intern_flag: e.target.checked
                        })}
                      /> Internship
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={editingPosition?.sponsor_flag}
                        onChange={(e) => setEditingPosition({
                          ...editingPosition!,
                          sponsor_flag: e.target.checked
                        })}
                      /> Sponsorship
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-300 px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="space-y-3">
                    <p className="text-lg">Salary: ${selectedPosition.salary.toLocaleString()}</p>
                    <p className="text-lg">Location: {selectedPosition.location}</p>
                    <p className="text-lg">Description: {selectedPosition.description}</p>
                    <div className="border-t pt-3 mt-3">
                      <h3 className="font-semibold mb-2">Additional Information:</h3>
                      <p>Company ID: {selectedPosition.company_id}</p>
                      <div className="flex gap-4 mt-2">
                        <span className={`px-3 py-1 rounded ${selectedPosition.ng_flag ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          New Grad: {selectedPosition.ng_flag ? 'Yes' : 'No'}
                        </span>
                        <span className={`px-3 py-1 rounded ${selectedPosition.intern_flag ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                          Internship: {selectedPosition.intern_flag ? 'Yes' : 'No'}
                        </span>
                        <span className={`px-3 py-1 rounded ${selectedPosition.sponsor_flag ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                          Sponsorship: {selectedPosition.sponsor_flag ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setEditingPosition({
                        position_name: selectedPosition.position_name,
                        salary: selectedPosition.salary,
                        location: selectedPosition.location,
                        description: selectedPosition.description,
                        ng_flag: selectedPosition.ng_flag,
                        intern_flag: selectedPosition.intern_flag,
                        sponsor_flag: selectedPosition.sponsor_flag,
                      });
                      setIsEditing(true);
                    }}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Edit Position
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Positions;
