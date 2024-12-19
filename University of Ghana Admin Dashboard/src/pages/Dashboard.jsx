import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import UserDetailModal from '../components/UserDetailModal';

const Dashboard = () => {
  const [users, setUsers] = useState([]);  // State to store fetched users
  const [isLoading, setIsLoading] = useState(true);  // Loading state
  const [error, setError] = useState("");  // Error state
  const [selectedUser, setSelectedUser] = useState(null);  // State to store selected user for modal
  const [isModalOpen, setIsModalOpen] = useState(false);  // State to control modal visibility

  const fetchUsers = async () => {
    setIsLoading(true);  // Start loading
    setError("");  // Clear previous errors

    try {
      const response = await fetch("http://localhost:4000/api/admins/all-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,  // Use Bearer token
        },
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);  // Display error message from backend
        return;
      }

      const data = await response.json();
      setUsers(data.users);  // Assuming your backend sends users in the "users" field
    } catch (error) {
      setError("An error occurred while fetching users. Please try again.");
    } finally {
      setIsLoading(false);  // Stop loading
    }
  };

  useEffect(() => {
    fetchUsers();  // Fetch users when the component mounts
  }, []);

  // Function to calculate remaining days until subscription end
  const calculateDaysRemaining = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();

    // Calculate difference in time
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return diffDays > 0 ? diffDays : 0;  // Ensure we don't return negative days
  };

  // Handle opening the modal
  const openModal = (user) => {
    // console.log('Selected User:', user);  // Log the selected user for debugging
    setSelectedUser(user);  // Set the selected user
    setIsModalOpen(true);  // Open the modal
  };

  // Handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);  // Close the modal
    setSelectedUser(null);  // Clear the selected user data
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>
        {isLoading && <p>Loading users...</p>}  {/* Loading state */}
        {error && <p className="text-red-500">{error}</p>}  {/* Error state */}

        {/* Displaying Total Users and Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">Total Users</h2>
            <p className="text-2xl font-bold text-gray-900">{users.length}</p>  {/* Display number of users */}
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">University Users</h2>
            <p className="text-2xl font-bold text-gray-900">{users.filter(user => user.userType === "student" || user.userType === "staff").length}</p>  {/* Filter by userType */}
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">Public Users</h2>
            <p className="text-2xl font-bold text-gray-900">{users.filter(user => user.userType === "public").length}</p>  {/* Filter by userType */}
          </div>
        </div>

        {/* Displaying Users in a Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Users</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Contact</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Membership Plan</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t border-gray-300">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {user.firstName} {user.lastName}
                    <p className="text-xs text-gray-400">{user.userType}</p> {/* Display userType under the name */}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {user.subscription.package} <br />
                    {/* Display days remaining */}
                    <span className="text-xs text-gray-400">
                      {calculateDaysRemaining(user.subscription.startDate, user.subscription.endDate)} days remaining
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {user.subscription.status ? "Active" : "Inactive"} {/* Display "Active" if status is true */}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <button 
                      className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      onClick={() => openModal(user)} >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for User Details */}
      {isModalOpen && selectedUser && (
      <UserDetailModal 
        userId={selectedUser._id} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    )}
    </div>
  );
};

export default Dashboard;
