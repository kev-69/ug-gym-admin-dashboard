import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
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
            <Link to="/" className="block py-2 px-4 rounded hover:bg-gray-700">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
