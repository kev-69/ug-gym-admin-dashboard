import React, { useState } from 'react';

// Mock data for subscriptions
const mockSubscriptions = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Pending' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Approved' },
  { id: 3, name: 'Michael Brown', email: 'michael@example.com', status: 'Pending' },
];

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);

  // Approve subscription
  const approveSubscription = (id) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === id ? { ...sub, status: 'Approved' } : sub
      )
    );
  };

  // Reject subscription
  const rejectSubscription = (id) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === id ? { ...sub, status: 'Rejected' } : sub
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Subscriptions</h2>
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
          {subscriptions.map((sub) => (
            <tr key={sub.id}>
              <td className="border border-gray-300 p-2">{sub.name}</td>
              <td className="border border-gray-300 p-2">{sub.email}</td>
              <td className="border border-gray-300 p-2">{sub.status}</td>
              <td className="border border-gray-300 p-2">
                {sub.status === 'Pending' && (
                  <>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => approveSubscription(sub.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => rejectSubscription(sub.id)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
