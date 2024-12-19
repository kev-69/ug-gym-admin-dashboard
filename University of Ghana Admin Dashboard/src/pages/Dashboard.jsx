import React from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">Total Members</h2>
            <p className="text-2xl font-bold text-gray-900">1,250</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">Active Sessions</h2>
            <p className="text-2xl font-bold text-gray-900">35</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">Revenue</h2>
            <p className="text-2xl font-bold text-gray-900">$5,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;