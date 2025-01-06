import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import UserDetailModal from '../components/UserDetailModal';
import { Helmet } from "react-helmet";
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filter, setFilter] = useState("all"); // State for filter selection

  const fetchUsers = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://ug-gym-backend.onrender.com/api/admins/all-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
        return;
      }

      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      setError("An error occurred while fetching users. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const calculateDaysRemaining = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const getFilteredUsers = () => {
    return users
      .filter((user) => {
        if (filter === "all") return true;
        if (filter === "public") return user.userType === "public";
        if (filter === "university") return user.userType === "student" || user.userType === "staff";
        if (filter === "active") return user.subscription.status;
        if (filter === "inactive") return !user.subscription.status;
        return true;
      })
      .filter((user) => {
        const query = searchQuery.toLowerCase();
        return (
          user.firstName.toLowerCase().includes(query) ||
          user.lastName.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
        );
      });
  };

  // Calculating totals
  const totalUsers = users.length;
  const studentUsers = users.filter(user => user.userType === "student").length;
  const staffUsers = users.filter(user => user.userType === "staff").length;
  const publicUsers = users.filter(user => user.userType === "public").length;
  // const inactiveUsers = users.filter(user => !user.subscription.status).length;

  return (
    <div className="flex">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>
        {isLoading && <LoadingSpinner />}
        {error && <p className="text-red-500">{error}</p>}

        {/* User Totals */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-2xl font-bold text-blue-700">{totalUsers}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">Students</h3>
            <p className="text-2xl font-bold text-green-700">{studentUsers}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">Staff</h3>
            <p className="text-2xl font-bold text-yellow-700">{staffUsers}</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">Public</h3>
            <p className="text-2xl font-bold text-purple-700">{publicUsers}</p>
          </div>
          {/* <div className="bg-red-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">Inactive Users</h3>
            <p className="text-2xl font-bold text-red-700">{inactiveUsers}</p>
          </div> */}
        </div>

        {/* Search and Filter Controls */}
        <div className="mt-4 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <input
            type="text"
            placeholder="Search by name or email"
            className="px-4 py-2 border border-gray-300 rounded-lg w-full md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="public">Public Users</option>
            <option value="university">University Users</option>
            <option value="active">Active Users</option>
            <option value="inactive">Inactive Users</option>
          </select>
        </div>

        {/* Displaying Users in a Table */}
        <div className="mt-6 overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
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
                {getFilteredUsers().map((user) => (
                  <tr key={user._id} className="border-t border-gray-300">
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user.firstName} {user.lastName}
                      <p className="text-xs text-gray-400">{user.userType}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user.subscription.package} <br />
                      <span className="text-xs text-gray-400">
                        {calculateDaysRemaining(user.subscription.startDate, user.subscription.endDate)} days remaining
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user.subscription.status ? "Active" : "Inactive"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <button
                        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        onClick={() => openModal(user)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
