import React from 'react';

export default function Navbar() {
  return (
    <div className="navbar bg-white shadow-md fixed w-full h-16 flex justify-between items-center px-6 z-10">
      <div className="text-xl font-bold">UG Gym Admin</div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Welcome, Admin</span>
        <img
          src="https://via.placeholder.com/40"
          alt="Admin Avatar"
          className="rounded-full w-10 h-10"
        />
      </div>
    </div>
  );
}
