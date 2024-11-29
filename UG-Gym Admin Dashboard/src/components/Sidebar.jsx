import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="sidebar bg-gray-800 text-white h-screen w-64 fixed">
      <div className="sidebar-header p-4 text-center font-bold text-lg border-b border-gray-700">
        UG Gym Admin
      </div>
      <nav className="mt-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="block p-4 hover:bg-gray-700 rounded-md"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/subscriptions"
              className="block p-4 hover:bg-gray-700 rounded-md"
            >
              Subscriptions
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className="block p-4 hover:bg-gray-700 rounded-md"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/reports"
              className="block p-4 hover:bg-gray-700 rounded-md"
            >
              Reports
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
