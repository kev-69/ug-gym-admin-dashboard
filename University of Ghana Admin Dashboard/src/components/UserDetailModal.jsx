import React, { useEffect, useState } from 'react';
import { X } from 'react-feather';
import axios from 'axios';

const UserDetailsModal = ({ userId, onClose, onUpdateStatus }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://ug-gym-backend.onrender.com/api/admins/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleUpdateStatus = async () => {
    if (!startDate || !endDate) {
      setError('Start Date and End Date are required to activate the subscription.');
      return;
    }

    try {
      await axios.patch(
        `https://ug-gym-backend.onrender.com/api/admins/users/${userId}/status`,
        {
          status: true,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        }
      );
      onUpdateStatus(userId, { status: true, startDate, endDate });
      onClose();
    } catch (err) {
      setError('Error updating subscription.');
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="flex items-center space-x-2">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span className="text-lg font-medium text-white">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50 space-y-4">
        <div className="text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-lg font-semibold text-white">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }
  

  const { subscription } = user;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#002147]">User Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="mt-1 text-lg text-gray-900">{user.firstName} {user.lastName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">User Type</h3>
                <p className="mt-1 text-lg text-gray-900 capitalize">{user.userType}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-lg text-gray-900">{user.email}</p>
              </div>
            </div>

            {subscription && (
              <div className="border-t pt-4">
                <h3 className="text-2xl font-bold text-[#002147]">Subscription Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Plan</h4>
                    <p className="mt-1 text-gray-900 capitalize">{subscription.package} Plan</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Price</h4>
                    <p className="mt-1 text-gray-900">GH₵{subscription.price}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Start Date</h4>
                    <p className="mt-1 text-gray-900">
                      {user.subscription.startDate
                        ? new Date(user.subscription.startDate).toLocaleDateString()
                        : "Not available"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">End Date</h4>
                    <p className="mt-1 text-gray-900">
                      {user.subscription.endDate
                        ? new Date(user.subscription.endDate).toLocaleDateString()
                        : "Not available"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Status</h4>
                    <p className="mt-1 text-gray-900">
                      {subscription.status === true ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>

                {subscription.startDate === null && subscription.endDate === null && (
                  <div className="mt-4 space-y-4">
                    <label className="block">
                      <span className="text-sm font-medium text-gray-500">Start Date</span>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-medium text-gray-500">End Date</span>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                      />
                    </label>
                    <div className="flex space-x-3">
                  <button
                    onClick={handleUpdateStatus}
                    className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    Activate
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
                  </div>
                )}
              </div>
            )}

            {subscription && subscription.status === 'false' && subscription.startDate === null && subscription.endDate === null && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-[#002147] mb-3">Update Status</h3>
                <div className="flex space-x-3">
                  <button
                    onClick={handleUpdateStatus}
                    className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    Activate
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
