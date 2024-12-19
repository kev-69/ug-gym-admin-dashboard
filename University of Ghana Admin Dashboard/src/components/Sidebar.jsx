import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handle the logout process
  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Remove the admin token from localStorage
    navigate('/login'); // Redirect the user to the login page (adjust the path if needed)
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-semibold mb-6">University of Ghana Gym</h2>
        <ul>
          <li>
            <Link to="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <button onClick={handleLogout} className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
