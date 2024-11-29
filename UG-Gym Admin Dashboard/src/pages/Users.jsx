import React, { useState } from 'react';

// Mock data for users
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  { id: 3, name: 'Michael Brown', email: 'michael@example.com', status: 'Active' },
];

export default function Users() {
  const [users, setUsers] = useState(mockUsers);

  // Toggle user status
  const toggleUserStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
          : user
      )
    );
  };

  // Delete user
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.status}</td>
              <td className="border border-gray-300 p-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => toggleUserStatus(user.id)}
                >
                  {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
